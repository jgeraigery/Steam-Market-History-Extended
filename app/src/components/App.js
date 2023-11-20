import React, { useState } from 'react';
import '../styles/App.css';
import FilterContainer from './FilterContainer';
import TableContainer from './TableContainer';
import LeftHeader from './LeftHeader';
import RightHeader from './RightHeader';

function App() {

  const [queryType, setQueryType] = useState('name');
  const [query, setQuery] = useState('');

  function setFiltersWrapper(val) {
    setQueryType(val['queryType']);
    setQuery(val['query']);
  }

  return (
    <div className="app">
      <header className="app-header">
        <LeftHeader />
        <RightHeader />
      </header>
      <body className="app-body">
        <FilterContainer setAppFilters={setFiltersWrapper}/>
        <TableContainer queryType={queryType} query={query}/>
      </body>
    </div>
  );
}

export default App;
