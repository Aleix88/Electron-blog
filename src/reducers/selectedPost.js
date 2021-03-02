import { selectPost } from "../actions"


const defaultState = {
    id: null,
    title: "",
    data: {}
}

const selectedPostReducer = (state=defaultState, action) => {
    switch (action.type) {
        case 'selectedPost/select':
            return {
                ...state,
                title: action.payload.title,
                data: action.payload.data,
                id: action.payload.id
            }
        case 'selectedPost/editTitle':
            return {
                ...state,
                title: action.payload
            }
        case 'selectedPost/editContent':
            return {
                ...state,
                data: action.payload
            }
        default:
            return state
    }
}

export default selectedPostReducer