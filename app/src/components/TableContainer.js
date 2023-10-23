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
            <button onClick={getMarketData}>Load</button>
            <Table data={tableData}/>
        </div>
    );
}

export default TableContainer;