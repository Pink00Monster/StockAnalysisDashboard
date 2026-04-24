import { useState } from 'react'
import './App.css'
import Card from './Components/Card/Card'
import CardList from './Components/CardList/CardList'
import Search from './Components/Search/Search'
import { searchCompanies } from './api'
import type { CompanySearch } from './company'

function App() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResult, setSearchResult] = useState<CompanySearch[]>([]);
  const [serverError, setServerError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    console.log(e);
  }
  const onClick = async () => {
    const res = await searchCompanies(searchTerm);
    if (typeof res === "string") {
      setServerError(res);
    } else if (Array.isArray(res?.data)) {
      setSearchResult(res.data);
    }
    console.log(searchResult);
  }

  return (
    <div className="App">
      <Search onClick={onClick} search={searchTerm} handleChange={handleChange}/>
      {serverError && <p style={{ color: 'red' }}>{serverError}</p>}
      <CardList />
    </div>
  )
}

export default App
