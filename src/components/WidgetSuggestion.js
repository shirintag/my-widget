import React, { Fragment } from 'react'

import fuzzysort from 'fuzzysort'

import "./WidgetSuggestion.css"

function WidgetSuggestion(props) {
    const listWords = props.suggestionList.map((word, index) => {
        let highlightTerm = fuzzysort.highlight(word, '<span>', '</span>')

        return <li key={index} className={(props.highlightIndex === index && "highlight") || ""}
                    onClick={() => {
                        props.setSearchTerm(word.target)
                        props.setShowSuggestion(false)
                    }}
                   dangerouslySetInnerHTML={{__html: highlightTerm}}
                />
    })

    if (listWords.length > 0) {
        return (
            <ul className={'suggestion-container'}>
                {listWords}
            </ul>
        )
    } else {
        return (
            <Fragment></Fragment>
        )
    }
}

export default WidgetSuggestion