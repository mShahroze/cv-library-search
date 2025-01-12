'use client';

import { useState, useEffect } from 'react';
import { useDebounce } from '@/_lib/utils/hooks';

interface Location {
  id: number;
  name: string;
}

export const LocationAutocomplete = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Location[]>([]);
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    const fetchLocations = async () => {
      if (debouncedQuery.length < 2) {
        setSuggestions([]);
        return;
      }

      try {
        const response = await fetch(
          `https://api.cv-library.co.uk/v1/locations?q=${debouncedQuery}`
        );
        const data = await response.json();
        setSuggestions(data);
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };

    fetchLocations();
  }, [debouncedQuery]);

  return (
    <div className="relative flex-1">
      <input
        type="text"
        placeholder="e.g. town or postcode"
        className="w-full p-2 border rounded"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {suggestions.length > 0 && (
        <ul className="absolute w-full bg-white border rounded mt-1 max-h-60 overflow-auto">
          {suggestions.map((location) => (
            <li
              key={location.id}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                setQuery(location.name);
                setSuggestions([]);
              }}
            >
              {location.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
