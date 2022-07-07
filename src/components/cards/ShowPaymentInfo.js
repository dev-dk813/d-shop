import React from "react";

const ShowPaymentInfo = ({ order, showStatus = true }) => {
  console.log(order.paymentIntent);
  return (
    <div>
      <p>
        <span>
          <strong>Order Id :</strong> {order.paymentIntent.id}
        </span>
        <span className="px-2">
          <strong>Amount : </strong>
          {(order.paymentIntent.amount /= 100).toLocaleString("en-US", {
            style: "currency",
            currency: "INR",
          })}
        </span>
        <span className="px-2">
          <strong>Method : </strong> {order.paymentIntent.payment_method_types}
        </span>
        <span className="px-2">
          {/* <strong>Payment : </strong> {order.paymentIntent.status.toUpperCase()} */}
        </span>
        <span className="px-2">
          <strong>Ordered on : </strong>{" "}
          {new Date(order.paymentIntent.created * 1000).toLocaleString()}
        </span>
      </p>
      {showStatus && (
        <div>
          <span className="mb-2 p-2 badge bg-secondary">
            STATUS : {order.orderStatus}
          </span>
        </div>
      )}
    </div>
  );
};

export default ShowPaymentInfo;
