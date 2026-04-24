import { useState } from 'react'
import './App.css'
import Card from './Components/Card/Card'
import CardList from './Components/CardList/CardList'
import Search from './Components/Search/Search'
import { searchCompanies } from './api'

function App() {
  const [count, setCount] = useState(0)
  console.log(searchCompanies("AAPL"));
  return (
    <div className="App">
      <Search />
      <CardList />
    </div>
  )
}

export default App
