import React, {Component} from 'react';

const Notification = ({message}) => {
    return (
        <div className="message system">{message.message}</div>
    );
}

export default Notification;