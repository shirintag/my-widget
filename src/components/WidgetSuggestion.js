import React, { Fragment } from 'react'

import "./WidgetSuggestion.css"

function WidgetSuggestion(props) {
    const listWords = props.suggestionList.map((word, index) => {
        let arr = word.split(props.searchTerm)
        let term = arr.join(`<span>${props.searchTerm}</span>`)
        return <li key={index} className={props.highlightIndex === index && "highlight" || ""}
                    onClick={() => {
                        props.setSearchTerm(word)
                        props.setShowSuggestion(false)
                    }}
                   dangerouslySetInnerHTML={{__html: term}}
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