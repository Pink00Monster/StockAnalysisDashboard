import type { SyntheticEvent } from 'react';
import { searchCompanies } from '../../api';

type Props = {
    onSearchSubmit: (e: SyntheticEvent) => void;
    search: string | undefined;
    handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Search = ({ onSearchSubmit, search, handleSearchChange }: Props) => {
    return (
    <>
        <form onSubmit={onSearchSubmit}>
            <input value={search} onChange={handleSearchChange} />
        </form>
    </>
  )
}

export default Search