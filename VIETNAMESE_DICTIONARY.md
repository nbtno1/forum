# Bảng Thuật Ngữ & Hướng Dẫn Việt Hóa Diễn Đàn Công Nghệ KTNN

Hệ thống Discourse đã tích hợp sẵn bộ dịch tiếng Việt chính thức với hơn **12.000 chuỗi văn bản**:
* **Frontend (Giao diện người dùng):** [`config/locales/client.vi.yml`](file:///Users/macbook/Desktop/forum/config/locales/client.vi.yml) (8.395 dòng)
* **Backend (Hệ thống & Email):** [`config/locales/server.vi.yml`](file:///Users/macbook/Desktop/forum/config/locales/server.vi.yml) (4.300 dòng)
* **Theme Horizon:** [`themes/horizon/locales/vi.yml`](file:///Users/macbook/Desktop/forum/themes/horizon/locales/vi.yml)

Hệ thống đã được kích hoạt ngôn ngữ mặc định sang **Tiếng Việt (`vi`)**.

---

## 1. Bảng Tra Cứu Các Thuật Ngữ Cốt Lõi Trên Giao Diện

Dưới đây là các từ khóa tiếng Anh thường gặp và bản dịch tiếng Việt chuẩn đã được áp dụng vào diễn đàn:

### Thanh Điều Hướng & Tiêu Đề (Header & Navigation)
| Từ Tiếng Anh (English) | Bản Dịch Tiếng Việt (Vietnamese) | Mã Khóa (I18n Key) |
|---|---|---|
| Latest | Mới nhất | `js.filters.latest.title` |
| Top | Nổi bật | `js.filters.top.title` |
| Categories | Danh mục | `js.filters.categories.title` |
| Unread | Chưa đọc | `js.filters.unread.title` |
| New | Mới | `js.filters.new.title` |
| Bookmarks | Đã lưu | `js.user.bookmarks` |
| Search | Tìm kiếm | `js.search.title` |
| Log In | Đăng nhập | `js.log_in` |
| Sign Up | Đăng ký | `js.sign_up` |
| Log Out | Đăng xuất | `js.user.log_out` |
| Admin | Quản trị | `js.admin_title` |

### Bài Viết & Thảo Luận (Topics & Posts)
| Từ Tiếng Anh (English) | Bản Dịch Tiếng Việt (Vietnamese) | Mã Khóa (I18n Key) |
|---|---|---|
| New Topic | Tạo chủ đề mới / Chủ đề Mới | `js.topic.create` |
| Reply | Trả lời | `js.topic.reply.title` |
| Replies | Lượt trả lời | `js.replies` |
| Views | Lượt xem | `js.views` |
| Likes | Lượt thích | `js.likes` |
| Activity | Hoạt động | `js.activity` |
| Pinned | Đã ghim | `js.topic_statuses.pinned.help` |
| Closed | Đã đóng | `js.topic_statuses.closed.help` |
| Solved | Đã giải quyết / Giải pháp | `solved` |
| Unsolved | Chưa có giải pháp | `unsolved` |
| Edit | Chỉnh sửa | `js.post.controls.edit` |
| Delete | Xóa | `js.post.controls.delete` |
| Bookmark | Lưu bài viết | `js.post.controls.bookmark` |
| Share | Chia sẻ | `js.post.controls.share` |

### Hồ Sơ Thành Viên (User Profile)
| Từ Tiếng Anh (English) | Bản Dịch Tiếng Việt (Vietnamese) | Mã Khóa (I18n Key) |
|---|---|---|
| Preferences | Cài đặt / Tùy chọn | `js.user.preferences` |
| Notifications | Thông báo | `js.user.notifications` |
| Messages | Tin nhắn | `js.user.messages` |
| Badges | Huy hiệu | `js.badges.title` |
| Trust Level | Cấp bậc tin cậy | `js.trust_levels.title` |
| Member | Thành viên | `js.trust_levels.member` |
| Leader | Trưởng nhóm / Lãnh đạo | `js.trust_levels.leader` |

---

## 2. Cách Chỉnh Sửa / Đổi Bản Dịch Của Bất Kỳ Từ Nào

Bạn có 2 cách cực kỳ nhanh chóng để thay đổi cách dịch theo ý muốn:

### Cách 1: Tùy biến trực tiếp trên Web Admin (Khuyên Dùng - Có hiệu lực ngay ⚡)
1. Mở trình duyệt vào **`http://localhost:3000/`** và đăng nhập bằng tài khoản Admin (`admin` / `DiscourseAdmin123!`).
2. Vào biểu tượng menu bánh răng ⚙️ ➔ chọn **Quản trị (Admin)**.
3. Chọn tab **Tùy chỉnh (Customize)** ➔ chọn mục **Văn bản (Text)** (hoặc truy cập thẳng `http://localhost:3000/admin/customize/site_texts`).
4. Gõ từ tiếng Anh cần tìm vào ô tìm kiếm (ví dụ: `Bookmark` hoặc `New Topic`).
5. Nhấp vào từ đó, nhập nội dung tiếng Việt bạn muốn hiển thị và bấm **Lưu thay đổi**.
6. Giao diện người dùng sẽ đổi sang từ mới ngay lập tức mà không cần khởi động lại server.

### Cách 2: Chỉnh sửa trực tiếp trong tệp mã nguồn
* File ngôn ngữ giao diện: [`config/locales/client.vi.yml`](file:///Users/macbook/Desktop/forum/config/locales/client.vi.yml).
* Bạn chỉ cần mở tệp này, dùng chức năng Tìm kiếm (`Cmd + F` hoặc `Ctrl + F`) để tìm cụm từ tiếng Việt hoặc key tiếng Anh, sửa lại chuỗi văn bản và lưu lại (`Cmd + S`).
