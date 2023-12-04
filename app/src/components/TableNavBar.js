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
        let val = parseInt(inputValue);
        if (Number.isInteger(val)) {
            changePageIndex(val - 1);
        } else {
            setInputValue('');
        }
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
            <button onClick={handleFirst} className='app-button nav-button' onMouseDown={(e) => e.preventDefault()}>{'<<'}</button>
            <button onClick={handleBack} className='app-button nav-button' onMouseDown={(e) => e.preventDefault()}>{'<'}</button>
            <div className='page-nav'>
                <form onSubmit={(e) => submitPageIndex(e)}>
                    <label className='page-label'>Page: </label>
                    <input className='page-input' value={inputValue} onChange={(e) => handlePageIndexChange(e)}></input>
                    <label className='page-label'> / {labelValue}</label>
                </form>
            </div>
            <button onClick={handleForward} className='app-button nav-button' onMouseDown={(e) => e.preventDefault()}>{'>'}</button>
            <button onClick={handleLast} className='app-button nav-button' onMouseDown={(e) => e.preventDefault()}>{'>>'}</button>
        </div>
    );
};

export default TableNavBar;