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
        'all': true,
        'sale': false,
        'purchase': false,
        'listing': false,
        'cancellation': false,
    }
  );
  // Tracks and controls table reloads
  const [reload, setReload] = useState(0);

  function setFiltersWrapper(val) {
    // Check if values changed - Unsafe, so order matters
    if (JSON.stringify(currentFilters) !== JSON.stringify(val)) {
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
        <TableContainer
          reload={reload}
          queryType={currentFilters['queryType']}
          query={currentFilters['query']}
          all={currentFilters['all']}
          sale={currentFilters['sale']}
          purchase={currentFilters['purchase']}
          listing={currentFilters['listing']}
          cancellaction={currentFilters['listing']}
        />
      </div>
    </div>
  );
}

export default App;
