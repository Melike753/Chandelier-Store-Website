import React from "react";
import "./SalesPoints.css";
import trendyol from "./images/trendyol.jpg";
import hepsiburada from "./images/hepsiburada.webp";
import n11 from "./images/n11.jpg";

function SalesPoints() {
  return (
    <div className="sales-points-container">
      <h2>Satış Noktalarımız</h2>
      <div className="card-container">
        <div className="card">
          <h3>Trendyol</h3>
          <p>
            <a
              href="https://www.trendyol.com/avize-x-c1366"
              target="_blank"
              rel="noopener noreferrer"
            >
              Trendyol'da Satın Al
            </a>
          </p>
          <img src={trendyol} alt="trendyol" />
        </div>
        <div className="card">
          <h3>Hepsiburada</h3>
          <p>
            <a
              href="https://www.hepsiburada.com/ara?q=avize"
              target="_blank"
              rel="noopener noreferrer"
            >
              Hepsiburada'da Satın Al
            </a>
          </p>
          <img src={hepsiburada} alt="hepsiburada" />
        </div>
        <div className="card">
          <h3>N11</h3>
          <p>
            <a
              href="https://www.n11.com/dekorasyon-ve-aydinlatma/aydinlatma/avize"
              target="_blank"
              rel="noopener noreferrer"
            >
              N11'de Satın Al
            </a>
          </p>
          <img src={n11} alt="n11" />
        </div>
        <div className="card">
          <h3>Mağaza Adresi</h3>
          <p>
            <a>3. Sanayi Sitesi 296 sk. No:1/B Bornova İzmir</a>
          </p>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3186.3195161947267!2d27.2078892151151!3d38.44301967964288!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14b97d1d4a1e35ed%3A0xbca90a58e82e6743!2s3.%20Sanayi%20Sitesi%20296.%20Sk.%20No%3A1%2FB%2C%2035080%20Bornova%2F%C4%B0zmir!5e0!3m2!1str!2str!4v1697638193440!5m2!1str!2str"
            width="220"
            height="200"
            style={{ border: "0" }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default SalesPoints;
