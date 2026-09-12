# Hướng dẫn Tuỳ biến Giao diện Discourse (Forum)

Chào mừng bạn đến với dự án **forum** (Discourse). Dưới đây là cấu trúc các tệp tin giao diện và các phương pháp tuỳ biến giao diện từ cơ bản đến nâng cao.

---

## 1. Cấu trúc thư mục giao diện chính

| Thư mục / Tập tin | Ý nghĩa & Mục đích tuỳ biến |
|---|---|
| `themes/` | **(Khuyến nghị nhất)** Nơi chứa các theme như `themes/horizon` và `themes/foundation`. Bạn có thể chỉnh sửa trực tiếp hoặc tạo theme mới tại đây. |
| `themes/horizon/scss/` | Hệ thống SCSS của theme Horizon (header, topic list, post, navigation,...). |
| `frontend/discourse/app/` | Toàn bộ mã nguồn frontend (Ember.js / Glimmer): |
| ├── `components/` | Các component UI độc lập (ví dụ: `d-header.gjs`, `topic-list.gjs`,...). |
| ├── `templates/` | Các template Handlebars (`.hbs`). |
| ├── `styles/` | CSS/SCSS cục bộ của frontend. |
| ├── `connectors/` | Plugin outlets dùng để chèn thêm giao diện vào các vị trí có sẵn mà không phá vỡ core. |
| `app/assets/stylesheets/` | Hệ thống stylesheet lõi: |
| ├── `color_definitions.scss` | Khai báo bảng màu hệ thống (Primary, Secondary, Success, Danger, biến màu giao diện). |
| ├── `common/` | Các file SCSS dùng chung cho cả desktop và mobile (base, components, layouts). |

---

## 2. Hai cách tiếp cận tuỳ biến giao diện

### Cách 1: Tuỳ biến thông qua Theme (Chuẩn của Discourse - Khuyên Dùng)
Discourse được thiết kế để mở rộng qua hệ thống **Theme** & **Theme Component**. 
- Bạn có thể tham khảo trực tiếp cấu trúc của `themes/horizon/`:
  - `scss/`: Chứa các file style SCSS theo từng phần của diễn đàn (`_header.scss`, `_topic-list.scss`, `_topic.scss`, v.v.).
  - `javascripts/`: Chèn thêm script hoặc custom widget / component.
  - `settings.yml`: Cấu hình các thiết lập giao diện (màu sắc, bật/tắt banner, logo,...).
  - `about.json`: Metadata thông tin của theme.

### Cách 2: Sửa trực tiếp vào Core Frontend
Nếu bạn muốn thay đổi sâu vào luồng hoạt động hoặc cấu trúc HTML gốc:
- Sửa hoặc mở rộng component tại `frontend/discourse/app/components/`.
- Sửa hoặc ghi đè SCSS tại `app/assets/stylesheets/common/`.
- Thay đổi bảng màu cơ bản tại `app/assets/stylesheets/color_definitions.scss`.

---

## 3. Cách mở và làm việc trong IDE

1. Mở thư mục này làm Active Workspace:
   ```bash
   /Users/macbook/Desktop/forum
   ```
2. Bạn có thể tìm nhanh các component bằng cách tìm kiếm theo tên hoặc inspect phần tử trên giao diện Discourse:
   - Header: `frontend/discourse/app/components/d-header.gjs` hoặc `themes/horizon/scss/_header.scss`
   - Danh sách chủ đề: `frontend/discourse/app/components/topic-list.gjs` hoặc `themes/horizon/scss/_topic-list.scss`
   - Bảng màu: `app/assets/stylesheets/color_definitions.scss`
