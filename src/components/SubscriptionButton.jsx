import React from "react";

const SubscriptionButton = ({ status, onSubscribe, onCancel, onRenew, subscriptionBillingStatus }) => {
  if (status === "Active" && subscriptionBillingStatus === "Ongoing") {
    return (
      <>
        <button onClick={onCancel} className="btn-cancel">
          Cancel Subscription
        </button>
      </>
    );
  }

  if (status === "Active" && subscriptionBillingStatus === "Canceled") {
    return (
      <>
        <button onClick={onRenew} className="btn-renew">
          Renew Subscription
        </button>
      </>
    );
  }

  if (status === "Expired") {
    return (
      <button onClick={onRenew} className="btn-renew">
        Renew Subscription
      </button>
    );
  }

  return (
    <button onClick={onSubscribe} className="btn-subscribe">
      Subscribe
    </button>
  );
};

export default SubscriptionButton;
