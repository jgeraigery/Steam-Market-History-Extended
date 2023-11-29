import React, { useState, useEffect } from 'react';
import '../styles/TableNavBar.css';

function TableNavBar({pageIndex, changePageIndex, numPages}) {

    const [inputValue, setInputValue] = useState(1);
    const [labelValue, setLabelValue] = useState(1);

    useEffect(
        () => {
            if (inputValue !== pageIndex + 1) {
                setInputValue(pageIndex + 1);
            }
        }, [pageIndex]
    );

    useEffect(
        () => {
            if (labelValue !== numPages) {
                setLabelValue(numPages)
            }
        }, [numPages]
    );

    function handlePageIndexChange(e) {
        e.preventDefault();
        setInputValue(e.target.value);
    }

    function submitPageIndex(e) {
        e.preventDefault();
        changePageIndex(inputValue - 1);
    }

    function handleBack() {
        changePageIndex(pageIndex - 1);
    }

    function handleForward() {
        changePageIndex(pageIndex + 1);
    }

    function handleFirst() {
        changePageIndex(0);
    }

    function handleLast() {
        changePageIndex(-1);
    }

    return (
        <div className='nav-bar'>
            <button onClick={handleFirst} className='back-button'>{'<<'}</button>
            <button onClick={handleBack} className='back-button'>{'<'}</button>
            <form className='page-nav' onSubmit={(e) => submitPageIndex(e)}>
                <label className='page-label'>Page: </label>
                <input className='page-input' value={inputValue} onChange={(e) => handlePageIndexChange(e)}></input>
                <label className='page-label'>/{labelValue}</label>
            </form>
            <button onClick={handleForward} className='forward-button'>{'>'}</button>
            <button onClick={handleLast} className='forward-button'>{'>>'}</button>
        </div>
    );
};

export default TableNavBar;