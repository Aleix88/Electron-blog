import {combineReducers} from 'redux'

import PostReducer from './post'
import SelectedReducer from './selectedPost'
import AutosaveReducer from './autosave'

const allReducers = combineReducers({
    posts: PostReducer,
    selectedPost: SelectedReducer,
    isAutosaving: AutosaveReducer
})

export default allReducers