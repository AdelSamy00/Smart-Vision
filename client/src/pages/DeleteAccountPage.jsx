import React, { useState } from "react";
import DeleteAccount from "../components/DeleteAcount";
import axios from 'axios';
import { useSelector } from "react-redux";

const DeleteAccountPage = () => {
  const [error, setError] = useState("");
  const [isAccountDeleted, setIsAccountDeleted] = useState(false);
  const { customer } = useSelector((state) => state.customer);

  const handleDelete = async (password) => {
    try {
      const response = await axios.delete(`/customers/delete-acount/${customer._id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        data: { password },
      });

      if (response.status === 200) {
        setIsAccountDeleted(true);
      } else {
        console.error('Failed to delete account', response.data);
        setError(response.data?.message || 'Failed to delete account');
      }
    } catch (error) {
      console.error('Error during account deletion', error);
      setError('Failed to delete account');
    }
  };

  return (
    <div className="delete-account-page">
      {!isAccountDeleted ? (
        <DeleteAccount onDelete={handleDelete} error={error} />
      ) : (
        <div className="account-deleted-message">
          <h2>Your account is deleted</h2>
          <p>Your Smart Vision account has now been deleted.</p>
          <p>We are sad to see you leave, and hope you will come back in the future. You can continue to browse the site if you wish.</p>
        </div>
      )}
    </div>
  );
};

export default DeleteAccountPage;
