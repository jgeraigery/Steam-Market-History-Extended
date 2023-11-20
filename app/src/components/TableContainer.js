import '../styles/TableContainer.css';
import React, { useState, useEffect } from 'react';
import Table from './Table'
import TableSizeDropdown from './TableSizeDropdown';

function TableContainer({query, queryType}) {

    const [tableData, setTableData] = useState(null);
    const [tableSize, setTableSize] = useState(500);

    useEffect(
        () => {
            getMarketData();
        }, [query, queryType]
    )

    function applyFilters(data) {
        if (data === null) {
            return null;
        }
        // Tracks size of filtered list
        let new_count = data['count'];

        // Unpack the filters
        let queryLabel = queryType;
        let queryString = query.toLowerCase();

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

            res = applyFilters(JSON.parse(JSON.stringify(res)));

            setTableData(res);

        } catch(e) {
            console.error(e);
        }
    }

    return(
        <div className='table-container'>
            <div className='top-bar'>
                <button className='app-button refresh-button' onMouseDown={(e) => e.preventDefault()} onClick={getMarketData}>Refresh</button>
                <TableSizeDropdown handleClick={setTableSize} val={tableSize}/>
            </div>
            <Table data={tableData}/>
        </div>
    );
}

export default TableContainer;