import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Products.css";

const ProductForm = ({ productId, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    categoryId: "",
    brandId: "",
  });

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  // API Base URL'ini .env dosyasından alıyoruz
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchDropdownData = async () => {
      try {
        const [categoriesResponse, brandsResponse] = await Promise.all([
          axios.get(`${API_BASE_URL}/categories/get-all`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${API_BASE_URL}/brands/get-all`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        setCategories(categoriesResponse.data || []);
        setBrands(brandsResponse.data || []);
      } catch (error) {
        console.error("Dropdown verileri çekilirken hata oluştu:", error);
      }
    };

    fetchDropdownData();

    if (productId) {
      axios
        .get(`${API_BASE_URL}/products/get-by-id?id=${productId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setFormData({
            name: response.data.name,
            description: response.data.description,
            categoryId: response.data.categoryId,
            brandId: response.data.brandId,
          });
        })
        .catch((error) => {
          console.error("Ürün bilgileri çekilirken hata oluştu:", error);
        });
    }
  }, [productId, API_BASE_URL]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const formPayload = new FormData();
    formPayload.append("name", formData.name);
    formPayload.append("description", formData.description);
    formPayload.append("categoryId", formData.categoryId);
    formPayload.append("brandId", formData.brandId);

    const apiUrl = productId
      ? `${API_BASE_URL}/products/update/${productId}`
      : `${API_BASE_URL}/products/create`;
    const method = productId ? "put" : "post";

    axios({
      method: method,
      url: apiUrl,
      data: formPayload,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    })
      .then(() => {
        onSuccess();
      })
      .catch((error) => {
        console.error(
          "API Hata Detayları:",
          error.response?.data || error.message
        );
        alert(
          `Ürün kaydedilirken bir hata oluştu: ${
            error.response?.data?.message || "Bilinmeyen bir hata"
          }`
        );
      });
  };

  return (
    <div className="product-form">
      <h2>{productId ? "Ürünü Düzenle" : "Yeni Ürün Ekle"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Ürün Adı"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
        <textarea
          name="description"
          placeholder="Ürün Açıklaması"
          value={formData.description}
          onChange={handleInputChange}
          required
        />
        <select
          name="categoryId"
          value={formData.categoryId}
          onChange={handleInputChange}
          required
        >
          <option value="" disabled>
            Kategori Seçin
          </option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <select
          name="brandId"
          value={formData.brandId}
          onChange={handleInputChange}
          required
        >
          <option value="" disabled>
            Marka Seçin
          </option>
          {brands.map((brand) => (
            <option key={brand.id} value={brand.id}>
              {brand.name}
            </option>
          ))}
        </select>
        <button type="submit">
          {productId ? "Ürünü Güncelle" : "Ürün Ekle"}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
