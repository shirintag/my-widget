import React, { Fragment, useRef } from 'react'

import fuzzysort from 'fuzzysort'

import "./WidgetSuggestion.css"

function WidgetSuggestion(props) {
    const highlightRef = useRef(null)
    const containerRef =  useRef(null)

    const listWords = props.suggestionList.map((result, index) => {
        // highlight the search term using fuzzySort library
        let highlightTerm = fuzzysort.highlight(result, '<span>', '</span>')
        return <li key={index} className={(props.highlightIndex === index && "highlight") || ""}
                   // reference the highlighted list element
                   ref={(props.highlightIndex === index && highlightRef) || null}
                   onClick={() => {
                       props.setSearchTerm(result.target)
                       props.setSuggestionList([])
                   }}
                   dangerouslySetInnerHTML={{__html: highlightTerm}}
                />
    })

    // scrolls on up and down key and calculate how much should it move
    if (props.highlightIndex != null && highlightRef.current) {
        let offset
        if (props.movingUp) {
            offset = highlightRef.current.offsetTop - 100 - highlightRef.current.offsetHeight
        } else {
            offset = highlightRef.current.offsetTop - 100
        }
        containerRef.current.scrollTo(0, offset)
    }

    return (
        <ul className={'suggestion-container'} ref={containerRef}>
            {listWords}
        </ul>
    )
}

export default WidgetSuggestion
