import React from 'react';
import '../../Styles/Modal/Loader.styles.css';

const Loader = ({ loaderRef }) => {
    return (
        <div style={{ display: 'none' }} ref={loaderRef} className='modal'>
            <div className='loader'></div>
        </div>
    );
}

export default Loader;