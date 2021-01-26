import React from 'react'
import "./AutocompleteInput.css"

import WidgetSuggestion from './WidgetSuggestion.js'
import { getSuggestions} from '../utils'

function AutocompleteInput(props) {
    const [searchTerm, setSearchTerm] = React.useState("")
    const [suggestionList, setSuggestionList] = React.useState([])
    const [showSuggestion, setShowSuggestion] = React.useState(true)
    const [highlightIndex, setHighlightIndex] = React.useState(null)

    const handleChange = event => {
        setSearchTerm(event.target.value)
        setShowSuggestion(true)
        setSuggestionList(getSuggestions(event.target.value, props.data))
    }

    const handleKey = (event) => {
        if (event.key === 'ArrowUp'){
            if (highlightIndex === null || highlightIndex === 0) {
                setHighlightIndex( suggestionList.length - 1)
            } else {
                setHighlightIndex(highlightIndex - 1)
            }
        } else if (event.key === 'ArrowDown') {
            if (highlightIndex === null || highlightIndex >= suggestionList.length - 1) {
                setHighlightIndex( 0)
            } else {
                setHighlightIndex(highlightIndex + 1)
            }
        } else if (event.key === 'Enter') {
            setSearchTerm(suggestionList[highlightIndex])
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
                                                    suggestionList={suggestionList}/>
            }
        </div>
    )
}

export default AutocompleteInput
