import '../styles/TableContainer.css';
import React, { useState, useEffect } from 'react';
import Table from './Table'
import TableSizeDropdown from './TableSizeDropdown';
import TableNavBar from './TableNavBar';

function TableContainer({reload=0, query, queryType, all, sale, purchase, listing, cancellation}) {
    /* STATES */

    // State of filtered data
    const [filteredData, setFilteredData] = useState(null);

    // State of current page
    const [page, setPage] = useState(null);
    const [pageSize, setPageSize] = useState(10);
    const [pageIndex, setPageIndex] = useState(0);
    const [numPages, setNumPages] = useState(1);

    /* HANDLE FILTER CHANGES */
    useEffect(
        () => {
            setPageIndex(
                0, 
                getMarketData()
            )
        }, [reload]
    );

    /* HANDLE DATA FETCHING */
    useEffect(
        () => {
            setNumPages(calcNumPages);
            generatePage();
        }, [filteredData]
    );

    /* HANDLE CHILD STATE VALUE UPDATES */
    useEffect (
        () => {
            let s = calcNumPages();
            if (s !== numPages) {
                setNumPages(s);
            }
            setPageIndex(0);
            generatePage();
        }, [pageSize]
    )

    useEffect(
        () => {
            generatePage();
        }, [pageIndex]
    )

    /* GETTERS FOR CHILDREN */
    function calcNumPages() {
        if (filteredData === null) {
            return 1;
        }
        return Math.ceil(filteredData['count'] / pageSize);
    }

    /* VALUE CHANGE HANDLERS */
    function handlePageSizeChange(val) {
        if (filteredData === null) {
            return;
        } else if (val === 'All') {
            val = filteredData['count'];
        }
        setPageSize(val);
    }

    function handlePageIndexChange(val) {
        if (Number.isInteger(val) && val >= 0 && val < numPages) {
            setPageIndex(val);
        } else if (val > numPages || val == -1) {
            setPageIndex(numPages - 1,);
        } else {
            setPageIndex(0);
        }
    }

    /* TABLE DATA FUNCTIONS */

    function applyPartition(tableData) {
        if (tableData === null) {
            return null;
        }
        let finalPageSize = tableData['count'] % pageSize;
        let start = pageSize * pageIndex;
        let end = (start + pageSize) <= tableData['count'] ? start + pageSize: start + finalPageSize;

        let currentPage = [];
        for (let i = start; i < end; i++) {
            currentPage.push(tableData['transaction_list'][i])
        }
        let tableClone = structuredClone(tableData);
        tableClone['transaction_list'] = currentPage;
        tableClone['count'] = end - start;
        return tableClone;
    }

    /* GENERATE FILTERED DATA FROM ALL DATA */
    function generateFilteredData(tableData) {
        if (tableData === null) {
            return null;
        }
        // Tracks size of filtered list
        let newCount = tableData['count'];

        // Unpack the filters
        let queryLabel = queryType;
        let queryString = query.toLowerCase();
        let tAll = all;
        let tType = [sale, purchase, listing, cancellation];

        // Approach: Look through each individual transaction and decide if it should be removed
        // This applies filters sequentially to one transaction at a time
        let finalData = []
        for (let i = 0; i < tableData['count']; i++) {
            let entry = tableData['transaction_list'][i];
            let pushEntry = true;

            // Apply type filter
            if (!tAll) {
                if (!sale && entry['gain_or_loss'] == 'Sale') {
                    pushEntry = false;
                } else if (!purchase && entry['gain_or_loss'] == 'Purchase') {
                    pushEntry = false;
                } else if (!listing && entry['gain_or_loss'] == 'Listing') {
                    pushEntry = false;
                } else if (!cancellation && entry['gain_or_loss'] == 'Cancellation') {
                    pushEntry = false;
                }
            }
            // Apply search query 
            if (!(entry[queryLabel].toLowerCase().includes(queryString))) {
                pushEntry = false;
            }

            // Resolve filters
            if (pushEntry) {
                finalData.push(entry);
            } else {
                newCount--;
            }
        }

        // Reassign transaction list and count
        let tableClone = structuredClone(tableData)
        tableClone['transaction_list'] = finalData;
        tableClone['count'] = newCount;
        return tableClone;
    }

    /* GENERATE THE CURRENT PAGE TO DISPLAY IN TABLE FROM FILTERED DATA*/
    function generatePage() {
        if (filteredData === null) {
            return null;
        }

        setPage(applyPartition(filteredData));
    }

    /* FILTER DATA, THEN GENERATED CURRENT PAGE */
    function filterAndGeneratePage(data) {
        setFilteredData(generateFilteredData(data));
    }

    /* FETCH DATA FROM THE BACKEND -> SAVE FILTERED DATA IN STATE -> GENERATE PAGE */
    async function getMarketData() {
        try {
            const response = await fetch('http://127.0.0.1:8000/get_market_data/?amount=All',
                {
                    method: 'GET',
                    mode: 'cors',
                }
            )
            let res = await response.json();

            res = JSON.parse(JSON.stringify(res));

            filterAndGeneratePage(res);

        } catch(e) {
            console.error(e);
        }
    }

    return(
        <div className='table-container'>
            <div className='top-bar'>
                <div className='refresh-button-container'>
                    <button className='app-button refresh-button' onMouseDown={(e) => e.preventDefault()} onClick={getMarketData}>
                        <i className="fa-solid fa-arrows-rotate" style={{color: 0o0}}></i>
                    </button>
                </div>
                <TableNavBar pageIndex={pageIndex} changePageIndex={handlePageIndexChange} numPages={numPages}/>
                <TableSizeDropdown handleClick={handlePageSizeChange} />
            </div>
            <Table data={page}/>
        </div>
    );
}

export default TableContainer;