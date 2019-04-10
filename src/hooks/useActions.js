import { useDispatch } from './useDispatch'

export function useActions(actionCreators, contextToUse) {
  const dispatch = useDispatch(contextToUse)

  return useMemo(() => bindActionCreators(actionCreators, dispatch), [
    actionCreators
  ])
}
