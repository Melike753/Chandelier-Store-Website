import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Attributes.css";

const AttributeValuesForm = ({ attributeId, onClose }) => {
  const [values, setValues] = useState([]);
  const [newValue, setNewValue] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (attributeId) {
      fetchValues();
    }
  }, [attributeId]);

  const fetchValues = () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    axios
      .get(
        `http://45.81.113.41:4141/api/v1/attribute-values/get-all?attributeId=${attributeId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        setValues(response.data || []);
        setError(null);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Değerler çekilirken hata oluştu:", error);
        setError("Değerler yüklenirken bir hata oluştu.");
        setLoading(false);
      });
  };

  const addValue = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const token = localStorage.getItem("token");

    axios
      .post(
        `http://45.81.113.41:4141/api/v1/attribute-values/create?attributeId=${attributeId}&value=${newValue}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        setNewValue("");
        fetchValues();
        setIsSubmitting(false);
      })
      .catch((error) => {
        console.error("Değer eklenirken hata oluştu:", error);
        setIsSubmitting(false);
      });
  };

  const deleteValue = (id) => {
    const token = localStorage.getItem("token");
    axios
      .delete(
        `http://45.81.113.41:4141/api/v1/attribute-values/delete?id=${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => {
        setValues(values.filter((value) => value.id !== id));
      })
      .catch((error) => console.error("Değer silinirken hata oluştu:", error));
  };

  return (
    <div className="attribute-values-form">
      <h3>Özellik ID için Değerleri Yönet: {attributeId}</h3>
      <button onClick={onClose}>Kapat</button>
      {loading && <p className="loading-message">Değerler yükleniyor...</p>}
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={addValue}>
        <input
          type="text"
          placeholder="Yeni Değer"
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
          required
        />
        <button type="submit" disabled={isSubmitting}>
          Değer Ekle
        </button>
      </form>
      <ul>
        {values.map((value) => (
          <li key={value.id}>
            {value.value}
            <button onClick={() => deleteValue(value.id)}>Sil</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AttributeValuesForm;
