import '../styles/FilterContainer.css';
import React, { useState } from 'react';

function FilterContainer() {
    const [tableSize, setTableSize] = useState(50);

    return(
        <div className='filter-container'>
            <button className='app-button login-button'>Login to Steam</button>
        </div>
    );
}

export default FilterContainer;