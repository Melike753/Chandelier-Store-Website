import React, { useState, useEffect } from "react";
import axios from "axios";
import BrandForm from "./BrandForm";
import "./Brands.css";

const BrandsSection = () => {
  const [brands, setBrands] = useState([]);
  const [isAddingNewBrand, setIsAddingNewBrand] = useState(false);

  // API Base URL'ini .env dosyasından alıyoruz
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = () => {
    const token = localStorage.getItem("token");
    axios
      .get(`${API_BASE_URL}/brands/get-all`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setBrands(response.data || []))
      .catch((error) =>
        console.error("Markalar çekilirken hata oluştu:", error)
      );
  };

  const deleteBrand = (id) => {
    const token = localStorage.getItem("token");
    axios
      .delete(`${API_BASE_URL}/brands/delete?id=${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setBrands(brands.filter((brand) => brand.id !== id));
      })
      .catch((error) => console.error("Marka silinirken hata oluştu:", error));
  };

  return (
    <div className="brands-section">
      <h2>Markalar</h2>
      <button onClick={() => setIsAddingNewBrand(true)}>Yeni Marka Ekle</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Marka Adı</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {brands.map((brand) => (
            <tr key={brand.id}>
              <td>{brand.id}</td>
              <td>{brand.name}</td>
              <td>
                <button onClick={() => deleteBrand(brand.id)}>Sil</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Marka Formu */}
      {isAddingNewBrand && (
        <BrandForm
          onSuccess={() => {
            setIsAddingNewBrand(false);
            fetchBrands(); // Listeyi yenile
          }}
          onClose={() => setIsAddingNewBrand(false)} // Modalı kapat
        />
      )}
    </div>
  );
};

export default BrandsSection;
