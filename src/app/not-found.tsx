import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Logo from '@/components/web/logo'
import { Ghost } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center gap-6 text-center">
      <Logo />
      <div className="flex flex-col items-center gap-2">
        <Ghost className="size-16 text-muted-foreground animate-bounce" />
        <h2 className="text-4xl font-bold tracking-tight">404 - Không tìm thấy trang</h2>
        <p className="text-muted-foreground text-lg max-w-[500px]">Xin lỗi, chúng tôi không thể tìm thấy nội dung bạn yêu cầu.<br/>Hãy kiểm tra lại đường dẫn hoặc quay về trang chủ.</p>
      </div>
      <Button asChild className="mt-4">
        <Link href="/">Quay về trang chủ</Link>
      </Button>
    </div>
  )
}