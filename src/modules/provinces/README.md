# Vietnamese Provinces Data

## Setup Instructions

### 1. Download Province Data

Bạn cần tải dữ liệu từ API và lưu vào 2 files:

#### V1 Data (Before 07/2025):

```bash
curl "https://provinces.open-api.vn/api/v1/?depth=3" > src/modules/provinces/data/provinces-v1.json
```

#### V2 Data (After 07/2025):

```bash
curl "https://provinces.open-api.vn/api/v2/?depth=3" > src/modules/provinces/data/provinces-v2.json
```

Hoặc bạn có thể mở các URL này trong browser và save JSON:

- V1: https://provinces.open-api.vn/api/v1/?depth=3
- V2: https://provinces.open-api.vn/api/v2/?depth=3

### 2. File Structure

Sau khi download, structure sẽ như sau:

```
server/src/modules/provinces/
├── data/
│   ├── provinces-v1.json    (v1 data - 3 level)
│   └── provinces-v2.json    (v2 data - 2 level)
├── provinces.controller.ts
├── provinces.service.ts
└── provinces.module.ts
```

### 3. Data Format

**V1 Format (3-level):**

```json
[
  {
    "name": "Thành phố Hà Nội",
    "code": 1,
    "codename": "thanh_pho_ha_noi",
    "division_type": "tỉnh",
    "phone_code": 24,
    "districts": [
      {
        "name": "Quận Ba Đình",
        "code": 1,
        "codename": "quan_ba_dinh",
        "division_type": "huyện",
        "province_code": 1,
        "wards": [...]
      }
    ]
  }
]
```

**V2 Format (2-level):**

```json
[
  {
    "name": "Thành phố Hà Nội",
    "code": 1,
    "codename": "ha_noi",
    "division_type": "thành phố trung ương",
    "phone_code": 24,
    "wards": [
      {
        "name": "Phường Ba Đình",
        "code": 4,
        "codename": "phuong_ba_dinh",
        "division_type": "phường",
        "short_codename": "ba_dinh"
      }
    ]
  }
]
```

## API Endpoints

Module này sẽ expose các endpoints:

- `GET /provinces/v1` - Trả về v1 data (3-level)
- `GET /provinces/v2` - Trả về v2 data (2-level)

## Notes

- Dữ liệu được cache trong memory khi server start
- Không cần gọi external API mỗi lần request
- File JSON chỉ load 1 lần khi module được khởi tạo
