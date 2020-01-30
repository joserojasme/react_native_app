export function SetQuotes(item) {
    return {
        type: 'SET_QUOTES',
        payload: {
            item
        }
    }
}

export function SetQuotesData(item) {
    return {
        type: 'SET_QUOTES_DATA',
        payload: {
            item
        }
    }
}
