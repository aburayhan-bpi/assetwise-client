import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import useAuth from "../../../hooks/useAuth";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useCurrentUser from "../../../hooks/useCurrentUser";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
// import React, { useEffect, useState } from "react";
// import useCurrentUser from "../../hooks/useCurrentUser";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import useAxiosPublic from "../../hooks/useAxiosPublic";
// import useAuth from "../../hooks/useAuth";
// import toast from "react-hot-toast";

const CheckoutForm = ({ newPackage }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [paymentInfo, setPaymentInfo] = useState(null);

  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const currentUser = useCurrentUser();
  const packagePrice = currentUser?.package;
  const newPackagePrice = newPackage?.package;
  const newPackageLimit = newPackage?.limit;
  // console.log("Payment info", paymentInfo);
  // console.log("Current user", currentUser);
  useEffect(() => {
    axiosSecure.get(`/payment/${currentUser?.email}`).then((res) => {
      setPaymentInfo(res.data);
    });
  }, [currentUser, user, newPackage]);

  //   console.log(newPackageLimit);

  useEffect(() => {
    if (newPackage?.package > 0) {
      axiosSecure
        .post("/create-payment-intent", { price: newPackagePrice })
        .then((res) => {
          // console.log(res.data.clientSecret);
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [axiosSecure, newPackage]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      // console.log("payment error", error);

      setError(error.message);
    } else {
      // console.log("payment method", paymentMethod);
      setError("");
    }

    // confirm payment
    const { error: confirmError, paymentIntent } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      // console.log("confirm error");
    } else {
      // console.log("payment intent", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        card.clear();
        toast.success(
          <>
            <div className="flex flex-col">
              <p>Payment success!👍</p>
              {/* <br /> */}
              <p className="text-xs font-semibold">TrxID: {paymentIntent.id}</p>
            </div>
          </>
        );
        // update payment info into database
        const newPaymentData = {
          email: currentUser?.email,
          companyName: currentUser?.company,
          name: currentUser?.name,
          role: currentUser?.role,
          package: newPackagePrice,
          transactionId: paymentIntent.id,
          date: new Date(),
          status: "paid",
          limit: parseInt(newPackageLimit),
        };

        axiosSecure
          .patch(`/update-payment/${paymentInfo?._id}`, newPaymentData)
          .then((res) => {
            // console.log(res.data);
          })
          .catch((err) => {
            // console.log(err);
            // if (err.response.data.message) {
            //   toast.error("Already paid for this package!");
            // }
          });

        // update hr user info after payment success

        axiosSecure
          .patch(`/update-hr/${currentUser?._id}`, {
            limit: parseInt(newPackageLimit),
            package: parseInt(newPackagePrice),
          })
          .then((res) => {
            // console.log(res.data);
          });

        navigate("/add-employee");
      }
    }
  };

  return (
    <div>
      <div className="max-w-xs mx-auto mt-10 border border-yellow-700 p-6 rounded-lg shadow-lg bg-white">
        <form onSubmit={handleSubmit}>
          {/* Wrapper for CardElement */}
          <div className="border border-gray-300 rounded-md p-3 bg-gray-50 focus-within:ring-2 focus-within:ring-indigo-500">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#1A202C", // Matches Tailwind's text-gray-900
                    fontFamily: "'Inter', sans-serif",
                    "::placeholder": {
                      color: "#A0AEC0", // Matches Tailwind's text-gray-400
                    },
                  },
                  invalid: {
                    color: "#E53E3E", // Matches Tailwind's text-red-500
                  },
                },
              }}
            />
          </div>

          {/* Submit Button */}
          <button
            className="btn w-full mt-6 bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-2 px-4 rounded-md "
            type="submit"
            disabled={
              !stripe ||
              !clientSecret ||
              (currentUser?.limit && Number(currentUser?.limit) >= 20) ||
              !paymentInfo
            }

            // disabled={!stripe || !clientSecret}
          >
            {currentUser?.limit >= 20
              ? "Max package limit reached"
              : `Pay $${newPackage ? newPackagePrice : 0}`}
          </button>

          {error && (
            <p className="p-1 rounded-md bg-red-100 text-red-500 text-xs mt-2">
              {error}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default CheckoutForm;
