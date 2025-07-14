# Naver TV Short Clone

Dự án clone TikTok/Naver TV Shorts với các tính năng chính:

## Tính năng

- **Trang feed video dọc**: Vertical scroll, giống TikTok/YouTube Shorts.
- **Video auto-play**: Video tự động phát khi hiển thị trên màn hình.
- **Like/Unlike, Comment**: Người dùng có thể thích/bỏ thích và bình luận video.
- **Đăng ký/Đăng nhập với OAuth**: Hỗ trợ đăng nhập qua GitHub, Google, Discord (có thể mở rộng thêm CAPTCHA).
- **Profile channel, My videos**: Trang cá nhân, quản lý video của tôi.
- **Upload video**: (Nếu có thời gian).

## Cài đặt & Chạy dự án

### 1. Cài đặt dependencies

```bash
npm install
# hoặc
yarn install
```

### 2. Cấu hình biến môi trường

Tạo file `.env` ở thư mục gốc với nội dung mẫu:

```env
# Kết nối database PostgreSQL
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"

# OAuth - Đăng nhập với GitHub
GITHUB_ID=your_github_client_id
GITHUB_SECRET=your_github_client_secret

# OAuth - Đăng nhập với Google
GOOGLE_ID=your_google_client_id
GOOGLE_SECRET=your_google_client_secret

# OAuth - Đăng nhập với Discord
DISCORD_ID=your_discord_client_id
DISCORD_SECRET=your_discord_client_secret

# NextAuth secret
NEXTAUTH_SECRET=your_random_secret
```

> **Lưu ý:**  
> - Bạn cần đăng ký ứng dụng trên GitHub, Google, Discord để lấy các thông tin client id/secret.
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

Truy cập [http://localhost:3000](http://localhost:3000) để xem ứng dụng.

---

## Cấu trúc Database (Prisma)

- **User**: Thông tin người dùng, liên kết với các tài khoản OAuth, video, comment, like.
- **Account**: Lưu thông tin tài khoản OAuth.
- **Session**: Quản lý phiên đăng nhập.
- **VerificationToken**: Token xác thực (nếu dùng email).
- **Video**: Thông tin video, liên kết user, comment, like.
- **Comment**: Bình luận của user cho video.
- **Like**: Like của user cho video.

Xem chi tiết trong [`prisma/schema.prisma`](prisma/schema.prisma).

---

## Công nghệ sử dụng

- **Next.js 15 (App Router)**
- **Prisma ORM** (PostgreSQL)
- **NextAuth.js** (OAuth: GitHub, Google, Discord)
- **TailwindCSS**
- **Lucide Icons**
- **Framer Motion, React Hook Form, Zod, v.v.**

---

## Đóng góp

Mọi đóng góp, ý kiến hoặc pull request đều được hoan nghênh!
