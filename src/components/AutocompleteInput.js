import React from 'react'

import "./AutocompleteInput.css"

import WidgetSuggestion from './WidgetSuggestion.js'
import { getSuggestions} from '../utils'

function AutocompleteInput(props) {
    const [searchTerm, setSearchTerm] = React.useState("")
    const [suggestionList, setSuggestionList] = React.useState([])
    const [showSuggestion, setShowSuggestion] = React.useState(true)
    const [highlightIndex, setHighlightIndex] = React.useState(null)
    const [movingUp, setMovingUp] = React.useState(false)

    const handleChange = event => {
        setSearchTerm(event.target.value)
        setShowSuggestion(true)
        setSuggestionList(getSuggestions(event.target.value, props.data))
    }

    const handleKey = (event) => {
        if (event.key === 'ArrowUp') {
            if (highlightIndex === null) {
                setHighlightIndex( suggestionList.length - 1)
            } else if (highlightIndex === 0) {
            } else {
                setHighlightIndex(highlightIndex - 1)
            }
            setMovingUp(true)
        } else if (event.key === 'ArrowDown') {
            if (highlightIndex === null) {
                setHighlightIndex( 0)
            } else if (highlightIndex >= suggestionList.length - 1) {
            } else {
                setHighlightIndex(highlightIndex + 1)
            }
            setMovingUp(false)
        } else if (event.key === 'Enter') {
            setSearchTerm(suggestionList[highlightIndex].target)
            setShowSuggestion(false)
            setHighlightIndex( null)
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

            {
                showSuggestion && <WidgetSuggestion highlightIndex={highlightIndex}
                                                    searchTerm={searchTerm}
                                                    setSearchTerm={setSearchTerm}
                                                    setShowSuggestion={setShowSuggestion}
                                                    suggestionList={suggestionList}
                                                    movingUp={movingUp}
                />
            }
        </div>
    )
}

export default AutocompleteInput
