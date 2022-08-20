import { useEffect, useState } from 'react';

export const Dropdown = ({ searchBy, search, isLoading, openForm }) => {
  const [showResults, setShowResults] = useState(false);
  const [pagination, setPagination] = useState(10);
  const [results, setResults] = useState([]);
  const [value, setValue] = useState('');

  const openResults = () => setShowResults(true);
  const closeResults = () => setShowResults(false);

  const resetSearch = () => {
    setValue('');
    setResults([]);
    setPagination(10);
  };

  useEffect(() => {
    closeResults();
    resetSearch();
  }, [searchBy]);

  const handleResults = (isWritten) => {
    if (isWritten) {
      if (!showResults) openResults();
    } else {
      setPagination(10);
      closeResults();
    }
  };

  const handleSearch = (evt) => {
    const value = evt.target.value;
    setValue(value);

    search({ attribute: searchBy, value })
      .then((res) => {
        setResults(res);
      })
      .catch((err) => {
        setResults([]);
      });

    handleResults(Boolean(value.length));
  };

  const handleOnClick = () => {
    openForm({ [searchBy]: value });
  };

  const handleScroll = (evt) => {
    const scrollEnd = evt.target.scrollHeight - evt.target.scrollTop === evt.target.clientHeight;
    if (scrollEnd) {
      const paginationIncrease = pagination + 10;

      setPagination(paginationIncrease);

      search({ attribute: searchBy, value, pagination: paginationIncrease })
        .then((res) => {
          setResults(res);
        })
        .catch((err) => {
          setResults([]);
        });
    }
  };

  return (
    <form className='dropdown'>
      <div className='search-box'>
        <div className={`search ${isLoading && 'is-loading'}`}>
          <input
            placeholder={`Search By ${searchBy}`}
            onChange={handleSearch}
            value={value}
            name='search'
          />
        </div>
        {showResults && (
          <ul className='results' onScroll={handleScroll}>
            <li className='results__item'>
              {results.length === 0 && <span className='results__text'>Without results</span>}
              <button className='results__btn' type='button' onClick={handleOnClick}>
                Add ?
              </button>
            </li>
            {results.map((user, idx) => (
              <li className='results__item' key={idx}>
                <span className='results__text'>{`${user.nit} ${user.nombre}`}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </form>
  );
};
