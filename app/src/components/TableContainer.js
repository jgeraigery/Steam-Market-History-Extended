import '../styles/TableContainer.css';
import React, { useState } from 'react';
import Table from './Table'
import TableSizeDropdown from './TableSizeDropdown';

function TableContainer() {

    const [tableData, setTableData] = useState(null);
    const [tableSize, setTableSize] = useState(50);

    function getMarketData() {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://127.0.0.1:8000/get_market_data');
        xhr.onload = function() {
            if (xhr.status === 200) {
                setTableData(JSON.parse(xhr.responseText));
                //console.log(tableData)
            }
        };
        xhr.send();
    }

    return(
        <div className='table-container'>
            <div className='top-bar'>
                <button className='app-button refresh-button' onClick={getMarketData}>Refresh</button>
                <TableSizeDropdown handleClick={setTableSize} val={tableSize}/>
            </div>
            <Table data={tableData}/>
        </div>
    );
}

export default TableContainer;