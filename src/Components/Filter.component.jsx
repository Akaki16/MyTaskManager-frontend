import React from 'react';
import PropTypes from 'prop-types';
import '../Styles/Filter.styles.css';

const Filter = ({
    handleFilter,
    handleFilteringCompletedTasks,
    searchValue,
    onSearchValueChange,
    handleSearch
}) => {
    return (
        <div className='filter'>
            <select onClick={handleFilter}>
                <option value='' disabled>Filter by difficulty level</option>
                <option value='all'>All</option>
                <option value='easy'>Easy</option>
                <option value='medium'>Medium</option>
                <option value='hard'>Hard</option>
            </select>
            <button onClick={handleFilteringCompletedTasks} type='button'>Completed</button>
            <input
                type='search'
                autoFocus
                autoComplete='off'
                placeholder='Type a search query'
                value={searchValue}
                onChange={onSearchValueChange}
                onKeyUp={handleSearch}
            />
        </div>
    );
}

Filter.propTypes = {
    handleFilteringCompletedTasks: PropTypes.func.isRequired,
    handleSearch: PropTypes.func.isRequired,
    searchValue: PropTypes.string.isRequired,
    onSearchValueChange: PropTypes.func.isRequired,
};

export default Filter;