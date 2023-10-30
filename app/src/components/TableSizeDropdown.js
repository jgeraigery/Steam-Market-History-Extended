import '../styles/TableSizeDropdown.css';
import React from 'react';

function TableSizeDropdown({ handleClick, val }) {

    return (
        <div className='drop-down'>
            <span className='drop-down-value'>{val}</span>
            <div className='drop-down-content'>
                <button className='drop-down-button' onClick={() => handleClick(50)}>50</button>
                <button className='drop-down-button' onClick={() => handleClick(100)}>100</button>
                <button className='drop-down-button' onClick={() => handleClick(200)}>200</button>
                <button className='drop-down-button' onClick={() => handleClick(300)}>300</button>
                <button className='drop-down-button' onClick={() => handleClick(400)}>400</button>
                <button className='drop-down-button' onClick={() => handleClick(500)}>500</button>
                <button className='drop-down-button' onClick={() => handleClick('All')}>All</button>
            </div>
        </div>
    )
}

export default TableSizeDropdown;