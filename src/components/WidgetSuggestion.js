import React, { Fragment, useRef, useEffect, useState } from 'react'

import fuzzysort from 'fuzzysort'

import "./WidgetSuggestion.css"

function WidgetSuggestion(props) {
    const myRef = useRef(null)
    const containerRef =  useRef(null)

    const listWords = props.suggestionList.map((word, index) => {
        let highlightTerm = fuzzysort.highlight(word, '<span>', '</span>')
        return <li key={index} className={(props.highlightIndex === index && "highlight") || ""}
                   ref={props.highlightIndex === index && myRef || null}
                   onClick={() => {
                       props.setSearchTerm(word.target)
                       props.setShowSuggestion(false)
                   }}
                   dangerouslySetInnerHTML={{__html: highlightTerm}}
                />
    })

    if (props.highlightIndex != null && myRef.current) {
        let offset;
        if (props.movingUp) {
            offset = myRef.current.offsetTop - 100 - myRef.current.offsetHeight
        } else {
            offset = myRef.current.offsetTop - 100
        }
        containerRef.current.scrollTo(0, offset)
    }

    if (listWords.length > 0) {
        return (
            <ul className={'suggestion-container'} ref={containerRef}>
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