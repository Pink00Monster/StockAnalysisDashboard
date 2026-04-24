import React from 'react'

type Props = {
    onPortfolioDelete: (e:any) => void;
    portfolioValue: string;
}

const DeletePortfolio = ({ onPortfolioDelete, portfolioValue }: Props) => {
  return (
    <div>
      <form onSubmit={onPortfolioDelete}>
        <input type="hidden" value={portfolioValue} />
        <button>Delete</button>
      </form>
    </div>
  )
}

export default DeletePortfolio