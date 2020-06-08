import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth/helper";
import { cartEmpty, loadCart } from "./helper/CartHelper";
import { Link } from "react-router-dom";
import StripeCheckoutButton from "react-stripe-checkout";
import { API } from "../backend";
import { createOrder } from "../core/helper/orderHelper";

const StripeCheckout = ({
  products,
  setReload = (f) => f,
  reload = undefined,
}) => {
  const [data, setData] = useState({
    loading: false,
    success: false,
    error: "",
    address: "",
  });

  const token = isAuthenticated() && isAuthenticated().token;
  const userId = isAuthenticated() && isAuthenticated().user._id;
  const getFinalPrice = () => {
    let amount = 0;
    products.map((p) => {
      amount += p.price;
    });
    return amount;
  };
  const makePayment = (token) => {
    const body = {
      token,
      products,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    return fetch(`${API}/stripePayment`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
      .then((response) => {
        console.log(response);
        //call further method
        const { status } = response;
        console.log("STATUS", status);

        const orderData = {
          products: products,
          //transaction_id: response.transaction.id,
          //amount: response.transaction.amount,
        };
        createOrder(userId, token, orderData);
        //here down we r doing our cart empty
        cartEmpty(() => {
          console.log("my cart is empty");
        });
        //here down we r making a force reload
        setReload(!reload);
      })
      .catch((err) => console.log(err));
  };

  const showStripeButton = () => {
    return isAuthenticated() ? (
      <StripeCheckoutButton
        stripeKey="pk_test_7CiJWq0ZadaxH3hlxme91j8J000WYHfmhS"
        token={makePayment}
        amount={getFinalPrice() * 100}
        name="Buy T-Shirts"
        shippingAddress
        billingAddress
      >
        <button className="btn btn-success">Pay with stripe</button>
      </StripeCheckoutButton>
    ) : (
      <Link to="/signin">
        <button className="btn btn-warning">Signin</button>
      </Link>
    );
  };

  return (
    <div>
      <h3 className="text-white">Stripe checkout {getFinalPrice()}</h3>
      {showStripeButton()}
    </div>
  );
};
export default StripeCheckout;
