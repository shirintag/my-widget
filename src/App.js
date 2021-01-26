import './App.css'
import AutocompleteInput from './components/AutocompleteInput.js'

import { data } from './utils'

function App() {
  return (
    <div className="App">
        <AutocompleteInput data={data}/>
    </div>
  )
}

export default App
