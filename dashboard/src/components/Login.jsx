import React, { useState } from "react";
import axios from "axios";
import "./Login.css";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // API Base URL'ini .env dosyasından alıyoruz
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("E-posta ve şifre gereklidir.");
      return;
    }

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    axios
      .post(`${API_BASE_URL}/auth/login`, formData)
      .then((response) => {
        const { token } = response.data;
        if (token) {
          localStorage.setItem("token", token);
          onLogin();
        } else {
          setError("Giriş başarısız: Token bulunamadı.");
        }
      })
      .catch((error) => {
        if (error.response) {
          setError(
            error.response.data.message ||
              "Giriş başarısız. Bilgilerinizi kontrol edin."
          );
        } else {
          setError("Giriş başarısız. Bilgilerinizi kontrol edin.");
        }
      });
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2>Hoş Geldiniz..</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-postanızı girin"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Şifrenizi girin"
              required
            />
          </div>
          <button type="submit" className="btn">
            Giriş Yap
          </button>
          {error && <p className="error">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
