import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Products.css";

const VariantForm = ({ productId, onSuccess }) => {
  const [formData, setFormData] = useState({
    productId: productId || "",
    attributeValueIds: [],
    price: "",
    discountedPrice: "",
    stock: "",
    sku: "",
    photoFiles: [],
    storeUrls: [],
  });

  const [attributesGrouped, setAttributesGrouped] = useState({});
  const [stores, setStores] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);

  // API Base URL'ini .env dosyasından alıyoruz
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    fetchAttributesAndValues();
    fetchStores();
  }, []);

  const fetchAttributesAndValues = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `${API_BASE_URL}/attribute-values/get-all`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const grouped = response.data.reduce((acc, item) => {
        const attributeId = item.attribute.id;
        const attributeName = item.attribute.name;

        if (!acc[attributeId]) {
          acc[attributeId] = { name: attributeName, values: [] };
        }

        acc[attributeId].values.push({
          id: item.id,
          value: item.attributeValue,
        });

        return acc;
      }, {});

      setAttributesGrouped(grouped);
    } catch (error) {
      console.error("Attribute values çekilirken hata oluştu:", error);
    }
  };

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

  const handleValueChange = (attributeId, valueId) => {
    const updatedAttributeValueIds = [
      ...formData.attributeValueIds.filter(
        (id) => !attributesGrouped[attributeId]?.values.find((v) => v.id === id)
      ),
      valueId,
    ];
    setFormData((prev) => ({
      ...prev,
      attributeValueIds: updatedAttributeValueIds,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      photoFiles: files,
    }));
    setPreviewImages(files.map((file) => URL.createObjectURL(file)));
  };

  const handleAddStore = () => {
    setFormData((prev) => ({
      ...prev,
      storeUrls: [...prev.storeUrls, { storeId: "", url: "" }],
    }));
  };

  const handleStoreChange = (index, field, value) => {
    const updatedStoreUrls = [...formData.storeUrls];
    updatedStoreUrls[index][field] = value;
    setFormData((prev) => ({ ...prev, storeUrls: updatedStoreUrls }));
  };

  const handleRemoveStore = (index) => {
    setFormData((prev) => ({
      ...prev,
      storeUrls: prev.storeUrls.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const formPayload = new FormData();
    formPayload.append("productId", formData.productId);
    formPayload.append("price", formData.price);
    formPayload.append("discountedPrice", formData.discountedPrice);
    formPayload.append("stock", formData.stock);
    formPayload.append("sku", formData.sku);

    formData.attributeValueIds.forEach((id) =>
      formPayload.append("attributeValueIds", id)
    );
    formData.photoFiles.forEach((file) =>
      formPayload.append("photoFiles", file)
    );
    formData.storeUrls.forEach((store, index) => {
      formPayload.append(`storeUrls[${index}].storeId`, store.storeId);
      formPayload.append(`storeUrls[${index}].url`, store.url);
    });

    try {
      const response = await axios.post(
        `${API_BASE_URL}/variants/create`,
        formPayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        alert("Variant başarıyla eklendi!");
        onSuccess();
      }
    } catch (error) {
      console.error("Variant eklenirken hata oluştu:", error);
      alert(
        `Variant eklenirken hata oluştu: ${error.response?.data?.message || "Bilinmeyen bir hata"}`
      );
    }
  };

  return (
    <div className="variant-form">
      <h2>Varyant Ekle</h2>
      <form onSubmit={handleSubmit}>
        {/* Price */}
        <input
          type="number"
          name="price"
          placeholder="Fiyat"
          value={formData.price}
          onChange={handleInputChange}
          required
        />
        {/* Discounted Price */}
        <input
          type="number"
          name="discountedPrice"
          placeholder="İndirimli Fiyat"
          value={formData.discountedPrice}
          onChange={handleInputChange}
        />
        {/* Stock */}
        <input
          type="number"
          name="stock"
          placeholder="Stok"
          value={formData.stock}
          onChange={handleInputChange}
          required
        />
        {/* SKU */}
        <input
          type="text"
          name="sku"
          placeholder="Ürün Kodu (SKU)"
          value={formData.sku}
          onChange={handleInputChange}
          required
        />
        {/* Attribute Selection */}
        {Object.entries(attributesGrouped).map(([attributeId, attribute]) => (
          <div className="attribute-row" key={attributeId}>
            <label>{attribute.name}</label>
            <select
              onChange={(e) => handleValueChange(attributeId, e.target.value)}
              required
            >
              <option value="" disabled>
                {attribute.name} seçin
              </option>
              {attribute.values.map((value) => (
                <option key={value.id} value={value.id}>
                  {value.value}
                </option>
              ))}
            </select>
          </div>
        ))}
        {/* Image Upload */}
        <div className="image-row">
          <label>Ürün Görseli</label>
          <input type="file" multiple onChange={handleFileChange} />
          <div className="image-previews">
            {formData.photoFiles.map((file, index) => (
              <img
                key={index}
                src={URL.createObjectURL(file)}
                alt={`Preview ${index}`}
              />
            ))}
          </div>
        </div>
        {/* Store Links */}
        <label>Mağazalar</label>
        <div className="store-urls">
          {formData.storeUrls.map((store, index) => (
            <div key={index}>
              <select
                value={store.storeId}
                onChange={(e) =>
                  handleStoreChange(index, "storeId", e.target.value)
                }
                required
              >
                <option value="" disabled>
                  Mağaza Seçin
                </option>
                {stores.map((storeOption) => (
                  <option key={storeOption.id} value={storeOption.id}>
                    {storeOption.name}
                  </option>
                ))}
              </select>
              <input
                type="text"
                placeholder="URL"
                value={store.url}
                onChange={(e) =>
                  handleStoreChange(index, "url", e.target.value)
                }
                required
              />
              <button type="button" onClick={() => handleRemoveStore(index)}>
                Kaldır
              </button>
            </div>
          ))}
          <button type="button" onClick={handleAddStore}>
            Mağaza Ekle
          </button>
        </div>

        <button type="submit">Variant Ekle</button>
      </form>
    </div>
  );
};

export default VariantForm;
