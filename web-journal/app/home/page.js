'use client';

import { useState, useEffect } from 'react';
import NewEntryModal from '../components/NewEntryModal';
import EntryCard from '../components/EntryCard';
export default function HomePage() {
  const filterOptions = ['Week', 'Month', 'Year', 'All'];
  const [filter, setFilter] = useState('Week');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEntries = async () => {
    try {
      const res = await fetch('/api/entries');
      const data = await res.json();

      if (data.success) {
        setEntries(data.entries);
      } else {
        console.error('Failed to fetch entries:', data.error);
      }
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {

    fetchEntries();
  }, []);

  const handleFilterClick = (option) => {
    setFilter(option);
    setStartDate('');
    setEndDate('');
  };

  const handleStartDateChange = (value) => {
    setStartDate(value);
    setFilter('');
  };

  const handleEndDateChange = (value) => {
    setEndDate(value);
    setFilter('');
  };

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">My Journal</h1>
        <button 
          className="bg-blue-500 px-4 py-2 rounded-xl hover:bg-blue-700"
          onClick={() => setIsModalOpen(true)}
        >
          Write New Entry
        </button>
      </div>

      <NewEntryModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onEntryAdded={() => {
          fetchEntries();
        }}
      />

      <div className="flex flex-wrap gap-2">
        {filterOptions.map(option => (
          <button
            key={option}
            className={`px-4 py-1 rounded border ${filter === option
                ? 'bg-blue-500'
                : 'bg-[var(--foreground)] text-[var(--background)] border-gray-300 hover:bg-gray-100'
              }`}
            onClick={() => handleFilterClick(option)}
          >
            {option}
          </button>
        ))}
      </div>

      <div className="flex gap-4 items-center">
        <input
          type="date"
          value={startDate}
          onChange={e => handleStartDateChange(e.target.value)}
          className="border p-2 rounded"
          max={endDate || undefined}
        />
        <span>to</span>
        <input
          type="date"
          value={endDate}
          onChange={e => handleEndDateChange(e.target.value)}
          className="border p-2 rounded"
          min={startDate || undefined}
        />
      </div>

      <div className="mt-6 border rounded-xl p-6 text-center text-gray-300">
        {loading ? (
          <p className="text-lg">Loading entries…</p>
        ) : entries.length === 0 ? (
          <div>
            <p className="text-lg">You have no journal entries yet.</p>
            <p className="text-sm mt-1">Click "Write New Entry" to get started!</p>
          </div>
        ) : (
          <ul className="space-y-2">
            {entries.map(entry => (
              <EntryCard key={entry._id} entry={entry} onEntryDeleted={fetchEntries} />
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}