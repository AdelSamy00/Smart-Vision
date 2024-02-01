// pages/DeleteAccountPage.js
import React from "react";
import DeleteAccount from "../components/DeleteAcount";

const DeleteAccountPage = () => {
  const handleDelete = (username, password) => {
    // Make a request to your backend to handle the account deletion
    console.log("Sending request to delete account...", { username, password });
  };

  return (
    <div className="delete-account-page">
      <DeleteAccount onDelete={handleDelete} />
    </div>
  );
};

export default DeleteAccountPage;
