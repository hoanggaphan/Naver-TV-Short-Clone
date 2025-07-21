# Naver TV Short Clone

Dự án clone TikTok/Naver TV Shorts với trải nghiệm xem video dọc hiện đại.

## 🚀 Tính năng nổi bật

- **Feed video dọc**: Lướt video dạng vertical scroll như TikTok/YouTube Shorts.
- **Tự động phát video**: Video tự động phát khi xuất hiện trên màn hình.
- **Like, Unlike & Bình luận**: Tương tác trực tiếp với video.
- **Đăng nhập/Đăng ký bằng OAuth**: Hỗ trợ GitHub, Google, Discord.
- **Trang cá nhân & Quản lý video**: Xem và quản lý video đã đăng.
- **Upload video**: (Tùy chọn, nếu có thời gian phát triển).

## 🛠️ Cài đặt & Khởi chạy

### 1. Cài đặt dependencies

```bash
npm install
# hoặc
yarn install
```

### 2. Thiết lập biến môi trường

Tạo file `.env` ở thư mục gốc với nội dung mẫu:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
GITHUB_ID=your_github_client_id
GITHUB_SECRET=your_github_client_secret
GOOGLE_ID=your_google_client_id
GOOGLE_SECRET=your_google_client_secret
DISCORD_ID=your_discord_client_id
DISCORD_SECRET=your_discord_client_secret
NEXTAUTH_SECRET=your_random_secret
```

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

- **User**: Thông tin người dùng, liên kết OAuth, video, comment, like.
- **Account**: Lưu tài khoản OAuth.
- **Session**: Quản lý phiên đăng nhập.
- **VerificationToken**: Token xác thực (nếu dùng email).
- **Video**: Thông tin video, liên kết user, comment, like.
- **Comment**: Bình luận của user cho video.
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
