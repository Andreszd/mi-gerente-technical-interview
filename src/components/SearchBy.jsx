export const SearchBy = ({ attributes = [], onChange, defaultValue }) => {
  const handleOnChange = (evt) => {
    onChange(evt.target.value);
  };

  return (
    <div className='search-by'>
      <span>Search By:</span>
      <select placeholder='Search By' onChange={handleOnChange} defaultValue={defaultValue}>
        {attributes.map((attr, idx) => (
          <option key={idx} value={attr}>
            {attr}
          </option>
        ))}
      </select>
    </div>
  );
};
