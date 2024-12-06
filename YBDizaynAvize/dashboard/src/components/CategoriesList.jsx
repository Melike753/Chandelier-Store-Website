import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Categories.css";
import CategoryForm from "./CategoryForm";

const CategoriesList = ({ onSelectCategory }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://45.81.113.41:4141/api/v1/categories/get-all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setCategories(response.data || []);
        setLoading(false);
      })
      .catch((error) => {
        setError("Kategoriler alınırken bir hata oluştu!");
        console.error(error);
        setLoading(false);
      });
  }, []);

  const deleteCategory = (id) => {
    const token = localStorage.getItem("token");
    axios
      .delete(`http://45.81.113.41:4141/api/v1/categories/delete?id=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setCategories(categories.filter((category) => category.id !== id));
      })
      .catch((error) => {
        console.error("Kategori silinirken bir hata oluştu!", error);
      });
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  if (loading) {
    return <p>Kategoriler yükleniyor...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="categories-list">
      <h2>Kategoriler</h2>
      <button onClick={openModal} className="add-category-btn">
        Yeni Kategori Ekle
      </button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Kategori Adı</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td>{category.id}</td>
              <td>{category.name}</td>
              <td>
                <button onClick={() => deleteCategory(category.id)}>Sil</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <CategoryForm onSuccess={closeModal} />
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoriesList;
