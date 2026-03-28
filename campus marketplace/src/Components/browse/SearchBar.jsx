import React from 'react';

const SearchBar = ({ search, setSearch, onSearch }) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearch && onSearch();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto mb-8 relative z-10 group">
      <div className="glass-card rounded-2xl flex items-center p-1 border border-white/10 hover:border-[rgba(99,102,241,0.4)] hover:shadow-[0_0_0_2px_rgba(99,102,241,0.2)] focus-within:animate-circular-glow focus-within:border-[rgba(99,102,241,1)] transition-all duration-300">
        <span className="material-symbols-outlined ml-4 text-on-surface-variant group-focus-within:text-primary transition-colors">search</span>
        <input
          className="w-full bg-transparent border-2 border-transparent py-4 px-4 text-lg font-plus-jakarta text-on-surface focus:ring-0 focus:outline-none focus:border-primary placeholder-[rgba(163,170,196,0.4)] transition-all duration-300"
          placeholder="Search for gear, textbooks, or services across campus..."
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button
          className="mr-1 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white font-bold px-8 py-3 rounded-xl hover:opacity-90 active:scale-95 transition-all duration-300 animate-button-pulse"
          onClick={onSearch}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
