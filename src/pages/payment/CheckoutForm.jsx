import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import useCurrentUser from "../../hooks/useCurrentUser";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CheckoutForm = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [members, setMembers] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const currentUser = useCurrentUser();
  const packagePrice = currentUser?.package;
  console.log(currentUser);
  // members count according to package price

  useEffect(() => {
    if (packagePrice === 5) {
      setMembers("5");
    } else if (packagePrice === 8) {
      setMembers("10");
    } else if (packagePrice === 15) {
      setMembers("20");
    }
  }, [packagePrice]);

  useEffect(() => {
    if (packagePrice > 0) {
      axiosSecure
        .post("/create-payment-intent", { price: packagePrice })
        .then((res) => {
          console.log(res.data.clientSecret);
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [axiosSecure, packagePrice]);

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
      console.log("payment error", error);

      setError(error.message);
    } else {
      console.log("payment method", paymentMethod);
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
      console.log("confirm error");
    } else {
      console.log("payment intent", paymentIntent);
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
        // save payment info into database
        const paymentData = {
          email: currentUser?.email,
          companyName: currentUser?.company,
          name: currentUser?.name,
          role: currentUser?.role,
          package: packagePrice,
          transactionId: paymentIntent.id,
          date: new Date(),
          status: "paid",
          limit: parseInt(members),
        };

        axiosSecure
          .post("/payment", paymentData)
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err);
            if (err.response.data.message) {
              toast.error("Already paid for this package!");
            }
          });

        // update hr user info after payment success

        axiosSecure
          .patch(`/update-hr/${currentUser?._id}`, {
            limit: parseInt(members),
            package: packagePrice,
          })
          .then((res) => {
            console.log(res.data);
          });
      }
      navigate("/");
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
              (currentUser?.limit && Number(currentUser?.limit) >= 20)
            }

            // disabled={!stripe || !clientSecret}
          >
            {currentUser?.limit >= 20
              ? "Max package limit reached"
              : `Pay $${packagePrice}`}
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
