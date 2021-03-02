
const postReducer = (state = [], action) => {
    switch (action.type) {
        case 'post/add':
            return [action.payload, ...state]
        case 'post/editTitle':
            return state.map(p => (p.id === action.payload.id ? {...p, title: action.payload.title} : p))
        case 'post/load':
            return action.payload
        default:
            return state;
    }
}

export default postReducer