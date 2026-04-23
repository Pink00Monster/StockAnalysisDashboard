import React from 'react'
import "./Card.css"

type Props = {}

const Card = (props: Props) => {
  return (
    <div className='card'>
        <img src="https://www.visitfyn.com/files/visitfyn.com/styles/sixteen_nine_2xl_webp/public/2020-02/Dyreborg%20Skov_Daniel%20Villadsen.jpg.webp?h=-iJOEkU_&v=450x371" alt="Image" />
    
        <div className="details">
            <h2>AAPL</h2>
            <p>$110</p>
        </div>
        <p className='info'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, voluptate.</p>
    </div>

  )
}

export default Card