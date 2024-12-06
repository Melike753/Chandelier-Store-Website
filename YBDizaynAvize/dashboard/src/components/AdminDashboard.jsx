import React, { useState } from "react";
import CategoriesList from "./CategoriesList";
import CategoryForm from "./CategoryForm";
import ProductsList from "./ProductsList";
import ProductForm from "./ProductForm";
import VariantForm from "./VariantForm";
import BrandsSection from "./BrandsSection";
import AttributesSection from "./AttributesSection";
import "./AdminDashboard.css";
import StoreSection from "./StoreSection";

const AdminDashboard = ({ onLogout }) => {
  const [activeSection, setActiveSection] = useState("Dashboard");
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [isAddingNewCategory, setIsAddingNewCategory] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [isAddingNewProduct, setIsAddingNewProduct] = useState(false);
  const [isAddingNewVariant, setIsAddingNewVariant] = useState(false);

  const handleSectionChange = (section) => {
    setActiveSection(section);
    setSelectedCategoryId(null);
    setIsAddingNewCategory(false);
    setSelectedProductId(null);
    setIsAddingNewProduct(false);
    setIsAddingNewVariant(false);
  };

  const handleCategorySelect = (id) => {
    setSelectedCategoryId(id);
    setIsAddingNewCategory(false);
  };

  const handleProductSelect = (id) => {
    setSelectedProductId(id);
    setIsAddingNewProduct(false);
    setIsAddingNewVariant(false);
  };

  const handleCategoryFormSuccess = () => {
    setSelectedCategoryId(null);
    setIsAddingNewCategory(false);
  };

  const handleAddNewCategory = () => {
    setSelectedCategoryId(null);
    setIsAddingNewCategory(true);
  };

  const handleFormSuccess = () => {
    setSelectedProductId(null);
    setIsAddingNewProduct(false);
  };

  const handleAddNewProduct = () => {
    setSelectedProductId(null);
    setIsAddingNewProduct(true);
    setIsAddingNewVariant(false);
  };

  const handleAddNewVariant = () => {
    setIsAddingNewVariant(true);
    setSelectedProductId(null);
  };

  const handleVariantFormSuccess = () => {
    setIsAddingNewVariant(false);
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2>Yönetim Paneli</h2>
        <ul>
          <li
            className={activeSection === "Dashboard" ? "active" : ""}
            onClick={() => handleSectionChange("Dashboard")}
          >
            Kontrol Paneli
          </li>
          <li
            className={activeSection === "Products" ? "active" : ""}
            onClick={() => handleSectionChange("Products")}
          >
            Ürün Yönetimi
          </li>
          <li
            className={activeSection === "Categories" ? "active" : ""}
            onClick={() => handleSectionChange("Categories")}
          >
            Kategori Yönetimi
          </li>
          <li
            className={activeSection === "Brands" ? "active" : ""}
            onClick={() => handleSectionChange("Brands")}
          >
            Marka Yönetimi
          </li>
          <li
            className={activeSection === "Attributes" ? "active" : ""}
            onClick={() => handleSectionChange("Attributes")}
          >
            Özellik Yönetimi
          </li>
          <li
            className={activeSection === "Store" ? "active" : ""}
            onClick={() => handleSectionChange("Store")}
          >
            Mağaza Yönetimi
          </li>
        </ul>
      </aside>
      <main className="main-content">
        <header className="dashboard-header">
          <h1>Hoş Geldiniz</h1>
          <button className="logout-btn" onClick={onLogout}>
            Çıkış Yap
          </button>
        </header>

        {activeSection === "Dashboard" && (
          <section className="stats-section">
            <div className="stat-box">
              <h3>Toplam Satış</h3>
              <p>12.500₺</p>
            </div>
            <div className="stat-box">
              <h3>Siparişler</h3>
              <p>13</p>
            </div>
            <div className="stat-box">
              <h3>Yeni Kullanıcılar</h3>
              <p>12</p>
            </div>
          </section>
        )}

        {activeSection === "Products" && (
          <section className="products-section">
            <ProductsList onSelectProduct={handleProductSelect} />

            {/* Ürün Formu */}
            {(selectedProductId || isAddingNewProduct) && (
              <ProductForm
                productId={selectedProductId}
                onSuccess={handleFormSuccess}
              />
            )}

            {/* Varyant Formu */}
            {isAddingNewVariant && (
              <VariantForm onSuccess={handleVariantFormSuccess} />
            )}
          </section>
        )}

        {activeSection === "Categories" && (
          <section className="categories-section">
            <CategoriesList onSelectCategory={handleCategorySelect} />
            {(selectedCategoryId || isAddingNewCategory) && (
              <CategoryForm
                categoryId={selectedCategoryId}
                onSuccess={handleCategoryFormSuccess}
              />
            )}
          </section>
        )}

        {activeSection === "Brands" && <BrandsSection />}
        {activeSection === "Attributes" && <AttributesSection />}
        {activeSection === "Store" && <StoreSection />}
      </main>
    </div>
  );
};

export default AdminDashboard;
