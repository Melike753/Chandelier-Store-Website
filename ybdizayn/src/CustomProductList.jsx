import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./CustomProductList.css";

function CustomProductList() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [attributes, setAttributes] = useState([]);
  const [filters, setFilters] = useState({
    categoryId: "",
    brandId: "",
    attributeValues: [],
    sortBy: "DiscountedPrice",
    sortDirection: "asc",
    page: 0,
    size: 12,
  });

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  // API Base URL'ini .env dosyasından alıyoruz
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    fetchCategories();
    fetchBrands();
    fetchAttributes();
    fetchProducts();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/categories/get-all`);
      setCategories(response.data || []);
    } catch (error) {
      console.error("Kategoriler alınırken hata oluştu:", error.message);
    }
  };

  const fetchBrands = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/brands/get-all`);
      setBrands(response.data || []);
    } catch (error) {
      console.error("Markalar alınırken hata oluştu:", error.message);
    }
  };

  const fetchAttributes = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/attribute-values/get-all`
      );
      const data = response.data;

      const groupedAttributes = data.reduce((acc, item) => {
        const { id, name } = item.attribute;
        if (!acc[id]) {
          acc[id] = { id, name, values: [] };
        }
        acc[id].values.push({ id: item.id, value: item.attributeValue });
        return acc;
      }, {});

      setAttributes(Object.values(groupedAttributes));
    } catch (error) {
      console.error("Attribute'ler alınırken hata oluştu:", error.message);
    }
  };

  const fetchProducts = async () => {
    try {
      const params = new URLSearchParams({
        page: filters.page,
        size: filters.size,
        sortBy: filters.sortBy,
        sortDirection: filters.sortDirection,
      }).toString();

      const response = await axios.get(
        `${API_BASE_URL}/products/get-all?${params}`
      );

      if (response && response.status === 200 && response.data.content) {
        setProducts(response.data.content || []);
        setTotalPages(response.data.totalPages || 0);
      } else {
        setProducts([]);
      }

      // Gruplandırılmış attribute değerlerini oluştur
      const groupedAttributeValues = attributes.reduce((acc, attribute) => {
        const selectedValues = filters.attributeValues.filter((valueId) =>
          attribute.values.some((value) => value.id.toString() === valueId)
        );
        if (selectedValues.length > 0) {
          acc.push(selectedValues);
        }
        return acc;
      }, []);

      console.log(
        "Gruplandırılmış Attribute Değerleri:",
        groupedAttributeValues
      );

      let attributeFilteredProducts = [];
      if (groupedAttributeValues.length > 0) {
        // Her grup için ayrı API çağrısı yap ve kesişim kümesi hesapla
        for (const group of groupedAttributeValues) {
          const params = new URLSearchParams({
            attributeValues: group.join(","),
            page: filters.page,
            size: filters.size,
            sortBy: filters.sortBy,
            sortDirection: filters.sortDirection,
          }).toString();

          const response = await axios.get(
            `${API_BASE_URL}/products/filter-products-by-attribute-values?${params}`
          );

          if (response.status === 200 && response.data.content) {
            if (attributeFilteredProducts.length === 0) {
              attributeFilteredProducts = response.data.content;
            } else {
              attributeFilteredProducts = attributeFilteredProducts.filter(
                (product) =>
                  response.data.content.some(
                    (attrProd) => attrProd.id === product.id
                  )
              );
            }
          }
        }
      }

      console.log("Attribute Filtreleme Sonuçları:", attributeFilteredProducts);

      // Kategori ve marka bazlı filtreleme
      let categoryProducts = [];
      let brandProducts = [];

      if (filters.categoryId) {
        const categoryResponse = await axios.get(
          `${API_BASE_URL}/products/get-by-category-id`,
          { params: { categoryId: filters.categoryId } }
        );
        categoryProducts = categoryResponse.data.content || [];
      }

      if (filters.brandId) {
        const brandResponse = await axios.get(
          `${API_BASE_URL}/products/get-by-brand-id`,
          { params: { brandId: filters.brandId } }
        );
        brandProducts = brandResponse.data.content || [];
      }

      let finalProducts;

      if (
        filters.categoryId &&
        filters.brandId &&
        groupedAttributeValues.length > 0
      ) {
        const categoryProductIds = new Set(categoryProducts.map((p) => p.id));
        const brandAndCategoryFiltered = brandProducts.filter((product) =>
          categoryProductIds.has(product.id)
        );
        finalProducts = brandAndCategoryFiltered.filter((product) =>
          attributeFilteredProducts.some(
            (attrProd) => attrProd.id === product.id
          )
        );
      } else if (filters.categoryId && filters.brandId) {
        const categoryProductIds = new Set(categoryProducts.map((p) => p.id));
        finalProducts = brandProducts.filter((product) =>
          categoryProductIds.has(product.id)
        );
      } else if (filters.categoryId && groupedAttributeValues.length > 0) {
        finalProducts = categoryProducts.filter((product) =>
          attributeFilteredProducts.some(
            (attrProd) => attrProd.id === product.id
          )
        );
      } else if (filters.brandId && groupedAttributeValues.length > 0) {
        finalProducts = brandProducts.filter((product) =>
          attributeFilteredProducts.some(
            (attrProd) => attrProd.id === product.id
          )
        );
      } else if (filters.categoryId) {
        finalProducts = categoryProducts;
      } else if (filters.brandId) {
        finalProducts = brandProducts;
      } else if (groupedAttributeValues.length > 0) {
        finalProducts = attributeFilteredProducts;
      } else {
        const generalResponse = await axios.get(
          `${API_BASE_URL}/products/get-all`
        );
        finalProducts = generalResponse.data.content || [];
      }

      const sortedProducts = finalProducts.sort((a, b) => {
        const priceA = a.variants?.[0]?.discountedPrice || 0;
        const priceB = b.variants?.[0]?.discountedPrice || 0;
        return filters.sortDirection === "asc"
          ? priceA - priceB
          : priceB - priceA;
      });

      setProducts(sortedProducts);
    } catch (error) {
      console.error("Ürünler alınırken hata oluştu:", error.message);
      setProducts([]);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFilters((prev) => ({
        ...prev,
        attributeValues: checked
          ? [...prev.attributeValues, value.toString()]
          : prev.attributeValues.filter((attr) => attr !== value.toString()),
      }));
    } else {
      setFilters((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleCategoryChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      categoryId: e.target.value,
      page: 0,
    }));
    setCurrentPage(0);
  };

  const handleBrandChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      brandId: e.target.value,
      page: 0,
    }));
    setCurrentPage(0);
  };

  const handlePageChange = (newPage) => {
    setFilters((prev) => ({
      ...prev,
      page: newPage,
    }));
    setCurrentPage(newPage);
  };

  const handleAttributeChange = (valueId, checked) => {
    setFilters((prev) => {
      const updatedValues = checked
        ? [...prev.attributeValues, valueId.toString()]
        : prev.attributeValues.filter((id) => id !== valueId.toString());
      return { ...prev, attributeValues: updatedValues, page: 0 };
    });
    setCurrentPage(0);
  };

  const applyFilters = () => {
    fetchProducts();
  };

  const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i);

    return (
      <div className="pagination">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 0}
        >
          &laquo; Önceki
        </button>
        {pageNumbers.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={page === currentPage ? "active" : ""}
          >
            {page + 1}
          </button>
        ))}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages - 1}
        >
          Sonraki &raquo;
        </button>
      </div>
    );
  };

  return (
    <div className="custom-product-list-container">
      <h2>Tüm Ürünler</h2>
      <div className="custom-product-content">
        <aside className="custom-filters">
          <h3>Filtreler</h3>
          <div>
            <h4>Kategori</h4>
            <select
              name="categoryId"
              onChange={handleCategoryChange}
              value={filters.categoryId}
            >
              <option value="">Tüm Kategoriler</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <h4>Marka</h4>
            <select
              name="brandId"
              onChange={handleBrandChange}
              value={filters.brandId}
            >
              <option value="">Tüm Markalar</option>
              {brands.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <h4>Özellikler</h4>
            {attributes.map((attribute) => (
              <div key={attribute.id} className="custom-attribute-group">
                <h5>{attribute.name}</h5>
                {attribute.values.map((value) => (
                  <label key={value.id} className="custom-attribute-item">
                    <input
                      type="checkbox"
                      value={value.id}
                      checked={filters.attributeValues.includes(
                        value.id.toString()
                      )} // Seçili durum
                      onChange={(e) =>
                        handleFilterChange({
                          target: {
                            name: "attributeValues",
                            value: value.id.toString(),
                            type: "checkbox",
                            checked: e.target.checked,
                          },
                        })
                      }
                    />
                    {value.value}
                  </label>
                ))}
              </div>
            ))}
          </div>
          <div>
            <h4>Sıralama</h4>
            <select
              name="sortBy"
              onChange={handleFilterChange}
              value={filters.sortBy}
            >
              <option value="DiscountedPrice">Fiyata Göre</option>
            </select>
          </div>
          <div>
            <h4>Sıralama Yönü</h4>
            <select
              name="sortDirection"
              onChange={handleFilterChange}
              value={filters.sortDirection}
            >
              <option value="asc">Düşükten Yükseğe</option>
              <option value="desc">Yüksekten Düşüğe</option>
            </select>
          </div>
          <button onClick={applyFilters} className="custom-filter-button">
            Filtrele
          </button>
        </aside>
        <div className="custom-products-section">
          <div className="custom-product-grid">
            {products.length > 0 ? (
              products.map((product) => {
                const variant = product.variants?.[0] || {};
                const originalPrice = variant.price || 0;
                const discountedPrice = variant.discountedPrice || 0;
                const discountPercentage =
                  originalPrice > discountedPrice
                    ? ((originalPrice - discountedPrice) / originalPrice) * 100
                    : 0;

                return (
                  <div key={product.id} className="custom-product-card">
                    <div className="custom-product-image">
                      <img
                        src={
                          variant.images?.[0]?.imageUrl ||
                          "default-image-url.jpg"
                        }
                        alt={product.name}
                      />
                    </div>
                    <div className="custom-product-details">
                      <h1>{product.name}</h1>
                      <p>{product.description}</p>
                      <div className="custom-pricing">
                        {discountPercentage > 0 && (
                          <div className="custom-discount-box">
                            % {Math.round(discountPercentage)} indirim
                          </div>
                        )}
                        <div className="custom-price-details">
                          {discountPercentage > 0 && (
                            <span className="custom-original-price">
                              {originalPrice.toFixed(2)} TL
                            </span>
                          )}
                          <h2>{discountedPrice.toFixed(2)} TL</h2>
                        </div>
                      </div>
                      <div className="custom-action-buttons">
                        <Link
                          to={`/product/${product.id}`}
                          className="custom-view-details"
                        >
                          İncele
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p>Ürün bulunamadı.</p>
            )}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}

export default CustomProductList;
