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
        <button className="block w-full py-3 text-white duration-200 border-2 rounded-lg bg-red-500 hover:text-red-500 hover:bg-white border-red-500">
          Delete
        </button>
      </form>
    </div>
  )
}

export default DeletePortfolio