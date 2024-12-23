import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_KEY;

// Fetch billing details
export const getBillingDetails = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/billing`, {
      params: { userId },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching billing details:", error);
    throw error;
  }
};

// Fetch billing history
export const getBillingHistory = async (email) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/billing-history`, {
      params: { email },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching billing history:", error);
    throw error;
  }
};

// Get Stripe checkout session URL for subscription
// export const getSubscribeUrl = async (userId, email) => {
//   try {
//     const response = await axios.post(`${API_BASE_URL}/subscription/subscribe`, {
//       userId,
//       email,
//     });
//     return response.data; // Return the checkout session URL
//   } catch (error) {
//     console.error("Error fetching subscribe URL:", error);
//     throw error;
//   }
// };

// Get Stripe customer portal URL
export const getCancelSubscriptionUrl = async (customerId) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/subscription/cancel`, null, {
      params: { customerId }, // Send as query parameter
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching cancel subscription URL:", error);
    throw error;
  }
};
