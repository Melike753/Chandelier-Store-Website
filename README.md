# **Chandelier Store Website**

## **📖 Proje Tanıtımı**

**Chandelier Store Website**, modern bir alışveriş deneyimi sunan, estetik ve işlevselliği bir araya getiren kapsamlı bir platformdur. Şık arayüzüyle müşterilere avize ürünlerini keşfetme, filtreleme ve detaylı inceleme imkanı sunarken; güçlü yönetim paneli sayesinde ürün, kategori, marka ve mağaza yönetimini kolaylaştırır. Ürün varyantlarını destekleyen yapısıyla her ihtiyaca uygun çözümler sunan bu proje, hem kullanıcı dostu hem de yönetici odaklı bir yaklaşımı benimser. React.js tabanlı mimarisi, ölçeklenebilirliği ve modern tasarımıyla e-ticaret dünyasında etkileyici bir deneyim yaratmayı hedefler.

## **📋 Proje Genel Bakışı**

Bu proje iki ana bileşenden oluşur:

1. **Web Sitesi**: Kullanıcıların avize ürünlerini keşfetmesini ve incelemesini sağlayan kullanıcı dostu bir platform.
2. **Yönetim Paneli**: Ürün, kategori, marka, varyant ve mağaza yönetimi için kapsamlı bir araç.

---

## 🌟 Temel Amaç ve Hedefler

- **Müşteri Deneyimi**: Kullanıcıların, yaşam alanlarına estetik ve fonksiyonel çözümler sunan avizeler arasında kolayca seçim yapabilmesi.
- **Yönetim Kolaylığı**: Ürün, kategori, marka ve mağaza yönetimi gibi iş süreçlerini kolaylaştırmak için etkili bir yönetim paneli oluşturmak.
- **İnovasyon**: Modern teknolojilerle zenginleştirilmiş bir web ve admin arayüzü sağlamak.

---

## **✨ Özellikler**

### **Müşteri Web Sitesi**

- **Dinamik Ürün Listeleme**: Kategori, marka ve özelliklere göre ürünleri filtreleme ve inceleme.
- **Ürün Detayları**: Ürün görseli, ürün bilgileri, varyantlar, fiyat, indirim ve ürünün alınabileceği mağaza bağlantılarının gösterimi.
- **Görsel Slider**: Tanıtım için yüksek kaliteli görsellerin sergilenmesi.
- **Satış Noktaları**: Ürünlerin satışının yapıldığı çevrim içi mağazalara ve fiziksel mağaza adreslerine erişim.
- **Responsive Tasarım**: Mobil ve masaüstü cihazlarla uyumlu.
- **Kategori ve Marka Bazlı Filtreleme**: Kullanıcıların istediği ürünlere hızla ulaşabilmesi.
- **Hakkımızda Sayfası**: Mağazanın misyon ve vizyonunu açıklayan bir bölüm.

### **Yönetim Paneli**

- **Kontrol Paneli**: Toplam satış, siparişler ve yeni kullanıcılar hakkında genel bilgiler.
- **Ürün Yönetimi**: Ürün ekleme, düzenleme veya silme.
- **Varyant Yönetimi**: Bir ürüne ait çeşitli varyantlarının eklenmesi.
- **Kategori Yönetimi**: Yeni kategoriler oluşturma veya silme.
- **Marka Yönetimi**: Yeni marka ekleme veya silme.
- **Mağaza Yönetimi**: Çevrim içi mağaza bağlantılarını ekleme veya kaldırma.
- **Giriş ve Yetkilendirme**: Yalnızca yetkilendirilmiş kullanıcının giriş yapması.

---

## 🔑 Çözülen Problemler ve İhtiyaçlar

- Kullanıcıların ürünleri kategori, marka ve çeşitli özelliklere göre filtreleyebilmesi.
- Admin panel üzerinden ürün, kategori, varyant ve mağaza yönetiminin yapılabilmesi.
- Satış noktaları ve mağaza bilgilerini kolayca görüntüleme.
- Modern bir tasarım ile kullanıcı dostu arayüz.

---

## 🚀 Kullanılan Teknolojiler ve Araçlar

### Web Sitesi:

- **React.js**: Web uygulamasının oluşturulması. Dinamik ve duyarlı kullanıcı arayüzleri oluşturmak için.
- **React Router**: Çoklu sayfa geçişleri ve yönlendirme.
- **Axios**: API ile veri alışverişi.
- **FontAwesome**: Görsel olarak çekici ikonlar.
- **CSS**: Modern ve duyarlı tasarımlar.

### Admin Paneli:

- **React.js**: Admin panelinin geliştirilmesi.
- **React State Management**: Durum yönetimi ve yetkilendirme.
- **Axios**: API ile veri alışverişi.
- **LocalStorage**: Kullanıcı oturum yönetimi.

---

### **📊 Veri Akışı ve API Kullanımı**

Proje, **RESTful API** ile iletişim kurar ve aşağıdaki veri akışlarını destekler:

#### **Kategoriler**

- **Tüm Kategorileri Getir**: `/api/v1/categories/get-all`
- **Kategoriye Göre Ürünleri Getir**: `/api/v1/products/get-by-category-id`

#### **Markalar**

- **Tüm Markaları Getir**: `/api/v1/brands/get-all`
- **Markaya Göre Ürünleri Getir**: `/api/v1/products/get-by-brand-id`

#### **Ürünler**

- **Tüm Ürünleri Getir**: `/api/v1/products/get-all`
- **Ürün Detaylarını Getir**: `/api/v1/products/get-by-id`
- **Kategori ID'ye Göre Ürünleri Getir**: `/api/v1/products/get-by-category-id`
- **Ürün Ekle**: `/api/v1/products/create`
- **Ürün Güncelle**: `/api/v1/products/update/:id`
- **Ürün Sil**: `/api/v1/products/delete`

#### **Varyantlar**

- **Varyant Ekle**: `/api/v1/variants/create`
- **Varyant Güncelle**: `/api/v1/variants/update/:id`
- **Varyant Sil**: `/api/v1/variants/delete`

#### **Satış Noktaları**

- **Tüm Mağazaları Getir**: `/api/v1/stores/get-all`
- **Mağaza Ekle**: `/api/v1/stores/create`
- **Mağaza Sil**: `/api/v1/stores/delete`

#### **Özellikler ve Değerler**

- **Tüm Özellikleri Getir**: `/api/v1/attributes/get-all`
- **Yeni Özellik Ekle**: `/api/v1/attributes/create`
- **Özellik Sil**: `/api/v1/attributes/delete`
- **Tüm Özellik Değerlerini Getir**: `/api/v1/attribute-values/get-all`
- **Yeni Özellik Değeri Ekle**: `/api/v1/attribute-values/create`
- **Özellik Değeri Sil**: `/api/v1/attribute-values/delete`

#### **Kimlik Doğrulama**

- **Giriş Yap**: `/api/v1/auth/login`

Her bir API, React tarafından Axios ile çağrılır ve gelen veriler bileşenler arasında state yönetimiyle paylaşılır. Tüm API çağrıları `.env` dosyasında tanımlı olan `REACT_APP_API_BASE_URL` üzerinden dinamik olarak yönlendirilir.

---

## **📸 Ekran Görüntüleri**

### **Ana Sayfa**

![Ana Sayfa](images/homepage-screenshot1.png)

![Ana Sayfa](images/homepage-screenshot2.png)

![Ana Sayfa](images/homepage-screenshot3.png)

![Ana Sayfa](images/homepage-screenshot4.png)

![Ana Sayfa](images/homepage-screenshot5.png)

### **Ürün Detayları**

![Ürün Detayları](images/product-details-screenshot1.png)

![Ürün Detayları](images/product-details-screenshot2.png)

![Ürün Detayları](images/product-details-screenshot3.png)

![Ürün Detayları](images/product-details-screenshot4.png)

### **Yönetim Paneli**

![Yönetim Paneli](images/admin-dashboard-screenshot.png)

![Yönetim Paneli](images/admin-dashboard-screenshot1.png)

![Yönetim Paneli](images/admin-dashboard-screenshot2.png)

![Yönetim Paneli](images/admin-dashboard-screenshot3.png)

![Yönetim Paneli](images/admin-dashboard-screenshot4.png)

![Yönetim Paneli](images/admin-dashboard-screenshot5.png)

![Yönetim Paneli](images/admin-dashboard-screenshot6.png)

![Yönetim Paneli](images/admin-dashboard-screenshot7.png)

![Yönetim Paneli](images/admin-dashboard-screenshot8.png)

![Yönetim Paneli](images/admin-dashboard-screenshot9.png)

![Yönetim Paneli](images/admin-dashboard-screenshot10.png)

---

## 🌟 Gelecekteki Geliştirmeler

- **Kullanıcı Hesapları**: Kullanıcıların profil oluşturması ve sipariş geçmişini görüntüleyebilmesi.
- **Sepet ve Sipariş Yönetimi**: Kullanıcıların sepet oluşturabilmesi ve sipariş verebilmesi.
- **Favoriler**: Kullanıcıların favori ürünlerini kaydedebilmesi.
- **Analitik Raporlama**: Satış ve kullanıcı aktivitelerinin detaylı raporları.
- **Responsive Geliştirmeler**: Mobil cihazlar için daha optimize edilmiş bir arayüz.

💡 **Not**: Bu proje, modern web standartlarına uygun olarak geliştirilmiştir ve kullanıcı dostu bir altyapı sunar.

---

### **Proje Vizyonu**

**Chandelier Store Website**, sade bir alışveriş platformu olmaktan çok, kullanıcıların ihtiyaçlarını estetikle buluşturan bir çözüm sunmayı amaçlar. Müşterilerin şıklık ve kalite arayışlarını desteklerken, yöneticilere verimlilik ve kontrol sunar.

---

## 🙏 Teşekkürler

Bu projenin geliştirilmesi sürecinde katkılarıyla büyük destek sağlayan ve backend altyapısını başarıyla yöneten [**Taha Koçer**](https://github.com/tahaakocer)'e sonsuz teşekkürlerimi sunuyorum. </br>
Sağladığı bilgi, deneyim ve özverili çalışma sayesinde bu proje hayata geçirilebildi.. 🚀
