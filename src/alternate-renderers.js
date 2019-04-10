import Provider from './components/Provider'
import connectAdvanced from './components/connectAdvanced'
import { ReactReduxContext } from './components/Context'
import connect from './connect/connect'

import { useRedux } from './hooks/useRedux'
import { useSelect } from './hooks/useSelect'
import { useActions } from './hooks/useActions'
import { useDispatch } from './hooks/useDispatch'
import { useStore } from './hooks/useStore'

import { getBatch } from './utils/batch'

// For other renderers besides ReactDOM and React Native, use the default noop batch function
const batch = getBatch()

export {
  Provider,
  connectAdvanced,
  ReactReduxContext,
  connect,
  batch,
  useRedux,
  useSelect,
  useActions,
  useDispatch,
  useStore
}
