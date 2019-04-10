import { useContext } from 'react'

import { ReactReduxContext } from '../components/Context'

export function useStore(contextToUse) {
  const { store } = useReduxContext(contextToUse)

  return store
}

export function useReduxContext(contextToUse = ReactReduxContext) {
  return useContext(contextToUse)
}
