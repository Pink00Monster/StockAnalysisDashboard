import React, { type JSX } from 'react'
import Card from '../Card/Card'
import type { CompanySearch } from '../../company';
import {v4 as uuidv4} from 'uuid';

type Props = {
    searchResults: CompanySearch[];
}

const CardList : React.FC<Props> = ({ searchResults }: Props) :JSX.Element => {
  return (
    <div>
        {searchResults.length > 0 ? (
            searchResults.map((result) => (
              <Card id={result.symbol} key={uuidv4()} searchResult={result}/>
            ))
          ) : (
            <p>No results found.</p>
          )}
    </div>
  )
}

export default CardList