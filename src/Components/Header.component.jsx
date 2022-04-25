import React from 'react';
import '../Styles/Header.styles.css';
import PropTypes from 'prop-types';

const Header = ({ onModalOpen }) => {
    return (
        <header className='header'>
            <h1>MyTaskManager</h1>
            <button onClick={onModalOpen} type='button'>
                New Task
            </button>
        </header>
    );
}

Header.propTypes = {
    onModalOpen: PropTypes.func.isRequired
};

export default Header;