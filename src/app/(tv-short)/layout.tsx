import BottomNav from "@/components/web/bottom-nav"
import SideNav from "@/components/web/side-nav"

export default function Layout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
        <div className="flex flex-col md:flex-row">
            <div className="hidden md:block">
              <SideNav/>
            </div>
            <div className="flex-1">
                {children}
            </div>
            <div className="block md:hidden">
              <BottomNav/>
            </div>
        </div>
    )
}
