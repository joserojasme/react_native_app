const initialState = {
    termsAndConditions:{}
}

function TermsAndConditionsStore(state = initialState, action) {
    switch (action.type) {
        case 'SET_TERMS_AND_CONDITIONS': {
            return {
                ...state,
                termsAndConditions: action.payload.item
            }
        }
        default:
            return state
    }
}

export default TermsAndConditionsStore;