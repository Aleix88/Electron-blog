const autosaveReducer = (state=false, action) => {
    switch (action.type) {
        case 'autosave/changeState':
            return action.payload
        default:
            return state
    }
}

export default autosaveReducer