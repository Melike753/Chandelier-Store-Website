import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Attributes.css";

const AttributesSection = () => {
  const [attributes, setAttributes] = useState([]);
  const [selectedAttributeId, setSelectedAttributeId] = useState(null);
  const [selectedAttributeName, setSelectedAttributeName] = useState("");
  const [attributeValues, setAttributeValues] = useState([]);
  const [newAttributeName, setNewAttributeName] = useState("");
  const [newValue, setNewValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // API Base URL'ini .env dosyasından alıyoruz
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    fetchAttributes();
  }, []);

  const fetchAttributes = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${API_BASE_URL}/attributes/get-all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAttributes(response.data || []);
    } catch (error) {
      console.error("Özellikler çekilirken hata oluştu:", error);
    }
  };

  const fetchAttributeValues = async (attributeId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `${API_BASE_URL}/attribute-values/get-all`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const filteredValues = response.data.filter(
        (item) => item.attribute.id === attributeId
      );
      setAttributeValues(filteredValues || []);
    } catch (error) {
      console.error("Özellik değerleri çekilirken hata oluştu:", error);
    }
  };

  const handleAddAttribute = async () => {
    if (!newAttributeName.trim()) {
      alert("Özellik adı boş olamaz!");
      return;
    }
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        `${API_BASE_URL}/attributes/create?name=${newAttributeName}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewAttributeName("");
      fetchAttributes();
    } catch (error) {
      console.error("Özellik eklenirken hata oluştu:", error);
    }
  };

  const handleDeleteAttribute = async (attributeId) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(
        `${API_BASE_URL}/attributes/delete?id=${attributeId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setAttributes(attributes.filter((attr) => attr.id !== attributeId));
      if (selectedAttributeId === attributeId) {
        setSelectedAttributeId(null);
        setAttributeValues([]);
      }
    } catch (error) {
      console.error("Özellik silinirken hata oluştu:", error);
    }
  };

  const handleAddValue = async () => {
    if (!newValue.trim() || !selectedAttributeId) {
      alert("Değer veya özellik seçilmedi!");
      return;
    }
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        `${API_BASE_URL}/attribute-values/create?attributeId=${selectedAttributeId}&value=${newValue}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewValue("");
      fetchAttributeValues(selectedAttributeId);
    } catch (error) {
      console.error("Değer eklenirken hata oluştu:", error);
    }
  };

  const handleDeleteValue = async (valueId) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(
        `${API_BASE_URL}/attribute-values/delete?id=${valueId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setAttributeValues(
        attributeValues.filter((value) => value.id !== valueId)
      );
    } catch (error) {
      console.error("Değer silinirken hata oluştu:", error);
    }
  };

  const openModal = (attributeId, attributeName) => {
    setSelectedAttributeId(attributeId);
    setSelectedAttributeName(attributeName);
    fetchAttributeValues(attributeId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedAttributeId(null);
    setSelectedAttributeName("");
    setAttributeValues([]);
    setIsModalOpen(false);
  };

  return (
    <div className="attributes-section">
      <h2>Özellik Yönetimi</h2>

      <div className="add-attribute">
        <input
          type="text"
          value={newAttributeName}
          onChange={(e) => setNewAttributeName(e.target.value)}
          placeholder="Yeni Özellik Adı"
        />
        <button onClick={handleAddAttribute}>Ekle</button>
      </div>

      <h3>Mevcut Özellikler</h3>
      <ul className="attributes-list">
        {attributes.map((attribute) => (
          <li key={attribute.id}>
            <span onClick={() => openModal(attribute.id, attribute.name)}>
              {attribute.name}
            </span>
            <button
              className="delete-btn"
              onClick={() => handleDeleteAttribute(attribute.id)}
            >
              Sil
            </button>
          </li>
        ))}
      </ul>

      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h4>Özellik: {selectedAttributeName}</h4>
            <div className="add-value">
              <input
                type="text"
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                placeholder="Yeni Değer Ekle"
              />
              <button onClick={handleAddValue}>Ekle</button>
            </div>
            <ul>
              {attributeValues.map((value) => (
                <li key={value.id}>
                  {value.attributeValue}
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteValue(value.id)}
                  >
                    Sil
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttributesSection;
