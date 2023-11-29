import '../styles/LeftHeader.css';

function LeftHeader() {
    return(
        <div className='left-header'>
            <div className='header-title'>
                    Market History
            </div>
            
            <div className='header-stats-block stats-link'>
                <div className='header-item'>
                    Statistics
                </div>
            </div>
            <div className='header-resources-block dropdown'>
                <div className='dropdown-content'>
                    <button className='dropdown-button'>Steam Market</button>
                    <button className='dropdown-button'>GitHub Page</button>
                    <button className='dropdown-button'>Documentation</button>
                </div>
                <div className='header-item'>
                    Resources
                </div>
            </div>
            
        </div>
    );
}

export default LeftHeader;