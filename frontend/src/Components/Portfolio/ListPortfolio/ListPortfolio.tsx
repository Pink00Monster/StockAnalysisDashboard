import React from 'react'
import Card from '../../Card/Card';
import CardPortfolio from '../CardPortfolio/CardPortfolio';

type Props = {
  portfolioValues: string[];
  onPortfolioDelete: (e:any) => void;
}

const ListPortfolio = ({ portfolioValues, onPortfolioDelete }: Props) => {
  return (
    <>
      <h3> My Portfolio</h3> 
      <ul>
        {portfolioValues && portfolioValues.map((value) => {
          return <CardPortfolio portfolioValue={value} onPortfolioDelete={onPortfolioDelete} />
        })}
      </ul>
    </>
  )
}

export default ListPortfolio