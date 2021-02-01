const fuzzysort = require('fuzzysort')

export const getSuggestions = (term, suggestionList) => {
    const options = {
        limit: 10,
        allowTypo: false,
        threshold: -5000,
    }
    if (term !== '') {
        return fuzzysort.go(term, suggestionList, options)
    }
    return []
}
