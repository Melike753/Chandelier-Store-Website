import React, { useState, useEffect } from "react";
import axios from "axios";
import "./StoreSection.css";

const StoreSection = () => {
  const [stores, setStores] = useState([]);
  const [newStoreName, setNewStoreName] = useState("");

  // API Base URL'ini .env dosyasından alıyoruz
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${API_BASE_URL}/stores/get-all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStores(response.data || []);
    } catch (error) {
      console.error("Stores çekilirken hata oluştu:", error);
    }
  };

  const handleAddStore = async () => {
    if (!newStoreName.trim()) {
      alert("Mağaza adı boş olamaz!");
      return;
    }
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        `${API_BASE_URL}/stores/create?name=${newStoreName}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewStoreName("");
      fetchStores();
    } catch (error) {
      console.error("Mağaza eklenirken hata oluştu:", error);
    }
  };

  const handleDeleteStore = async (storeId) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`${API_BASE_URL}/stores/delete?id=${storeId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStores(stores.filter((store) => store.id !== storeId));
    } catch (error) {
      console.error("Mağaza silinirken hata oluştu:", error);
    }
  };

  return (
    <div className="store-section">
      <h2>Mağaza Yönetimi</h2>

      <div className="add-store">
        <input
          type="text"
          value={newStoreName}
          onChange={(e) => setNewStoreName(e.target.value)}
          placeholder="Yeni Mağaza Adı"
        />
        <button onClick={handleAddStore}>Ekle</button>
      </div>

      <h3>Mevcut Mağazalar</h3>
      <ul className="store-list">
        {stores.map((store) => (
          <li key={store.id}>
            {store.name}
            <button
              className="delete-btn"
              onClick={() => handleDeleteStore(store.id)}
            >
              Sil
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StoreSection;
