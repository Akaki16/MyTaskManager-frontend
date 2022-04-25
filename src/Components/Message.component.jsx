import React from 'react';
import PropTypes from 'prop-types';
import '../Styles/Message.styles.css';

const Message = ({ text }) => {
    return (
        <div className='message'>
            <p>{text}</p>
        </div>
    );
}

Message.propTypes = {
    text: PropTypes.string.isRequired
};

export default Message;