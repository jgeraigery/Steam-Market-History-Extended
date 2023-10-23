import './App.css';
import FilterContainer from './FilterContainer';
import TableContainer from './TableContainer';
import LeftHeader from './LeftHeader';
import RightHeader from './RightHeader';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <LeftHeader />
        <RightHeader />
      </header>
      <body className="app-body">
        <FilterContainer />
        <TableContainer />
      </body>
    </div>
  );
}

export default App;
