import React from "react";

const BillingHistory = ({ history }) => {
  const handleViewInvoice = (invoiceUrl) => {
    if (invoiceUrl) {
      window.open(invoiceUrl, "_blank"); // Open the invoice URL in a new tab
    } else {
      alert("Invoice URL is not available for this payment.");
    }
  };

  return (
    <div className="billing-history">
      <h3>Billing History</h3>
      {history.length > 0 ? (
        <table className="billing-history-table">
          <thead>
            <tr>
              <th>Payment ID</th>
              <th>Customer ID</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
              <th>Invoice</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item) => (
              <tr key={item.paymentId}>
                <td>{item.paymentId}</td>
                <td>{item.customerId}</td>
                <td>
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: item.currency.toUpperCase(),
                  }).format(item.amount / 100)}
                </td>
                <td>{item.status}</td>
                <td>{new Date(item.date).toLocaleDateString()}</td>
                <td>
                  <button
                    className="btn-invoice"
                    onClick={() => handleViewInvoice(item.paymentInvoice)}
                  >
                    View Invoice
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No billing history available.</p>
      )}
    </div>
  );
};

export default BillingHistory;
