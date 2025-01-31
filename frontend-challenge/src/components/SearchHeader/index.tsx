import React, { useState } from 'react';
import { searchSeries, SerieInfo } from '../../services/omdbApi';
import { Box, Typography } from '@mui/material';


function debounce<T extends (...args: any[]) => void>(func: T, delay: number): T {
  let timeout: any;
  return function (...args: any[]) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  } as T;
}

const Search: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<SerieInfo[]>([]);
  const [displayResults, setDisplayResults] = useState<boolean>(false);


  const searchAPI = async (query: string): Promise<void> => {
    if (query.length < 0) {
      setResults([]);
      return;
    }
    try {
      const response = await searchSeries(query);
      setResults(response);
      setDisplayResults(true);
    } catch (error) {
      console.log(error)
    }
  };


  const debouncedSearch = debounce(searchAPI, 500);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
  };

  console.log(results)
  return (
    <div className="w-[80%] relative">
      <input
        type='text'
        value={query}
        onChange={handleChange}
        placeholder="Search for series and episodes"
        className="w-full pl-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-0 bg-white"
        onClick={() => setDisplayResults(true)}
      />
      {displayResults && results && results.length > 0 && 
          <Box className="mt-1 flex flex-col bg-gray-100 border border-gray-300 rounded-lg w-full z-50 absolute">
          {results?.map((item: SerieInfo) => (
              <a href={`/details/${item.imdbID}`}>
              <Box className='h-10 p-2 flex flex-row border-b-solid border-gray-300 pl-4 py-3' >
                  <Typography>{item.Title}</Typography>
              </Box>
            </a>
          ))}
        </Box>
      }
    </div>
  );
};

export default Search;
