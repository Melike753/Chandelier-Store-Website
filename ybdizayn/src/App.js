import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import avize1 from "./images/avize1.webp";
import avize2 from "./images/avize2.webp";
import avize3 from "./images/avize3.webp";
import slider1 from "./images/Slider1.webp";
import slider2 from "./images/Slider2.webp";
import slider3 from "./images/Slider3.webp";
import home from "./images/Home.webp";
import home1 from "./images/Home1.webp";
import home2 from "./images/Home2.webp";
import SalesPoints from "./SalesPoints";
import "@fortawesome/fontawesome-free/css/all.min.css";
import ProductDetail from "./ProductDetail";
import axios from "axios";
import ProductListByCategory from "./ProductListByCategory";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProductList from "./CustomProductList";
import {
  faFacebook,
  faInstagram,
  faTwitter,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import "@fortawesome/fontawesome-free/css/all.min.css";

// Footer bilgileri değişkeni
const footerInfo = {
  tagline: "Şıklığın ve kalitenin buluşma noktası.",
  address: "3. Sanayi Sitesi 296 sk. No:1/B Bornova İzmir",
  phone: "0 (555) 555 55 55",
  email: "info@ybdizayn.com",
};

// "Biz Kimiz?" bölümünün metni
const introContent = {
  title: "Biz Kimiz?",
  description: [
    "YB Dizayn Avize, yaşam alanlarınıza sadece ışık değil aynı zamanda zarafet ve estetik katan benzersiz tasarımlar sunar.",
    "Her biri özenle hazırlanmış, sanatı ve işçiliği bir araya getiren avizelerimizle evinizin ve iş yerinizin atmosferini yeniden tanımlıyoruz.",
    "Modern çizgilerle harmanlanmış klasik dokunuşlardan minimalist detaylara kadar her zevke ve ihtiyaca hitap eden geniş ürün yelpazemizle, sadece aydınlatma değil tarz da sunuyoruz. Bizim için kalite, yalnızca bir vaat değil her ürünümüzde hissettireceğimiz bir deneyimdir. Üretimden montaja kadar, her aşamada üstün malzeme kalitesi ve yenilikçi tasarım anlayışımızla fark yaratıyoruz.",
    "YB Dizayn Avize, yaşam alanlarınızda hem göz alıcı hem de işlevsel çözümler sunarak hayalinizdeki atmosferi gerçeğe dönüştürmeyi amaçlar. Siz de ışığın büyüsüyle mekanlarınızı daha etkileyici kılmak ve estetiği en üst seviyeye taşımak istiyorsanız doğru yerdesiniz.",
    "YB Dizayn Avize ile stilinizi aydınlatın, yaşam alanlarınıza değer katın.",
  ],
};

// Slider images
const sliderImages = [
  { src: home, alt: "Home" },
  { src: home1, alt: "Home1" },
  { src: home2, alt: "Home2" },
  { src: slider1, alt: "living room" },
  { src: slider2, alt: "bedroom" },
  { src: slider3, alt: "kitchen" },
];

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const [categories, setCategories] = useState([]);

  // API Base URL'ini .env dosyasından alıyoruz
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/categories/get-all`)
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Kategoriler alınırken bir hata oluştu:", error);
      });
  }, [API_BASE_URL]);

  return (
    <Router>
      <div className="App">
        <header className="header">
          <div className="logo">
            <h1>YB Dizayn Avize</h1>
            <p>{footerInfo.tagline}</p>
          </div>
          <nav>
            <div className="nav-links">
              <div>
                <Link to="/">Ana Sayfa</Link>
              </div>
              <div>
                <Link to="/sales-points">Satış Noktaları</Link>
              </div>
            </div>
          </nav>
        </header>

        <Routes>
          <Route
            path="/"
            element={
              <>
                {/* Kategori Listesi */}
                <nav className="categories">
                  <div className="categories">
                    <li>
                      <Link to="/all-products">Tüm Ürünler</Link>
                    </li>
                    {categories.map((category) => (
                      <li key={category.id}>
                        <Link to={`/category/${category.id}`}>
                          {category.name}
                        </Link>
                      </li>
                    ))}
                  </div>
                </nav>

                {/* Slider Section */}
                <section className="slider">
                  <img
                    src={sliderImages[currentSlide].src}
                    alt={sliderImages[currentSlide].alt}
                    className="slider-image"
                  />
                  <div className="dots-container">
                    {sliderImages.map((_, index) => (
                      <span
                        key={index}
                        className={`dot ${currentSlide === index ? "active" : ""}`}
                        onClick={() => setCurrentSlide(index)}
                      ></span>
                    ))}
                  </div>
                </section>

                {/* Öne Çıkan Ürünler */}
                <section className="products">
                  <h2>Öne Çıkan Ürünlerimiz</h2>
                  <div className="product-list">
                    <div className="product-item">
                      <img src={avize1} alt="Modern Kristal Avize" />
                      <h3>Modern Kristal Avize</h3>
                      <p>Salonlarınız için göz alıcı kristal avizeler.</p>
                      <a href="#view">İncele</a>
                    </div>
                    <div className="product-item">
                      <img src={avize2} alt="Klasik Avize" />
                      <h3>Klasik Avize</h3>
                      <p>Geleneksel mekanlar için klasik tarzda avizeler.</p>
                      <a href="#view">İncele</a>
                    </div>
                    <div className="product-item">
                      <img src={avize3} alt="Minimalist Avize" />
                      <h3>Minimalist Avize</h3>
                      <p>Minimalist tasarımları sevenler için.</p>
                      <a href="#view">İncele</a>
                    </div>
                  </div>
                </section>

                {/* Biz Kimiz? Bölümü */}
                <section className="intro">
                  <h2>{introContent.title}</h2>
                  {introContent.description.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                  <a href="#more-info">Daha Fazla Bilgi</a>
                </section>

                {/* Footer Section */}
                <footer className="footer">
                  <div className="footer-column">
                    <h3>YB Dizayn Avize</h3>
                    <p>{footerInfo.tagline}</p>
                    <p>{footerInfo.address}</p>
                    <p>Telefon: {footerInfo.phone}</p>
                    <p>Email: {footerInfo.email}</p>
                  </div>

                  <div className="footer-column">
                    <h3>Hızlı Bağlantılar</h3>
                    <ul>
                      <li>
                        <a href="#home">Ana Sayfa</a>
                      </li>
                      <li>
                        <a href="#chandeliers">Avizeler</a>
                      </li>
                      <li>
                        <a href="#about">Hakkımızda</a>
                      </li>
                      <li>
                        <a href="#contact">İletişim</a>
                      </li>
                      <li>
                        <a href="#sales-points">Satış Noktaları</a>
                      </li>
                    </ul>
                  </div>

                  <div className="footer-column">
                    <h3>Bizi Takip Edin</h3>
                    <div className="social-icons">
                      <a
                        href="https://www.facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FontAwesomeIcon icon={faFacebook} />
                      </a>
                      <a
                        href="https://www.instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FontAwesomeIcon icon={faInstagram} />
                      </a>
                      <a
                        href="https://www.twitter.com"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FontAwesomeIcon icon={faTwitter} />
                      </a>
                      <a
                        href="https://www.linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FontAwesomeIcon icon={faLinkedin} />
                      </a>
                    </div>
                  </div>

                  {/* Telif Hakkı Bölümü */}
                  <div className="footer-copyright">
                    <p>© 2024 YB Dizayn Avize. Tüm Hakları Saklıdır.</p>
                  </div>
                </footer>
              </>
            }
          />
          {/* Tüm Ürünler */}
          <Route path="/all-products" element={<ProductList />} />
          <Route
            path="/category/:categoryId"
            element={<ProductListByCategory />}
          />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/sales-points" element={<SalesPoints />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
