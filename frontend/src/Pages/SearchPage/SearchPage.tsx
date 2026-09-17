import React, { useEffect, useState } from 'react'
import type { CompanySearch } from '../../company';
import { searchCompanies } from '../../api';
import Navbar from '../../Components/Navbar/Navbar';
import Search from '../../Components/Search/Search';
import CardList from '../../Components/CardList/CardList';
import ListPortfolio from '../../Components/Portfolio/ListPortfolio/ListPortfolio';
import type { PortfolioGet } from '../../Models/Portfolio';
import { portfolioAddAPI, portfolioDeleteAPI, portfolioGetAPI } from '../../Services/PortfolioService';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type Props = {}

const SearchPage = (props: Props) => {
    const [searchTerm, setSearchTerm] = useState<string>("");
  const [portfolioValues, setPortfolioValues] = useState<PortfolioGet[] | null>([]);
  const [searchResult, setSearchResult] = useState<CompanySearch[]>([]);
  const [serverError, setServerError] = useState<string | null>(null);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }
  const onSearchSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const res = await searchCompanies(searchTerm);
    if (typeof res === "string") {
      setServerError(res);
    } else if (Array.isArray(res?.data)) {
      setSearchResult(res.data);
    }
  }

  useEffect(() => {
    getPortfolio();
  },[])

  const getPortfolio = () => {
    portfolioGetAPI()
    .then((res) =>{
      if (res?.data){
        setPortfolioValues(res?.data);
      }
    }).catch((e) => {
      toast.warning("Could not fetch portfolio data");
    })
  }

  const onPortfolioCreate = (e: any) => {
    e.preventDefault();
    portfolioAddAPI(e.target[0].value)
    .then((res) => {
      if (res?.status === 201){
        toast.success("Added to portfolio");
        getPortfolio();
      }
  }).catch((e) => {
    toast.warning("Could not add to portfolio");
    })
  }

  const onPortfolioDelete = (e:any) => {
    e.preventDefault();
    portfolioDeleteAPI(e.target[0].value)
    .then((res) => {
      if (res?.status === 200){
        toast.success("Deleted from portfolio");
        getPortfolio();
      }
    }).catch((e) => {
      toast.warning("Could not delete from portfolio");
    })

  }
  return (
    <div className="App">
      <Search onSearchSubmit={onSearchSubmit} search={searchTerm} handleSearchChange={handleSearchChange}/>
      <ListPortfolio portfolioValues={portfolioValues!} onPortfolioDelete={onPortfolioDelete} />
      <CardList searchResults={searchResult} onPortfolioCreate={onPortfolioCreate} />
      {serverError && <p style={{ color: 'red' }}>{serverError}</p>}
    </div>
  )
}

export default SearchPage