import type { SyntheticEvent } from 'react';
import { searchCompanies } from '../../api';

type Props = {
    onClick: (e:SyntheticEvent) => void;
    search: string | undefined;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Search = (props: Props) => {
    return (
    <div>
        <input value={props.search} onChange={props.handleChange} />
        <button onClick={props.onClick}>Search</button>
    </div>
  )
}

export default Search