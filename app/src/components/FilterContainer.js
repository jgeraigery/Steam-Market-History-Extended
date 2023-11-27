import '../styles/FilterContainer.css';
import React, { useState } from 'react';

function FilterContainer({setAppFilters}) {

    console.log('FilterContainer Render');

    // Local filter state, updates the global filter state when apply filters button is pressed
    // Must be declared exactly the same as global filter state
    const [currentFilters, setCurrentFilters] = useState(
        {
            'queryType': 'name',
            'query': '',
            'transactionType': 'all',
        }
    );

    // Local filter values - useful if they need to interact. Currently not useful
    const [queryType, setQueryType] = useState('name');
    const [query, setQuery] = useState('');
    const [transactionType, setTransactionType] = useState('all');
    
    function setQueryTypeWrapper(value) {
        setQueryType(value);
        let tempFilters = currentFilters;
        tempFilters['queryType'] = value;
        setCurrentFilters(tempFilters);
        console.log('FilterContainer: ');
        console.log(currentFilters);
    }

    function setQueryWrapper(value) {
        setQuery(value);
        let tempFilters = currentFilters;
        tempFilters['query'] = value;
        setCurrentFilters(tempFilters);
        console.log('FilterContainer: ');
        console.log(currentFilters);
    }

    function setTransactionTypeWrapper(value) {
        setTransactionType(value);
        let tempFilters = currentFilters;
        tempFilters['transactionType'] = value;
        setCurrentFilters(tempFilters);
        console.log('FilterContainer: ');
        console.log(currentFilters);
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
                        <option value='id'>ID</option>
                    </select>
                </div>
                <input className='filter-item search-box' onChange={e => setQueryWrapper(e.target.value)}></input>
                <div>
                    <label className='filter-text'>Transaction type: </label>
                    <select className='select-box' onChange={e => setTransactionTypeWrapper(e.target.value)}>
                        <option value='all'>All</option>
                        <option value='Sale'>Sale</option>
                        <option value='Purchase'>Purchase</option>
                        <option value='Listing'>Listing</option>
                        <option value='Cancellation'>Cancellation</option>
                    </select>
                </div>
            </div>
        </div>
    );
}

export default FilterContainer;