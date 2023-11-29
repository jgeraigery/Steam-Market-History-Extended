import React, { useState } from 'react';
import '../styles/App.css';
import FilterContainer from './FilterContainer';
import TableContainer from './TableContainer';
import LeftHeader from './LeftHeader';
import RightHeader from './RightHeader';

function App() {

  // Global filters
  const [currentFilters, setCurrentFilters] = useState(
    {
        'queryType': 'name',
        'query': '',
        'transactionType': 'all',
    }
  );
  // Tracks and controls table reloads
  const [reload, setReload] = useState(0);

  function setFiltersWrapper(val) {
    // Check if values changed - Unsafe, so order matters
    console.log('App: ');
    console.log(JSON.stringify(currentFilters));
    console.log(JSON.stringify(val));
    if (JSON.stringify(currentFilters) !== JSON.stringify(val)) {
      console.log('Filters updated');
      setCurrentFilters(structuredClone(val));
      setReload(reload + 1);
    }
  }

  return (
    <div className="app">
      <div className="app-header">
        <LeftHeader />
        <RightHeader />
      </div>
      <div className="app-body">
        <FilterContainer setAppFilters={setFiltersWrapper}/>
        <TableContainer reload={reload} queryType={currentFilters['queryType']} query={currentFilters['query']} transactionType={currentFilters['transactionType']}/>
      </div>
    </div>
  );
}

export default App;
