# BACT API Integration - Source Code Structure

## 📁 Struktur Folder

```
src/
├── config/              # Konfigurasi aplikasi
│   ├── database.js      # Konfigurasi database & Prisma Client
│   └── constants.js     # Konstanta aplikasi (access keys, status codes, dll)
│
├── controllers/         # Business logic & request handlers
│   └── pkkController.js # Controller untuk PKK Service
│
├── middleware/          # Express middleware
│   ├── validateHeaders.js  # Validasi headers (Content-Type, User-Agent, AccessKey)
│   └── errorHandler.js     # Global error handler & 404 handler
│
├── routes/              # Route definitions
│   ├── index.js         # Main router (mount semua routes)
│   └── pkkRoutes.js     # Routes untuk PKK Service
│
├── utils/               # Helper functions & utilities
│   ├── dateHelper.js    # Helper untuk parsing & formatting tanggal
│   └── responseHelper.js # Helper untuk format response API
│
└── app.js               # Express app configuration
```

## 🔧 Penjelasan Setiap Komponen

### **config/**
Berisi konfigurasi aplikasi yang dapat digunakan di seluruh project.

- **database.js**: Setup Prisma Client dengan PostgreSQL adapter
- **constants.js**: Menyimpan konstanta seperti access keys, HTTP status codes, dll

### **controllers/**
Berisi business logic untuk setiap service/endpoint.

- **pkkController.js**: Handler untuk endpoint PKK Service
  - `getPkkByPeriod()`: Get PKK data berdasarkan period (yyyymmdd)

### **middleware/**
Berisi Express middleware untuk validasi dan error handling.

- **validateHeaders.js**: Middleware factory untuk validasi headers
- **errorHandler.js**: Global error handler dan 404 handler

### **routes/**
Berisi definisi routes/endpoints.

- **index.js**: Main router yang mount semua service routes
- **pkkRoutes.js**: Routes untuk PKK Service endpoints

### **utils/**
Berisi helper functions yang dapat digunakan di berbagai tempat.

- **dateHelper.js**: Helper untuk parsing period, format tanggal, dll
- **responseHelper.js**: Helper untuk format response API yang konsisten

### **app.js**
File utama untuk konfigurasi Express app (middleware, routes, error handlers).

## 🚀 Cara Menambahkan Service Baru

Contoh: Menambahkan Transportation Service

### 1. Buat Controller
```javascript
// src/controllers/transportationController.js
const { prisma } = require('../config/database');
const { sendSuccess, sendError } = require('../utils/responseHelper');

const getTransportation = async (req, res) => {
  // Business logic here
};

module.exports = { getTransportation };
```

### 2. Buat Routes
```javascript
// src/routes/transportationRoutes.js
const express = require('express');
const router = express.Router();
const { getTransportation } = require('../controllers/transportationController');
const validateHeaders = require('../middleware/validateHeaders');
const { ACCESS_KEYS } = require('../config/constants');

router.post('/get_transportation', 
  validateHeaders(ACCESS_KEYS.TRANSPORTATION), 
  getTransportation
);

module.exports = router;
```

### 3. Mount Routes di index.js
```javascript
// src/routes/index.js
const transportationRoutes = require('./transportationRoutes');
router.use('/', transportationRoutes);
```

## 📝 Best Practices

1. **Separation of Concerns**: Pisahkan business logic (controllers), routing (routes), dan utilities (utils)
2. **Reusability**: Gunakan helper functions di `utils/` untuk logic yang sering dipakai
3. **Consistency**: Gunakan `responseHelper` untuk format response yang konsisten
4. **Error Handling**: Semua error akan ditangkap oleh global error handler
5. **Validation**: Gunakan middleware untuk validasi yang dapat digunakan ulang

## 🔐 Access Keys

Semua access keys didefinisikan di `config/constants.js`:

- PKK: `BACT-PKK-2201`
- TRANSPORTATION: `BACT-TRANS-2202`
- SPPB: `BACT-SPPB-2203`
- SP2: `BACT-SP2-2204`
- dll...

