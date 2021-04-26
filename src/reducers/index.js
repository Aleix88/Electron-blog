import {combineReducers} from 'redux'

import PostReducer from './post'
import SelectedReducer from './selectedPost'
import AutosaveReducer from './autosave'
import SettingsReducer from './settings'

const allReducers = combineReducers({
    posts: PostReducer,
    selectedPost: SelectedReducer,
    isAutosaving: AutosaveReducer,
    settings: SettingsReducer
})

export default allReducers