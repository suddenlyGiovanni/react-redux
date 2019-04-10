import { useSelect } from './useSelect'
import { useActions } from './useActions'

export function useRedux(selector, actionCreators, contextToUse) {
  const selectedState = useSelect(selector, contextToUse)
  const boundActionCreators = useActions(actionCreators, contextToUse)

  return [selectedState, boundActionCreators]
}
