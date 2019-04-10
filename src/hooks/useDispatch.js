import { useStore } from './useStore'

export function useDispatch(contextToUse) {
  const store = useStore(contextToUse)

  const { dispatch } = store

  return dispatch
}
