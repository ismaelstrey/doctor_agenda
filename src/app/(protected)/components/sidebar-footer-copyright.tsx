export default function SidebarFooterCopyright({children}:{children: React.ReactNode}) {
    return (
        <div className="sidebar-footer">
            <div className="sidebar-footer-content">
                <div className="sidebar-footer-copyright">
          {children}
            </div>
        </div>  
    </div>
    )
}