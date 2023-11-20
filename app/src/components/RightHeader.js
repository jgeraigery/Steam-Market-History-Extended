import '../styles/RightHeader.css';

function RightHeader() {
    return (
        <div className='right-header'>
            <button className='app-button settings-button' onMouseDown={(e) => e.preventDefault()}>Settings</button>
        </div>
    );
};

export default RightHeader;