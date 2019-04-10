import Provider from './components/Provider'
import connectAdvanced from './components/connectAdvanced'
import { ReactReduxContext } from './components/Context'
import connect from './connect/connect'

import { useRedux } from './hooks/useRedux'
import { useSelect } from './hooks/useSelect'
import { useActions } from './hooks/useActions'
import { useDispatch } from './hooks/useDispatch'
import { useStore } from './hooks/useStore'

import { setBatch } from './utils/batch'
import { unstable_batchedUpdates as batch } from './utils/reactBatchedUpdates'

setBatch(batch)

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
