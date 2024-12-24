import React from "react";

const BillingDetails = ({ details }) => {
  const formatDate = (date) => {
    if (!date) return "Not Available"; // Handle null or undefined dates
    const parsedDate = new Date(date); // Parse the date
    return isNaN(parsedDate) ? "Invalid Date" : parsedDate.toLocaleDateString(); // Validate and format
  };

  return (
    <div className="billing-details">
      <h3>Billing Details</h3>
      <p>Status: {details.subscriptionStatus || "Not Available"}</p>
      <p>Subscription Billing Status: {details.subscriptionBillingStatus}</p>
      <p>Start Date: {formatDate(details.currentPeriodStart)}</p>
      <p>End Date: {formatDate(details.currentPeriodEnd)}</p>
    </div>
  );
};

export default BillingDetails;
