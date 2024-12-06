import React, { useState } from "react";
import axios from "axios";
import "./Categories.css";

const CategoryForm = ({ onSuccess }) => {
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

    const apiUrl = "http://45.81.113.41:4141/api/v1/categories/create";

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
