function RecentSearches({ searches, onCityClick, onClear }) {
  if (searches.length === 0) return null

  return (
    <div className="recent-list">
      {searches.map((c) => (
        <button key={c} className="recent-chip" onClick={() => onCityClick(c)}>
          {c}
        </button>
      ))}
      <button className="clear-chip" onClick={onClear}>
        Clear ✕
      </button>
    </div>
  )
}

export default RecentSearches