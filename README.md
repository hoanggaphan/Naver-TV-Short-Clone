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
