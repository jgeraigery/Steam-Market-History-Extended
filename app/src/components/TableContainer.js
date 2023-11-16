import '../styles/TableContainer.css';
import React, { useState } from 'react';
import Table from './Table'
import TableSizeDropdown from './TableSizeDropdown';

function TableContainer({filters}) {

    const [tableData, setTableData] = useState(null);
    const [tableSize, setTableSize] = useState(500);

    function applyFilters(data) {
        // Tracks size of filtered list
        let new_count = data['count'];

        // Unpack the filters
        let queryLabel = filters['queryType'];
        let queryString = filters['query'].toLowerCase();

        // Approach: Look through each individual transaction and decide if it should stay
        // This applies filters sequentially to one transaction at a time
        let final_data = []
        for (let i = 0; i < data['count']; i++) {
            let entry = data['transaction_list'][i];
            // Apply search query 
            if (entry[queryLabel].toLowerCase().includes(queryString)) {
                final_data.push(entry);
            } else {
                new_count--;
            }
        }

        // Reassign transaction list and count
        data['transaction_list'] = final_data;
        data['count'] = new_count;
        return data;
    }

    async function getMarketData() {
        try {
            const response = await fetch('http://127.0.0.1:8000/get_market_data/?amount=' + tableSize.toString(),
                {
                    method: 'GET',
                    mode: 'cors',
                }
            )
            let res = await response.json();

            // JS weirdness- Can probably deprecate this eventually
            res = applyFilters(JSON.parse(JSON.stringify(res)));

            setTableData(res);

        } catch(e) {
            console.error(e);
        }
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