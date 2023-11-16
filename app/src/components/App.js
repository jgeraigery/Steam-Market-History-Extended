import React, { useState } from 'react';
import '../styles/App.css';
import FilterContainer from './FilterContainer';
import TableContainer from './TableContainer';
import LeftHeader from './LeftHeader';
import RightHeader from './RightHeader';



function App() {

  const [filters, setFilters] = useState({
    'queryType': 'name',
    'query': '',
  });

  return (
    <div className="app">
      <header className="app-header">
        <LeftHeader />
        <RightHeader />
      </header>
      <body className="app-body">
        <FilterContainer setFilters={setFilters}/>
        <TableContainer filters={filters}/>
      </body>
    </div>
  );
}

export default App;
