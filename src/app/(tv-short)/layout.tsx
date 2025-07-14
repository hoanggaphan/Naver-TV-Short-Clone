import SideNav from "@/components/web/side-nav"

export default function Layout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
        <div className="flex">
            <SideNav/>
            <div className="flex-1">
                {children}
            </div>
        </div>
    )
}
