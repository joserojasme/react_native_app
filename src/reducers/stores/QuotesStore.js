const initialState = {
    quotes:{},
    quotesData:{},
}

function QuotesStore(state = initialState, action) {
    switch (action.type) {
        case 'SET_QUOTES': {
            return {
                ...state,
                quotes: action.payload.item
            }
        }
        case 'SET_QUOTES_DATA': {
            return {
                ...state,
                quotesData: action.payload.item
            }
        }
        default:
            return state
    }
}

export default QuotesStore;