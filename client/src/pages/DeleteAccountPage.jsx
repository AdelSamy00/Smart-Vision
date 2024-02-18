import React, { useState ,useEffect} from "react";
import DeleteAccount from "../components/DeleteAcount";
import axios from "axios";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";

const DeleteAccountPage = () => {
  const [error, setError] = useState("");
  const [isAccountDeleted, setIsAccountDeleted] = useState(false);
  const { customer } = useSelector((state) => state.customer);
  const handleDelete = async (password) => {
    try {
      const response = await axios.delete(
        `/customers/delete-acount/${customer._id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          data: { password },
        }
      );

      if (response.status === 200) {
        setIsAccountDeleted(true);
        localStorage.removeItem("customer");
      } else if (password !== customer.password) {
        setError("Incorrect password. Please try again.");
      }
    } catch (error) {
      toast.dismiss();
      toast(error.response.data.message);
    }
  };

  return (
    <div className="delete-account-page">
      <Toaster
        toastOptions={{
          style: {
            duration: 3000,
            border: "1px solid #6A5ACD",
            backgroundColor: "#6A5ACD",
            padding: "16px",
            color: "white",
            fontWeight: "Bold",
            marginTop: "65px",
            textAlign: "center",
          },
        }}
      />
      {!isAccountDeleted ? (
        <DeleteAccount onDelete={handleDelete} error={error} />
      ) : (
        <div className="account-deleted-message" style={{ fontSize: "20px", marginLeft:"20px",marginBottom:"20px"}}>
          <h2 style={{ fontWeight: "bold", fontSize:"25px"}}>Your account is deleted</h2>
          <p>Your Smart Vision account has now been deleted.</p>
          <p>
            We are sad to see you leave, and hope you will come back in the
            future.
          </p>
        </div>
      )}
    </div>
  );
};

export default DeleteAccountPage;
