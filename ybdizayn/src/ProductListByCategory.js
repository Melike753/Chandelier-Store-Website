import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./ProductListByCategory.css";

function ProductListByCategory() {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState("");

  // API Base URL'ini .env dosyasından alıyoruz
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/products/get-by-category-id?categoryId=${categoryId}`)
      .then((response) => {
        setProducts(response.data.content || []);
        setCategoryName(response.data.content[0]?.category?.name || "");
      })
      .catch((error) => {
        console.error(
          "Kategoriye ait ürünler alınırken bir hata oluştu:",
          error
        );
      });
  }, [categoryId, API_BASE_URL]);

  return (
    <div className="category-product-list-container">
      <h2>{categoryName}</h2>
      <div className="category-product-grid">
        {products.length > 0 ? (
          products.map((product) => {
            // İlk varyantın fiyat ve indirimli fiyatını kontrol ediyoruz
            const originalPrice = product.variants?.[0]?.price || 0;
            const discountedPrice =
              product.variants?.[0]?.discountedPrice || originalPrice;

            return (
              <div key={product.id} className="category-product-card">
                <div className="category-product-image">
                  <img
                    src={
                      product.variants?.[0]?.images?.[0]?.imageUrl ||
                      "default-image-url.jpg"
                    }
                    alt={product.name}
                  />
                </div>
                <div className="category-product-details">
                  <h1>{product.name}</h1>
                  <p>{product.description}</p>
                  <div className="pricing">
                    {discountedPrice < originalPrice && (
                      <div className="discount-box">
                        %
                        {Math.round(
                          ((originalPrice - discountedPrice) / originalPrice) *
                            100
                        )}{" "}
                        indirim
                      </div>
                    )}
                    <div className="price-details">
                      {discountedPrice < originalPrice && (
                        <span className="original-price">
                          {originalPrice.toFixed(2)} TL
                        </span>
                      )}
                      <h2>{discountedPrice.toFixed(2)} TL</h2>
                    </div>
                  </div>

                  <div className="action-buttons">
                    <Link
                      to={`/product/${product.id}`}
                      className="view-details"
                    >
                      İncele
                    </Link>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p>Bu kategoriye ait ürün bulunamadı.</p>
        )}
      </div>
    </div>
  );
}

export default ProductListByCategory;
