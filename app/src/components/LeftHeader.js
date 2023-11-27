import '../styles/LeftHeader.css';

function LeftHeader() {
    return(
        <div className='left-header'>
            <div className='left-header-container'>
                <div className='dropdown header-item'>
                    <span>
                        Help
                    </span>
                    <div className='dropdown-content'>
                        <p>This will help you.</p>
                    </div>
                </div>
                <div className='dropdown header-item'>
                    <span>
                        Resources
                    </span>
                    <div className='dropdown-content'>
                        <p>Steam Market</p>
                        <p>GitHub</p>
                        <p>Documentation</p>
                    </div>
                </div>
                <div className='header-item stats-link'>
                    Statistics
                </div>
                <div className='header-title'>
                        Market History+
                </div>
                
            </div>
        </div>
    );
}

export default LeftHeader;