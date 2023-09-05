import React, { useState } from 'react';

function Summary() {
    const [showMessage, setShowMessage] = useState(false);

    // Function to handle the animation and show the message
    const handleShowMessage = () => {
      setShowMessage(true);
  
      // Reset the message after a certain duration
      setTimeout(() => {
        setShowMessage(false);
      }, 3000);
    };
  
    return (
      <div>
        <button onClick={handleShowMessage}>Place Order</button>
        {showMessage && (
          <div className="order-success-message">
            <p>Order placed successfully!</p>
          </div>
        )}
      </div>
    );
}

export default Summary