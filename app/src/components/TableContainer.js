import '../styles/TableContainer.css';
import React, { useState } from 'react';
import Table from './Table'

function TableContainer() {

    const [tableData, setTableData] = useState(null);

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
            </div>
            <Table data={tableData}/>
        </div>
    );
}

export default TableContainer;