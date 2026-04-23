import React, { useState, type JSX } from 'react'

type Props = {}

const Search : React.FC<Props> = (props: Props) :JSX.Element => {
    const[searchTerm, setSearchTerm] = useState<string>("");
    return (
    <div>
        <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => {setSearchTerm(e.target.value);
                console.log(e);
            }}
            
        />
    </div>
  )
}

export default Search