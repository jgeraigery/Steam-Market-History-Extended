import '../styles/RightHeader.css';

function RightHeader() {
    return (
        <div className='right-header'>
            <button className='app-button load-data-button' onMouseDown={(e) => e.preventDefault()}>Load Data</button>
            <button className='app-button settings-button' onMouseDown={(e) => e.preventDefault()}>Settings</button>
        </div>
    );
};

export default RightHeader;