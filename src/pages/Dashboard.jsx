import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getBillingDetails,
  getBillingHistory,
  getCancelSubscriptionUrl,
} from "../api";
import BillingDetails from "../components/BillingDetails";
import BillingHistory from "../components/BillingHistory";
import SubscriptionButton from "../components/SubscriptionButton";

const Dashboard = () => {
  const { userId } = useParams(); // Get userId from the URL
  const [billingDetails, setBillingDetails] = useState(null);
  const [billingHistory, setBillingHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const details = await getBillingDetails(userId);
        setBillingDetails(details);
        
        // Use the email from billingDetails to fetch history
        if (details?.email) {
          const history = await getBillingHistory(details.email);
          setBillingHistory(history);
        } else {
          setBillingHistory([]);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
  
    if (userId) {
      fetchData();
    }
  }, [userId]);
  

  const stripePaymentLink = "https://buy.stripe.com/test_aEU1552TmaWzdQQ8ww"; // Your Stripe Payment Link

const handleSubscribe = () => {
  if (billingDetails) {
    const { email } = billingDetails;

    // Build Stripe payment link with query parameters
    const paymentUrl = `${stripePaymentLink}?prefilled_email=${encodeURIComponent(
      email
    )}&userId=${userId}`;

    // Redirect to the Stripe Payment Link
    window.open(paymentUrl, "_blank");
  }
};


  const handleCancel = async () => {
    if (billingDetails?.customerId) {
      if (window.confirm("Are you sure you want to cancel your subscription?")) {
        try {
          const portalUrl = await getCancelSubscriptionUrl(billingDetails.customerId);
          window.open(portalUrl, "_blank");
        } catch (error) {
          console.error("Error redirecting to cancel subscription:", error);
          alert("Failed to redirect to cancel subscription. Please try again later.");
        }
      }
    } else {
      alert("Customer ID not available. Cannot cancel subscription.");
    }
  };

  const handleRenew = async () => {
    if (billingDetails?.customerId) {
      try {
        const portalUrl = await getCancelSubscriptionUrl(billingDetails.customerId);
        window.open(portalUrl, "_blank");
      } catch (error) {
        console.error("Error redirecting to renew subscription:", error);
        alert("Failed to redirect to renew subscription. Please try again later.");
      }
    } else {
      alert("Customer ID not available. Cannot renew subscription.");
    }
  };

  if (!userId) {
    return <div>Error: User ID is not provided in the URL.</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="dashboard">
      <BillingDetails details={billingDetails} />
      <BillingHistory history={billingHistory} />
      <SubscriptionButton
        status={billingDetails.subscriptionStatus}
        subscriptionBillingStatus={billingDetails.subscriptionBilling}
        onSubscribe={handleSubscribe}
        onCancel={handleCancel}
        onRenew={handleRenew}
      />
    </div>
  );
};

export default Dashboard;
