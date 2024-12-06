import React, { useState } from "react";
import axios from "axios";
import "./Brands.css";

const BrandForm = ({ onSuccess, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    axios
      .post(
        `http://45.81.113.41:4141/api/v1/brands/create?name=${formData.name}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        onSuccess();
        onClose();
      })
      .catch((error) => console.error("Marka eklenirken hata oluştu:", error));
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Yeni Marka Ekle</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Marka Adı"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          <button type="submit">Marka Ekle</button>
        </form>
      </div>
    </div>
  );
};

export default BrandForm;
