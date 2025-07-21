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
