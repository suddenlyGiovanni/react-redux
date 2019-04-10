import { useReducer, useRef, useEffect, useMemo, useLayoutEffect } from 'react'

import { useReduxContext } from './useStore'
import shallowEqual from '../utils/shallowEqual'
import Subscription from '../utils/Subscription'

// React currently throws a warning when using useLayoutEffect on the server.
// To get around it, we can conditionally useEffect on the server (no-op) and
// useLayoutEffect in the browser. We need useLayoutEffect to ensure the store
// subscription callback always has the selector from the latest render commit
// available, otherwise a store update may happen between render and commit,
// which may cause missed updates
const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect

export function useSelect(selector, contextToUse) {
  const { store, subscription: contextSub } = useReduxContext(contextToUse)
  const [, forceRender] = useReducer(s => s + 1, 0)

  const subscription = useMemo(() => new Subscription(store, contextSub), [
    store,
    contextSub
  ])

  const latestSelector = useRef(selector)
  const selectedState = selector(store.getState())
  const latestSelectedState = useRef(selectedState)

  useIsomorphicLayoutEffect(() => {
    latestSelector.current = selector
  })

  useEffect(() => {
    let didUnsubscribe = false

    function checkForUpdates() {
      if (didUnsubscribe) {
        return
      }

      const storeState = store.getState()
      try {
        const newSelectedState = latestSelector.current(storeState)

        if (shallowEqual(newSelectedState, latestSelectedState.current)) {
          return
        }

        latestSelectedState.current = newSelectedState
      } catch {
        // we ignore all errors here, since when the component
        // is re-rendered, the selector is called again, and
        // will throw again, if neither props nor store state
        // changed
      }

      forceRender()
    }

    subscription.onStateChange = checkForUpdates
    subscription.trySubscribe()

    checkForUpdates()

    const unsubscribeWrapper = () => {
      didUnsubscribe = true
      subscription.tryUnsubscribe()
    }

    return unsubscribeWrapper
  }, [store, subscription])

  return selectedState
}
