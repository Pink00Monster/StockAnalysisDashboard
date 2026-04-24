import React, { useState, type JSX } from 'react'

type Props = {}

const Search = (props: Props) => {
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
        <button onClick={() => console.log("Search for:", searchTerm)}>Search</button>
    </div>
  )
}

export default Search