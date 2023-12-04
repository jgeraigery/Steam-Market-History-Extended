import '../styles/FilterContainer.css';
import React, { useState } from 'react';

function FilterContainer({setAppFilters}) {

    // Local filter state, updates the global filter state when apply filters button is pressed
    // Must be declared exactly the same as global filter state
    const initialFilters = {
        'queryType': 'name',
        'query': '',
        'all': true,
        'sale': false,
        'purchase': false,
        'listing': false,
        'cancellation': false,
    };
    const [currentFilters, setCurrentFilters] = useState(initialFilters);
    
    function setQueryTypeWrapper(value) {
        let tempFilters = currentFilters;
        tempFilters['queryType'] = value;
        setCurrentFilters(tempFilters);
    }

    function setQueryWrapper(value) {
        let tempFilters = currentFilters;
        tempFilters['query'] = value;
        setCurrentFilters(tempFilters);
    }

    function clearAppFilters() {
        handleAllCheckBoxChange();
        setAppFilters(initialFilters);
        setCurrentFilters(initialFilters);
    }

    function handleCheckBoxChange(checkbox_id) {
        let checkbox = document.getElementById(checkbox_id);
        let tempFilters = currentFilters;
        if (checkbox.checked) {
            tempFilters['all'] = false;
            document.getElementById('all').checked = false;
            tempFilters[checkbox_id] = true;
        } else {
            tempFilters[checkbox_id] = false;
            if (!(tempFilters['sale'] || tempFilters['purchase'] || tempFilters['listing'] || tempFilters['cancellation'])) {
                tempFilters['all'] = true;
                document.getElementById('all').checked = true;
            }
        }
        setCurrentFilters(tempFilters);
    }

    function handleAllCheckBoxChange() {
        let tempFilters = currentFilters;
        tempFilters['sale'] = false;
        tempFilters['purchase'] = false;
        tempFilters['listing'] = false;
        tempFilters['cancellation'] = false;
        tempFilters['all'] = true;
        document.getElementById('sale').checked = false;
        document.getElementById('purchase').checked = false;
        document.getElementById('listing').checked = false;
        document.getElementById('cancellation').checked = false;
        document.getElementById('all').checked = true;
    }

    // Filters: name query (str, null), game query (str, null), type (sale, purchase, listing, null), 3rd party name query (str, null),
    return(
        <div className='filter-container'>
            <div className='filter-header'>
                <h2>Filters</h2>
            </div>
            <div className='filters'>
                <div className='filter-buttons'>
                    <button className='filter-item app-button apply-button' onMouseDown={(e) => e.preventDefault()} onClick={() => setAppFilters(currentFilters)}>Apply Filters</button>
                    <button className='filter-item app-button clear-button' onMouseDown={(e) => e.preventDefault()} onClick={clearAppFilters}>Clear Filters</button>
                </div>
                <div className='filter-item search-bar-container'>
                    <i className="fa-solid fa-magnifying-glass" style={{color: '#ffffff'}}></i>
                    <input className='search-box' placeholder='Search by...' onChange={e => setQueryWrapper(e.target.value)}></input>
                    <select className='select-box filter-text' onChange={e => setQueryTypeWrapper(e.target.value)}>
                        <option className='filter-text' value='name'>Item Name</option>
                        <option className='filter-text' value='game'>Game</option>
                        <option className='filter-text' value='third_party_name'>Third Party</option>
                        <option className='filter-text' value='id'>ID</option>
                    </select>
                </div>
                <div className='filter-item transaction-type'>
                    <label className='filter-text'>Transaction type: </label>
                    <div>
                        <div>
                            <input id='all' type='checkbox' value='All' defaultChecked onChange={() => handleAllCheckBoxChange()} ></input>
                            <label className='filter-text'>All</label>
                        </div>
                        <div>
                            <input id='sale' type='checkbox' value='Sale' onChange={() => handleCheckBoxChange('sale')}></input>
                            <label className='filter-text'>Sale</label>
                        </div>
                        <div>
                            <input id='purchase' type='checkbox' value='Purchase' onChange={() => handleCheckBoxChange('purchase')}></input>
                            <label className='filter-text'>Purchase</label>
                        </div>
                        <div>
                            <input id='listing' type='checkbox' value='Listing' onChange={() => handleCheckBoxChange('listing')}></input>
                            <label className='filter-text'>Listing</label>
                        </div> 
                        <div>
                            <input id='cancellation' type='checkbox' value='Cancellation' onChange={() => handleCheckBoxChange('cancellation')}></input>
                            <label className='filter-text'>Cancellation</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FilterContainer;