import '../styles/FilterContainer.css';
import React, { useState } from 'react';

function FilterContainer({setAppFilters}) {

    // Local filter state, updates the global filter state when apply filters button is pressed
    const [currentFilters, setCurrentFilters] = useState(
        {
            'queryType': 'name',
            'query': '',
        }
    );

    const [queryType, setQueryType] = useState('name');
    const [query, setQuery] = useState('');
    
    function setQueryTypeWrapper(value) {
        setQueryType(value);
        let tempFilters = currentFilters;
        tempFilters['queryType'] = value;
        tempFilters['query'] = query;
        setCurrentFilters(tempFilters);
    }

    function setQueryWrapper(value) {
        setQuery(value);
        let tempFilters = currentFilters;
        tempFilters['queryType'] = queryType;
        tempFilters['query'] = value;
        setCurrentFilters(tempFilters);
    }

    // Filters: name query (str, null), game query (str, null), type (sale, purchase, listing, null), 3rd party name query (str, null),
    return(
        <div className='filter-container'>
            <div className='filter-header'>
                <h2 className='filter-text'>Filters</h2>
            </div>
            <div className='filters'>
                <button className='filter-item app-button' onMouseDown={(e) => e.preventDefault()} onClick={() => setAppFilters(currentFilters)}>Apply Filters</button>
                <div className='filter-item'>
                    <label className='filter-text'>Search by:  </label>
                    <select className='select-box' onChange={e => setQueryTypeWrapper(e.target.value)}>
                        <option value='name'>Item Name</option>
                        <option value='game'>Game</option>
                        <option value='third_party_name'>Third Party Name</option>
                    </select>
                </div>
                <input className='filter-item search-box' onChange={e => setQueryWrapper(e.target.value)}></input>
            </div>
        </div>
    );
}

export default FilterContainer;