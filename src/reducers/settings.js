
const SettingsReducer = (state = {}, action) => {
    switch (action.type) {
        case 'settings/image-endpoint':
            return {imageEndpoint: action.payload};
        default:
            return state;
    }
}

export default SettingsReducer