import './App.css'
import AutocompleteInput from './components/AutocompleteInput.js'

import data from './data'

function App() {
  return (
    <div className="App">
        <AutocompleteInput data={data}/>
    </div>
  )
}

export default App
