# Naver TV Short Clone

Dự án clone TikTok/Naver TV Shorts với trải nghiệm xem video dọc hiện đại.

## 🚀 Tính năng nổi bật

- **Feed video dọc**: Lướt video dạng vertical scroll như TikTok/YouTube Shorts.
- **Tự động phát video**: Video tự động phát khi xuất hiện trên màn hình.
- **Like, Unlike**: Tương tác thích/bỏ thích video.
- **Đăng nhập/Đăng ký bằng OAuth**: Hỗ trợ GitHub, Google, Discord.
- **Trang cá nhân & Quản lý video**: Xem và quản lý video đã đăng.
- **Upload video**: Đã có chức năng upload video.
- **Bình luận**: (Chưa phát triển)

## 🛠️ Cài đặt & Khởi chạy

### 1. Cài đặt dependencies

```bash
npm install
# hoặc
yarn install
```

### 2. Thiết lập biến môi trường

- Dự án đã có sẵn file `.env.example` ở thư mục gốc. Để tạo file cấu hình môi trường, hãy chạy lệnh sau:

```bash
cp .env.example .env
```

- Sau đó, mở file `.env` vừa copy và điền các giá trị secret phù hợp (client id/secret của GitHub, Google, Discord, chuỗi kết nối DATABASE_URL, NEXTAUTH_SECRET, ...).
- Các biến cần thiết đã được liệt kê sẵn trong file `.env.example`.

> **Lưu ý:**  
> - Đăng ký ứng dụng trên GitHub, Google, Discord để lấy client id/secret.  
> - `DATABASE_URL` là chuỗi kết nối PostgreSQL, ví dụ:  
>   `postgresql://postgres:password@localhost:5432/naver_tv_short_clone`

### 3. Khởi tạo database

```bash
npx prisma migrate dev --name init
```

### 4. Chạy server phát triển

```bash
npm run dev
# hoặc
yarn dev
```

Truy cập [http://localhost:3000](http://localhost:3000) để trải nghiệm ứng dụng.

---

## ☁️ Hướng dẫn tạo Database với Vercel & Pull file .env

### 1. Tạo Database trên Vercel

1. Truy cập [Vercel Dashboard](https://vercel.com/dashboard).
2. Chọn dự án của bạn hoặc tạo mới nếu chưa có.
3. Vào mục **Storage** > **PostgreSQL** (hoặc chọn loại database bạn muốn).
4. Tạo một instance database mới, đặt tên và cấu hình theo nhu cầu.
5. Sau khi tạo xong, copy các thông tin kết nối (host, database, user, password, port).

### 2. Thiết lập biến môi trường (.env)

1. Trên Vercel, vào mục **Project Settings** > **Environment Variables**.
2. Thêm các biến môi trường cần thiết, ví dụ:
   ```
   DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE
   ```
3. Để pull file .env về máy local, bạn cần cài đặt Vercel CLI:
   ```bash
   npm i -g vercel
   ```
4. Đăng nhập Vercel CLI:
   ```bash
   vercel login
   ```
5. Pull biến môi trường về file `.env.local`:
   ```bash
   vercel env pull .env.local
   ```
6. Đổi tên file `.env.local` thành `.env` nếu dự án sử dụng file `.env`.

---

## 🔑 Hướng dẫn tạo biến môi trường OAuth (GitHub, Google, Discord)

### 1. GitHub

1. Truy cập [GitHub Developer Settings](https://github.com/settings/developers).
2. Chọn **OAuth Apps** > **New OAuth App**.
3. Điền thông tin:
   - **Application name**: Tên ứng dụng (tùy chọn).
   - **Homepage URL**: `http://localhost:3000` (hoặc domain thật nếu deploy).
   - **Authorization callback URL**: `http://localhost:3000/api/auth/callback/github`
4. Nhấn **Register application**.
5. Sau khi tạo xong, copy **Client ID** và **Client Secret**.
6. Thêm vào biến môi trường:
   ```
   GITHUB_CLIENT_ID=your_client_id
   GITHUB_CLIENT_SECRET=your_client_secret
   ```

---

### 2. Google

1. Truy cập [Google Cloud Console](https://console.cloud.google.com/).
2. Tạo một project mới (nếu chưa có).
3. Vào **APIs & Services** > **Credentials**.
4. Chọn **Create Credentials** > **OAuth client ID**.
5. Chọn **Web application**.
6. Thêm **Authorized redirect URIs**:
   ```
   http://localhost:3000/api/auth/callback/google
   ```
7. Nhấn **Create** và copy **Client ID** và **Client Secret**.
8. Thêm vào biến môi trường:
   ```
   GOOGLE_CLIENT_ID=your_client_id
   GOOGLE_CLIENT_SECRET=your_client_secret
   ```

---

### 3. Discord

1. Truy cập [Discord Developer Portal](https://discord.com/developers/applications).
2. Nhấn **New Application** và đặt tên.
3. Vào mục **OAuth2** > **Redirects** > **Add Redirect**:
   ```
   http://localhost:3000/api/auth/callback/discord
   ```
4. Vào **OAuth2** > **General** để lấy **Client ID** và **Client Secret**.
5. Thêm vào biến môi trường:
   ```
   DISCORD_CLIENT_ID=your_client_id
   DISCORD_CLIENT_SECRET=your_client_secret
   ```

---

## 📦 Hướng dẫn tạo biến môi trường cho Pinata (IPFS Upload)

### 1. Đăng ký tài khoản Pinata

1. Truy cập [Pinata Cloud](https://app.pinata.cloud/) và đăng ký tài khoản (miễn phí hoặc trả phí).

### 2. Tạo API Key

1. Sau khi đăng nhập, vào mục **API Keys** trên dashboard.
2. Nhấn **New Key** để tạo một API Key mới.
3. Đặt tên (label) cho key, chọn quyền truy cập phù hợp (nên để full access hoặc ít nhất là quyền upload/read).
4. Nhấn **Create Key**.
5. Lưu lại **API Key** và **API Secret** (chỉ hiển thị một lần).

### 3. Thêm vào biến môi trường

Thêm các biến sau vào file `.env`:

```
PINATA_API_KEY=your_pinata_api_key
PINATA_API_SECRET=your_pinata_api_secret
```

> **Lưu ý:**  
> Không chia sẻ các thông tin này công khai. Nếu deploy lên Vercel, hãy thêm các biến này vào phần Environment Variables của dự án trên Vercel.

---

> **Lưu ý:**  
> Khi deploy lên production, hãy thay đổi các URL callback và homepage cho phù hợp với domain thật của bạn.

---

## 🗄️ Cấu trúc Database (Prisma)

- **User**: Thông tin người dùng, liên kết OAuth, video, like.
- **Account**: Lưu tài khoản OAuth.
- **Session**: Quản lý phiên đăng nhập.
- **VerificationToken**: Token xác thực (nếu dùng email).
- **Video**: Thông tin video, liên kết user, like.
- **Comment**: (Chưa phát triển)
- **Like**: Like của user cho video.

Chi tiết: [`prisma/schema.prisma`](prisma/schema.prisma)

---

## 🧰 Công nghệ sử dụng

- **Next.js 15 (App Router)**
- **Prisma ORM** (PostgreSQL)
- **NextAuth.js** (OAuth: GitHub, Google, Discord)
- **TailwindCSS**
- **Lucide Icons**
- **Framer Motion, React Hook Form, Zod, ...**

---

## 🤝 Đóng góp

Mọi ý kiến, đóng góp hoặc pull request đều được chào đón!

---
