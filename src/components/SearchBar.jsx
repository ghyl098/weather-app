function SearchBar({ city, setCity, onSearch, onKeyDown, loading }) {
  return (
    <div className="search-box">
      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={onKeyDown}
      />
      <button onClick={onSearch} disabled={loading}>
        {loading ? 'Searching...' : 'Search'}
      </button>
    </div>
  )
}

export default SearchBar