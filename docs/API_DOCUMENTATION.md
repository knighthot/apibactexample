# BACT API Integration - API Documentation

## 📋 Table of Contents
- [PKK Service](#pkk-service)
  - [GET PKK Data](#1-get-pkk-data)
  - [Entry PKK Data](#2-entry-pkk-data)
- [Transportation Service](#transportation-service)
  - [GET Transportation Data](#1-get-transportation-data)
- [CODECO Service](#codeco-service)
  - [Entry CODECO Data](#1-entry-codeco-data)

---

## PKK Service

### 1. GET PKK Data

Mengambil data PKK berdasarkan period (tanggal ETA).

**Endpoint:** `POST /get_pkk`

**Headers:**
```
Content-Type: application/x-www-form-urlencoded
User-Agent: BACT
AccessKey: BACT-PKK-2201
```

**Request Body:**
| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| period | string | Yes | Tanggal dalam format yyyymmdd | 20260120 |

**Success Response (200):**
```json
{
  "response": {
    "status": 1,
    "code": 200,
    "message": "Sukses",
    "data": [
      {
        "nomor_pkk": "PKK202601140001",
        "nama_kapal": "MV OCEAN BREEZE",
        "call_sign": "YBCD2",
        "tanda_pendaftaran_kapal": "2024-LL-No.1234/1",
        "tanggal_eta": "2026-01-20 08:00:00",
        "tanggal_etd": "2026-01-22 17:00:00",
        "jenis_trayek": "Liner",
        "timestamp": "2026-01-22T10:32:48.000Z"
      }
    ]
  }
}
```

**Error Responses:**

*400 Bad Request - Missing period:*
```json
{
  "response": {
    "status": 0,
    "code": 400,
    "message": "Field \"period\" is required",
    "data": []
  }
}
```

*400 Bad Request - Invalid format:*
```json
{
  "response": {
    "status": 0,
    "code": 400,
    "message": "Invalid period format. Expected format: yyyymmdd (e.g., 20260120)",
    "data": []
  }
}
```

*401 Unauthorized - Invalid AccessKey:*
```json
{
  "response": {
    "status": 0,
    "code": 401,
    "message": "Invalid or missing AccessKey",
    "data": []
  }
}
```

---

### 2. Entry PKK Data

Memasukkan data PKK baru ke database.

**Endpoint:** `POST /entry_pkk`

**Headers:**
```
Content-Type: application/x-www-form-urlencoded
User-Agent: BACT
AccessKey: BACT-PKK-2201
```

**Request Body:**
| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| nomor_pkk | string | Yes | Nomor PKK (unique) | PKK202601230001 |
| nama_kapal | string | Yes | Nama kapal | MV OCEAN BREEZE |
| call_sign | string | Yes | Call sign kapal | YBCD2 |
| tanda_pendaftaran_kapal | string | Yes | Nomor registrasi kapal | 2024-LL-No.1234/1 |
| tanggal_eta | string | Yes | Tanggal ETA (yyyy-mm-dd HH:mm:ss) | 2026-01-23 08:00:00 |
| tanggal_etd | string | Yes | Tanggal ETD (yyyy-mm-dd HH:mm:ss) | 2026-01-25 17:00:00 |
| jenis_trayek | string | Yes | Jenis trayek (Liner/Tramper) | Liner |

**Success Response (200):**
```json
{
  "response": {
    "status": 1,
    "code": 200,
    "message": "Data PKK berhasil disimpan",
    "data": [
      {
        "nomor_pkk": "PKK202601230001",
        "nama_kapal": "MV OCEAN BREEZE",
        "call_sign": "YBCD2",
        "tanda_pendaftaran_kapal": "2024-LL-No.1234/1",
        "tanggal_eta": "2026-01-23 08:00:00",
        "tanggal_etd": "2026-01-25 17:00:00",
        "jenis_trayek": "Liner",
        "timestamp": "2026-01-23T05:30:00.000Z"
      }
    ]
  }
}
```

**Error Responses:**

*400 Bad Request - Missing required field:*
```json
{
  "response": {
    "status": 0,
    "code": 400,
    "message": "Field \"nomor_pkk\" (PKK Number) is required",
    "data": []
  }
}
```

*400 Bad Request - Invalid date format:*
```json
{
  "response": {
    "status": 0,
    "code": 400,
    "message": "Invalid tanggal_eta format. Expected: yyyy-mm-dd HH:mm:ss or ISO format",
    "data": []
  }
}
```

*400 Bad Request - ETD before ETA:*
```json
{
  "response": {
    "status": 0,
    "code": 400,
    "message": "tanggal_etd must be after tanggal_eta",
    "data": []
  }
}
```

*400 Bad Request - Duplicate nomor_pkk:*
```json
{
  "response": {
    "status": 0,
    "code": 400,
    "message": "PKK with nomor_pkk \"PKK202601230001\" already exists",
    "data": []
  }
}
```

---

## Transportation Service

### 1. GET Transportation Data

Mengambil data Transportation dengan limit jumlah data.

**Endpoint:** `POST /get_transportation`

**Headers:**
```
Content-Type: application/x-www-form-urlencoded
User-Agent: BACT
AccessKey: BACT-TRANS-2202
```

**Request Body:**
| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| jml | string | Yes | Jumlah data yang ingin diambil | 10 |

**Success Response (200):**
```json
{
  "response": {
    "status": 1,
    "code": 200,
    "message": "Sukses",
    "data": [
      {
        "no_kendaraan": "BP 1234 XX",
        "nama_perusahaan": "PT Batam Terminal Petikemas",
        "nama_perorangan": "Fikramul Bizli",
        "available": "Available",
        "masa_expired": "2026-12-31",
        "timestamp": "2026-01-22T13:15:00Z"
      }
    ]
  }
}
```

**Error Responses:**

*400 Bad Request - Missing jml:*
```json
{
  "response": {
    "status": 0,
    "code": 400,
    "message": "Field \"jml\" is required",
    "data": []
  }
}
```

*400 Bad Request - Invalid jml:*
```json
{
  "response": {
    "status": 0,
    "code": 400,
    "message": "Field \"jml\" must be a positive number",
    "data": []
  }
}
```

*401 Unauthorized - Invalid AccessKey:*
```json
{
  "response": {
    "status": 0,
    "code": 401,
    "message": "Invalid or missing AccessKey",
    "data": []
  }
}
```

---

## 🔐 Authentication

Semua endpoint memerlukan 3 headers berikut:

1. **Content-Type**: `application/x-www-form-urlencoded`
2. **User-Agent**: `BACT`
3. **AccessKey**: Sesuai dengan service yang diakses
   - PKK Service: `BACT-PKK-2201`
   - Transportation Service: `BACT-TRANS-2202`

Jika salah satu header tidak sesuai, akan mendapat response error 400 atau 401.

---

## 📝 Testing dengan Postman

### Test GET PKK
1. Method: `POST`
2. URL: `http://localhost:3000/get_pkk`
3. Headers:
   - `Content-Type`: `application/x-www-form-urlencoded`
   - `User-Agent`: `BACT`
   - `AccessKey`: `BACT-PKK-2201`
4. Body (x-www-form-urlencoded):
   - `period`: `20260120`

### Test Entry PKK
1. Method: `POST`
2. URL: `http://localhost:3000/entry_pkk`
3. Headers:
   - `Content-Type`: `application/x-www-form-urlencoded`
   - `User-Agent`: `BACT`
   - `AccessKey`: `BACT-PKK-2201`
4. Body (x-www-form-urlencoded):
   - `nomor_pkk`: `PKK202601230001`
   - `nama_kapal`: `MV TEST SHIP`
   - `call_sign`: `TEST1`
   - `tanda_pendaftaran_kapal`: `2026-LL-No.9999/1`
   - `tanggal_eta`: `2026-01-23 08:00:00`
   - `tanggal_etd`: `2026-01-25 17:00:00`
   - `jenis_trayek`: `Liner`

