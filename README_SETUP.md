# Hướng dẫn Cài đặt & Triển khai Diễn đàn Công nghệ KTNN (Discourse)

Tài liệu này hướng dẫn chi tiết cách thiết lập môi trường phát triển cục bộ (**macOS**, **Windows**) và triển khai Production (**Linux**), cùng giải pháp tự động hóa "1 câu lệnh".

---

## ⚡ CÂU HỎI: Có giải pháp nào "chỉ chạy 1 câu lệnh là tự động cài full cấu phần" không?

> **CÓ! Giải pháp chuẩn công nghiệp chính là DOCKER & CONTAINERIZATION.**

Discourse là một hệ thống fullstack phức tạp (Ruby, PostgreSQL, Redis, pgvector, ImageMagick, Node, pnpm). Để không phải cài đặt thủ công từng thứ trên máy tính cá nhân hay server, Discourse đã thiết kế sẵn giải pháp container:

---

## 🐳 HƯỚNG DẪN CHẠY BẰNG DOCKER (CHO MÁY LOCAL DEV)

Bạn chỉ cần cài đặt **[Docker Desktop](https://www.docker.com/products/docker-desktop/)** (hỗ trợ cả Windows và macOS). Sau khi Docker Desktop đang chạy, chọn 1 trong 3 cách sau:

### Cách 1: Chạy bằng Docker Compose (Đơn giản nhất - 1 Câu Lệnh) ⚡
Dự án đã có sẵn file [`docker-compose.yml`](file:///Users/macbook/Desktop/forum/docker-compose.yml). Mở Terminal tại thư mục dự án và chạy:

```bash
docker compose up
```

* **Cơ chế hoạt động:**
  * Docker sẽ tự động tải image `discourse/discourse_dev` chính thức từ Docker Hub (bên trong đã cài sẵn trọn bộ PostgreSQL, Redis, Ruby 3.4, Node, pnpm).
  * Tự động khởi chạy database, redis và chạy server `bin/dev`.
  * Thư mục mã nguồn trên máy bạn được đồng bộ trực tiếp vào container (`live-mount`), bạn sửa code ở máy thật thì web cập nhật ngay lập tức.
* **Truy cập:** Mở trình duyệt vào **`http://localhost:3000/`**.
* **Dừng container:** Bấm `Ctrl + C` hoặc mở tab terminal khác gõ: `docker compose down`.

---

### Cách 2: Chạy bằng VS Code Dev Containers (Chuẩn của Discourse Core Team) 💻
1. Cài đặt extension **Dev Containers** trong VS Code (Extension ID: `ms-vscode-remote.remote-containers`).
2. Mở thư mục `forum` bằng VS Code.
3. Khi có thông báo ở góc phải: *"Folder contains a Dev Container configuration file. Reopen to folder in a container?"* ➔ Bấm **Reopen in Container**.
   *(Hoặc bấm phím `F1` ➔ gõ `Dev Containers: Reopen in Container`).*
4. VS Code sẽ tự động dựng container theo cấu hình [`.devcontainer/devcontainer.json`](file:///Users/macbook/Desktop/forum/.devcontainer/devcontainer.json).
5. Sau khi vào trong container, mở Terminal tích hợp của VS Code và gõ:
   ```bash
   bin/dev
   ```
   Truy cập: **`http://localhost:3000/`**.

---

### Cách 3: Chạy bằng Docker CLI thuần (Không cần compose)
```bash
# 1. Khởi chạy container ngầm và mount thư mục hiện tại vào
docker run -d --name discourse_dev \
  -p 3000:3000 -p 9292:9292 \
  -v "$(pwd)":/workspace/discourse \
  -w /workspace/discourse \
  discourse/discourse_dev:release \
  /sbin/boot

# 2. Chạy server phát triển
docker exec -it discourse_dev bin/dev
```

---

## PHẦN 1: Cài đặt Môi trường Phát triển (Development)

### A. Dành cho macOS (Chạy Native)

#### 1. Cài đặt các công cụ nền tảng qua Homebrew:
```bash
# Cài đặt Database, Cache, Ruby 3.4 và các công cụ xử lý ảnh
brew install postgresql@17 redis ruby@3.4 pgvector imagemagick coreutils oxipng pngquant jpegoptim jhead

# Cài đặt pnpm quản lý frontend
npm install -g pnpm
```

#### 2. Khởi chạy Database & Cache:
```bash
# Khởi động PostgreSQL và Redis
brew services start postgresql@17
brew services start redis

# Cấp quyền thực thi cho module Redis (trên macOS)
chmod +x /usr/local/opt/redis/lib/redis/modules/*.so 2>/dev/null
brew services restart redis

# Tạo user Database theo tên tài khoản Mac
createuser -s $(whoami)

# Đảm bảo extension pgvector sẵn sàng trong PostgreSQL 17
cp /usr/local/share/postgresql@17/extension/vector* /usr/local/opt/postgresql@17/share/postgresql/extension/ 2>/dev/null
cp /usr/local/lib/postgresql@17/vector.dylib /usr/local/opt/postgresql@17/lib/postgresql/vector.dylib 2>/dev/null
```

#### 3. Cấu hình biến môi trường cố định:
Mở Terminal và thêm vào `~/.zshrc`:
```bash
echo 'export PATH="/usr/local/opt/ruby@3.4/bin:/usr/local/opt/postgresql@17/bin:$PATH"' >> ~/.zshrc
echo 'export LC_ALL="en_US.UTF-8"' >> ~/.zshrc
echo 'export LANG="en_US.UTF-8"' >> ~/.zshrc
source ~/.zshrc
```

#### 4. Cài đặt thư viện dự án & Khởi tạo Database:
```bash
cd /Users/macbook/Desktop/forum

# Cài đặt Ruby Gems
bundle install

# Cài đặt Frontend packages
pnpm install

# Tạo và nạp cấu trúc Database
bundle exec rake db:create db:migrate
```

#### 5. Khởi động Diễn đàn:
```bash
bin/dev
```
Truy cập: **http://localhost:3000/**

---

### B. Dành cho Windows (Sử dụng WSL2 Ubuntu)

> **Lưu ý quan trọng cho Windows:**
> Discourse và Ruby on Rails **không thể chạy native trực tiếp trên Windows CMD/PowerShell** do yêu cầu các thư viện socket POSIX và tiến trình Unix (Puma, Pitchfork). Giải pháp chuẩn và bắt buộc trên Windows là sử dụng **WSL2 (Windows Subsystem for Linux - Ubuntu)**.

#### 1. Cài đặt WSL2 (nếu chưa có):
Mở PowerShell (quyền Administrator) và chạy:
```powershell
wsl --install -d Ubuntu
```
*(Khởi động lại máy nếu Windows yêu cầu, sau đó mở ứng dụng **Ubuntu** lên).*

#### 2. Cài đặt các gói phụ thuộc trên Ubuntu (WSL2):
Chạy trong terminal Ubuntu:
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y git curl build-essential libpq-dev libssl-dev libreadline-dev \
  zlib1g-dev libyaml-dev libffi-dev postgresql postgresql-contrib postgresql-server-dev-all \
  redis-server imagemagick optipng jhead jpegoptim pngquant
```

#### 3. Cài đặt Node.js & pnpm:
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm install -g pnpm
```

#### 4. Cài đặt Ruby 3.4 (qua rbenv):
```bash
git clone https://github.com/rbenv/rbenv.git ~/.rbenv
echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bashrc
echo 'eval "$(rbenv init -)"' >> ~/.bashrc
git clone https://github.com/rbenv/ruby-build.git ~/.rbenv/plugins/ruby-build
source ~/.bashrc

rbenv install 3.4.2
rbenv global 3.4.2
gem install bundler
```

#### 5. Cài đặt extension pgvector cho PostgreSQL:
```bash
cd /tmp
git clone --branch v0.8.0 https://github.com/pgvector/pgvector.git
cd pgvector
make && sudo make install
```

#### 6. Khởi chạy dịch vụ & tạo user Database:
```bash
sudo service postgresql start
sudo service redis-server start

# Tạo role PostgreSQL bằng tên tài khoản Ubuntu của bạn
sudo -u postgres createuser -s $(whoami)
```

#### 7. Khởi tạo dự án & Chạy:
```bash
cd /duong-dan-den/forum
bundle install
pnpm install
bundle exec rake db:create db:migrate
bin/dev
```
Truy cập: **http://localhost:3000/** từ trình duyệt Windows.

---

## PHẦN 2: Triển khai Lên Server Production (Linux Ubuntu/Debian)

Trên môi trường Production thực tế (VPS / Cloud Server như DigitalOcean, AWS, GCP, Viettel Cloud, VNPT,...), Discourse **chỉ hỗ trợ phương pháp container hóa Docker** để đảm bảo bảo mật, sao lưu tự động và nâng cấp chỉ bằng 1 cú nhấp chuột.

### Yêu cầu cấu hình Server tối thiểu:
* **Hệ điều hành:** Ubuntu 22.04 / 24.04 LTS (64-bit).
* **Phần cứng:** Tối thiểu 2 CPU Core, 2 GB RAM (hoặc 1 GB RAM + 2 GB Swap file).
* **Tên miền (Domain):** Đã trỏ bản ghi A về địa chỉ IP của VPS (ví dụ: `diendan.ktnn.gov.vn`).
* **Cổng mở:** 80 (HTTP) và 443 (HTTPS).

---

### Các bước Triển khai "1 Chạm" (Official Discourse Docker):

#### Bước 1: Cài đặt Docker trên Server Linux:
```bash
curl -fsSL https://get.docker.com | sh
```

#### Bước 2: Tải bộ cài đặt Discourse chính thức:
```bash
sudo -s
git clone https://github.com/discourse/discourse_docker.git /var/discourse
cd /var/discourse
chmod 700 containers
```

#### Bước 3: Chạy trình cài đặt tự động (`discourse-setup`):
```bash
./discourse-setup
```

Trình cài đặt sẽ tự động hỏi bạn các thông tin cơ bản:
1. **Hostname for your Discourse?** ➔ Điền domain (ví dụ: `diendan.ktnn.gov.vn`).
2. **Email address for admin account?** ➔ Điền email admin (ví dụ: `admin@ktnn.gov.vn`).
3. **SMTP server address?** ➔ Địa chỉ mail server gửi thông báo (ví dụ: `smtp.gmail.com` hoặc server mail nội bộ).
4. **SMTP user name & password?** ➔ Thông tin đăng nhập SMTP.
5. **Let's Encrypt account email?** ➔ Email nhận thông báo chứng chỉ bảo mật SSL miễn phí.

#### Bước 4: Chờ hoàn tất!
* Script sẽ tự động:
  * Tải và cấu hình PostgreSQL, Redis, Nginx, Rails trong container.
  * Tự xin chứng chỉ bảo mật SSL (HTTPS) qua Let's Encrypt.
  * Tự khởi tạo Database và thiết lập tường lửa.
* Sau 5–10 phút, bạn chỉ cần mở trình duyệt vào **`https://diendan.ktnn.gov.vn`** để hoàn tất bước chào mừng.

---

## PHẦN 3: Các Lệnh Quản Trị Thường Dùng

| Thao tác | Môi trường Dev (Local) | Môi trường Production (Linux Docker) |
|---|---|---|
| **Khởi động server** | `bin/dev` | `cd /var/discourse && ./launcher start app` |
| **Dừng server** | `Ctrl + C` hoặc `kill -9 $(lsof -ti:3000)` | `cd /var/discourse && ./launcher stop app` |
| **Khởi động lại** | Chạy lại `bin/dev` | `cd /var/discourse && ./launcher restart app` |
| **Nâng cấp phiên bản** | `git pull && bundle install && pnpm install && rake db:migrate` | `cd /var/discourse && ./launcher rebuild app` |
| **Xem log hệ thống** | In trực tiếp ra màn hình Terminal | `cd /var/discourse && ./launcher logs app` |
| **Tạo tài khoản Admin** | `bundle exec rake admin:create` | `cd /var/discourse && ./launcher enter app` sau đó `rake admin:create` |
