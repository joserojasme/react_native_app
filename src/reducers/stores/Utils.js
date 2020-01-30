const initialState = {
    loading:false,
    userAttributes:{},
    provincesStore:null
}

function Utils(state = initialState, action) {
    switch (action.type) {
        case 'SET_LOADING': {
            return {
                ...state,
                loading: action.payload.item
            }
        }
        case 'SET_USER_ATTRIBUTES': {
            return {
                ...state,
                userAttributes: action.payload.item
            }
        }
        case 'SET_PROVINCES': {
            return {
                ...state,
                provincesStore: action.payload.item
            }
        }
        default:
            return state
    }
}

export default Utils;