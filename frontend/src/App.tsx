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
  const [serverError, setServerError] = useState<string | null>(null);

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

  const onPortfolioCreate = (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log(e);
  }

  return (
    <div className="App">
      <Search onClick={onClick} search={searchTerm} handleChange={handleChange}/>
      <CardList searchResults={searchResult} onPortfolioCreate={onPortfolioCreate} />
      {serverError && <p style={{ color: 'red' }}>{serverError}</p>}
    </div>
  )
}

export default App
