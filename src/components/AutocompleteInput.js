import React from 'react'

import "./AutocompleteInput.css"

import WidgetSuggestion from './WidgetSuggestion.js'
import { getSuggestions } from '../utils'

function AutocompleteInput(props) {
    const [searchTerm, setSearchTerm] = React.useState("")
    const [suggestionList, setSuggestionList] = React.useState([])
    const [highlightIndex, setHighlightIndex] = React.useState(0)
    const [movingUp, setMovingUp] = React.useState(false)

    const handleChange = event => {
        setSearchTerm(event.target.value)
        setSuggestionList(getSuggestions(event.target.value, props.data))
    }

    const handleKey = (event) => {
        if (event.key === 'ArrowUp') {
            if (highlightIndex !== 0) {
                setHighlightIndex(highlightIndex - 1)
            }
            setMovingUp(true)
        } else if (event.key === 'ArrowDown') {
            if (highlightIndex < suggestionList.length - 1) {
                setHighlightIndex(highlightIndex + 1)
            }
            setMovingUp(false)
        } else if (event.key === 'Enter') {
            setSearchTerm(suggestionList[highlightIndex].target)
            setSuggestionList([])
            setHighlightIndex( 0)
        } else if (event.key === 'Escape') {
            setSearchTerm('')
            setSuggestionList([])
            setHighlightIndex( 0)
        }
    }

    return (
        <div className="container">
            <label>
                <input
                    type="text"
                    placeholder="Search term"
                    value={searchTerm}
                    onChange={handleChange}
                    onKeyDown={handleKey}
                    className={"input"}
                />
            </label>
            {suggestionList.length > 0 && <WidgetSuggestion highlightIndex={highlightIndex}
                                                 searchTerm={searchTerm}
                                                 setSearchTerm={setSearchTerm}
                                                 setSuggestionList={setSuggestionList}
                                                 suggestionList={suggestionList}
                                                 movingUp={movingUp}
            />}
        </div>
    )
}

export default AutocompleteInput
