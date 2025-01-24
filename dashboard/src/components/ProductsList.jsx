import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Products.css";
import ProductForm from "./ProductForm";
import VariantForm from "./VariantForm";

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isVariantModalOpen, setIsVariantModalOpen] = useState(false);
  const [editProductId, setEditProductId] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState(null);

  // API Base URL'ini .env dosyasından alıyoruz
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    const token = localStorage.getItem("token");
    axios
      .get(`${API_BASE_URL}/products/get-all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setProducts(response.data.content || []);
        setLoading(false);
      })
      .catch((error) => {
        setError("Ürünler alınırken bir hata oluştu!");
        console.error("Ürünler alınırken hata oluştu:", error);
        setLoading(false);
      });
  };

  const deleteProduct = (id) => {
    const token = localStorage.getItem("token");
    axios
      .delete(`${API_BASE_URL}/products/delete?id=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setProducts(products.filter((product) => product.id !== id));
      })
      .catch((error) => {
        console.error("Ürün silinirken bir hata oluştu!", error);
      });
  };

  const openProductModal = (productId = null) => {
    setEditProductId(productId);
    setIsProductModalOpen(true);
  };

  const openVariantModal = (productId) => {
    setSelectedProductId(productId);
    setIsVariantModalOpen(true);
  };

  const closeModals = () => {
    setEditProductId(null);
    setSelectedProductId(null);
    setIsProductModalOpen(false);
    setIsVariantModalOpen(false);
  };

  if (loading) {
    return <p>Ürünler yükleniyor...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!Array.isArray(products)) {
    return <p>Beklenmeyen veri formatı. Lütfen API yanıtını kontrol edin.</p>;
  }

  return (
    <div className="products-list">
      <h2>Ürünler</h2>
      <div className="action-buttons">
        <button onClick={() => openProductModal()} className="add-product-btn">
          Yeni Ürün Ekle
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Ürün Adı</th>
            <th>Fiyat</th>
            <th>İndirimli Fiyat</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td
                onClick={() => openVariantModal(product.id)}
                className="product-name"
              >
                {product.name}
              </td>
              <td>{product.variants[0]?.price || "Belirtilmedi"}</td>
              <td>{product.variants[0]?.discountedPrice || "Belirtilmedi"}</td>
              <td>
                <button onClick={() => openProductModal(product.id)}>
                  Düzenle
                </button>
                <button onClick={() => deleteProduct(product.id)}>Sil</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Ürün Modal */}
      {isProductModalOpen && (
        <div className="modal-overlay" onClick={closeModals}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <ProductForm productId={editProductId} onSuccess={closeModals} />
          </div>
        </div>
      )}

      {/* Varyant Modal */}
      {isVariantModalOpen && (
        <div className="modal-overlay" onClick={closeModals}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <VariantForm
              productId={selectedProductId}
              onSuccess={closeModals}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsList;
