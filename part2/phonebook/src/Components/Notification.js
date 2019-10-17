import React from 'react';
import './Notification.css';

const Notification = ({message, isError}) => {
   if(message === null) {
      return null;
   }
   const errorStyle = { border: '1px solid red', color: 'red' }
   const sucessStyle = { border: '1px solid green', color: 'green' }
   const selectedStyle = isError ? errorStyle : sucessStyle;

   return (
      <div style={selectedStyle} className="message">
         {message}
      </div>
   )
}

export default Notification;
