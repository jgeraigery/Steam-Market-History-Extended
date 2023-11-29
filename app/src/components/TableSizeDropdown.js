import '../styles/TableSizeDropdown.css';
import React, {useState} from 'react';

function TableSizeDropdown({ handleClick }) {

    const [value, setValue] = useState(10);

    function handleButtonClick(num) {
        setValue(num);
        handleClick(num);
    }

    return (
        <div className='drop-down-container'>
            <div className='drop-down'>
                <span className='drop-down-value'>{value}</span>
                <div className='drop-down-content'>
                    <button className='drop-down-button' onClick={() => handleButtonClick(10)}>10</button>
                    <button className='drop-down-button' onClick={() => handleButtonClick(25)}>25</button>
                    <button className='drop-down-button' onClick={() => handleButtonClick(50)}>50</button>
                    <button className='drop-down-button' onClick={() => handleButtonClick(100)}>100</button>
                    <button className='drop-down-button' onClick={() => handleButtonClick(250)}>250</button>
                    <button className='drop-down-button' onClick={() => handleButtonClick('All')}>All</button>
                </div>
            </div>
        </div>
    )
}

export default TableSizeDropdown;