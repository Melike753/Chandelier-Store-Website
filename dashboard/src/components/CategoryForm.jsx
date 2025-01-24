import React, { useState } from "react";
import axios from "axios";
import "./Categories.css";

const CategoryForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
  });

  // API Base URL'ini .env dosyasından alıyoruz
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const apiUrl = `${API_BASE_URL}/categories/create`;

    const formPayload = new FormData();
    formPayload.append("name", formData.name);

    axios
      .post(apiUrl, formPayload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setFormData({ name: "" }); 
        onSuccess(); 
      })
      .catch((error) => {
        console.error("Kategori kaydedilirken bir hata oluştu!", error);
      });
  };

  return (
    <div className="category-form-container">
      <div className="category-form">
        <h2>Yeni Kategori Ekle</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Kategori Adı"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          <button type="submit">Kategori Ekle</button>
        </form>
      </div>
    </div>
  );
};

export default CategoryForm;
