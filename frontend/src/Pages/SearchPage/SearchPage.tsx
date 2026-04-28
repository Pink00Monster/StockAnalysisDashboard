import React, { useState } from 'react'
import type { CompanySearch } from '../../company';
import { searchCompanies } from '../../api';
import Navbar from '../../Components/Navbar/Navbar';
import Search from '../../Components/Search/Search';
import CardList from '../../Components/CardList/CardList';
import ListPortfolio from '../../Components/Portfolio/ListPortfolio/ListPortfolio';

type Props = {}

const SearchPage = (props: Props) => {
    const [searchTerm, setSearchTerm] = useState<string>("");
  const [portfolioValues, setPortfolioValues] = useState<string[]>([]);
  const [searchResult, setSearchResult] = useState<CompanySearch[]>([]);
  const [serverError, setServerError] = useState<string | null>(null);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    console.log(e);
  }
  const onSearchSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const res = await searchCompanies(searchTerm);
    if (typeof res === "string") {
      setServerError(res);
    } else if (Array.isArray(res?.data)) {
      setSearchResult(res.data);
    }
    console.log(searchResult);
  }

  const onPortfolioCreate = (e: any) => {
    e.preventDefault();
    const exist = portfolioValues.find((value) => value === e.target[0].value);
    if (exist) {
      alert("This stock is already in your portfolio");
      return;
    }
    const updatedPortfolio = [...portfolioValues, e.target[0].value];
    setPortfolioValues(updatedPortfolio);
  }

  const onPortfolioDelete = (e:any) => {
    e.preventDefault();
    const updatedPortfolio = portfolioValues.filter((value) => value !== e.target[0].value);
    setPortfolioValues(updatedPortfolio);
  }
  return (
    <div className="App">
      <Search onSearchSubmit={onSearchSubmit} search={searchTerm} handleSearchChange={handleSearchChange}/>
      <ListPortfolio portfolioValues={portfolioValues} onPortfolioDelete={onPortfolioDelete} />
      <CardList searchResults={searchResult} onPortfolioCreate={onPortfolioCreate} />
      {serverError && <p style={{ color: 'red' }}>{serverError}</p>}
    </div>
  )
}

export default SearchPage