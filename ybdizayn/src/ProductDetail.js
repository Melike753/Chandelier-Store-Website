import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./ProductDetail.css";

function ProductDetail() {
  const { id } = useParams(); // URL'den ürün ID'sini al
  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(0); // Seçilen varyasyonu yönetmek için state

  // API Base URL'ini .env dosyasından alıyoruz
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    // Ürün verilerini çekiyoruz
    axios
      .get(`${API_BASE_URL}/products/get-by-id?id=${id}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
      });
  }, [id, API_BASE_URL]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-detail-container">
      <div className="product-card">
        {/* Görsel Alanı ve Varyantlar */}
        <div className="product-image">
          <img
            src={
              product.variants?.[selectedVariant]?.images?.[0]?.imageUrl ||
              "default-image-url.jpg"
            }
            alt={product.name}
          />
          {/* Varyant Alanı */}
          <div className="variant-selection">
            {product.variants?.map((variant, index) => (
              <div
                key={variant.id}
                className={`variant-option ${
                  selectedVariant === index ? "active" : ""
                }`}
                onClick={() => setSelectedVariant(index)}
              >
                <img
                  src={variant.images?.[0]?.imageUrl || "default-image-url.jpg"}
                  alt={
                    variant.attributeValues?.find(
                      (av) => av.attribute.name === "Renk"
                    )?.attributeValue || "Varyant"
                  }
                />
                <p>
                  {variant.attributeValues?.find(
                    (av) => av.attribute.name === "Renk"
                  )?.attributeValue || "Belirtilmemiş"}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Ürün Bilgisi Alanı */}
        <div className="product-info">
          <h2>{product.name}</h2>
          <p>
            <strong>Ürün Kodu (SKU): </strong>
            {product.variants?.[selectedVariant]?.sku || "Bilinmiyor"}
          </p>
          <p>
            <strong>Marka: </strong> {product.brand?.name || "Bilinmiyor"}
          </p>
          <p>
            <strong>Kategori: </strong> {product.category?.name || "Bilinmiyor"}
          </p>
          {product.variants?.[selectedVariant]?.attributeValues?.map((av) => (
            <p key={av.id}>
              <strong>{av.attribute.name}: </strong>{" "}
              {av.attributeValue || "Belirtilmemiş"}
            </p>
          )) || <p>Özellikler belirtilmemiş.</p>}

          {/* Satın Alma Linkleri */}
          <div className="store-links">
            <h3>Ürünü Satın Alabileceğiniz Yerler:</h3>
            {product.variants?.[selectedVariant]?.storeUrls?.map((store) => (
              <a
                key={store.id}
                href={store.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {store.store?.name || "Mağaza"}
              </a>
            ))}
          </div>

          {/* WhatsApp Butonu */}
          <div className="whatsapp-button">
            <a
              href={`https://wa.me/5555555555?text=Ürün Bilgisi: ${product.name}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Whatsapp ile Sipariş Ver
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
