'use client';

import { useState } from 'react';
import { LocationAutocomplete } from './LocationAutocomplete';
// import { TabSelector } from './TabSelector';

export const SearchForm = () => {
  // const [activeTab, setActiveTab] = useState<'location' | 'industry'>(
  //   'location'
  // );
  const [searchQuery, setSearchQuery] = useState('');
  const [distance, setDistance] = useState('15');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="space-y-4">
        <input
          type="text"
          placeholder="e.g. Sales Executive"
          className="w-full p-2 border rounded"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <div className="flex gap-4">
          <LocationAutocomplete />
          <select
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="15">15 miles</option>
            {/* Add other distance options */}
          </select>
        </div>

        {/* <TabSelector
          activeTab={activeTab}
          onTabChange={setActiveTab}
        /> */}

        <button
          type="submit"
          className="w-full bg-green-500 text-white p-2 rounded"
        >
          Find jobs now
        </button>
      </div>
    </form>
  );
};
