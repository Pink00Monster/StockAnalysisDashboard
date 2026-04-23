import React, { type JSX } from 'react'
import Card from '../Card/Card'

type Props = {}

const CardList : React.FC<Props> = (props: Props) :JSX.Element => {
  return (
    <div>
        <Card companyName="Apple Inc." ticker="AAPL" price={110} />
        <Card companyName="Microsoft Corporation" ticker="MSFT" price={200} />
        <Card companyName="Google LLC" ticker="GOOGL" price={150} />
        <Card companyName="Amazon.com Inc." ticker="AMZN" price={180} />
    </div>
  )
}

export default CardList