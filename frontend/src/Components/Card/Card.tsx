import "./Card.css"
import type { CompanySearch } from '../../company';

interface Props {
  id: string;
  searchResult: CompanySearch;
}

const Card = ({searchResult }: Props) => {
  return (
    <div className='card'>
        <img alt="company logo" />
    
        <div className="details">
            <h2>{searchResult.name} ({searchResult.symbol})</h2>
            <p>${searchResult.currency}</p>
        </div>
        <p className='info'> {searchResult.exchangeFullName} - {searchResult.exchange} </p>
    </div>

  )
}

export default Card