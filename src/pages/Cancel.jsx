import React from "react";

const Cancel = () => {
  return (
    <div className="cancel-page">
      <h2>Payment Canceled</h2>
      <p>It seems like you canceled the payment. No changes were made.</p>
      <a href="/">Go to Dashboard</a>
    </div>
  );
};

export default Cancel;
