import React, { useState } from 'react';
import { Outlet, Link } from 'react-router';
import Aside from '../components/Aside/Aside';
import RouteTransition from '../components/RouteTransition/RouteTransition';

const DashboardLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--bg-base)', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

            {/* Mobile overlay */}
            {sidebarOpen && (
                <div
                    onClick={() => setSidebarOpen(false)}
                    style={{
                        position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)',
                        zIndex: 40,
                    }}
                />
            )}

            {/* Desktop sidebar - always visible */}
            <aside style={{
                width: 260, flexShrink: 0,
                position: 'sticky', top: 0,
                height: '100vh',
            }} className="dash-sidebar-wrap">
                <Aside />
            </aside>

            {/* Mobile drawer sidebar */}
            <aside
                className="dash-sidebar-mobile"
                style={{
                    position: 'fixed', top: 0, left: sidebarOpen ? 0 : '-280px',
                    width: 260, height: '100vh', zIndex: 50,
                    transition: 'left 0.28s cubic-bezier(.4,0,.2,1)',
                }}
            >
                <Aside onClose={() => setSidebarOpen(false)} />
            </aside>

            {/* Main content */}
            <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>

                {/* Mobile top bar */}
                <header className="dash-topbar" style={{
                    alignItems: 'center', gap: 12,
                    padding: '12px 16px',
                    backgroundColor: 'var(--bg-subtle)',
                    borderBottom: '1px solid var(--border)',
                    position: 'sticky', top: 0, zIndex: 30,
                }}>
                    {/* Hamburger */}
                    <button
                        onClick={() => setSidebarOpen(true)}
                        style={{
                            width: 38, height: 38, display: 'flex', alignItems: 'center',
                            justifyContent: 'center', border: 'none', borderRadius: 10,
                            backgroundColor: 'var(--bg-base)', cursor: 'pointer',
                            color: 'var(--text-primary)', flexShrink: 0,
                        }}
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <line x1="3" y1="6" x2="21" y2="6" />
                            <line x1="3" y1="12" x2="21" y2="12" />
                            <line x1="3" y1="18" x2="21" y2="18" />
                        </svg>
                    </button>
                    {/* Logo */}
                    <div style={{
                        fontFamily: "Inter, system-ui, -apple-system, sans-serif",
                        fontWeight: 800, fontSize: 17,
                        display: 'flex', alignItems: 'baseline', flex: 1,
                    }}>
                        <span style={{ marginRight: 6 }}>🩸</span>
                        <span style={{ color: '#C00707' }}>BLOOD</span>
                        <span style={{ color: 'var(--brand-amber, #FFB33F)' }}>+</span>
                    </div>
                    {/* Home button - mobile */}
                    <Link to="/" style={{
                        width: 38, height: 38, display: 'flex', alignItems: 'center',
                        justifyContent: 'center', borderRadius: 10, flexShrink: 0,
                        backgroundColor: 'var(--bg-base)', border: '1px solid var(--border)',
                        color: 'var(--text-muted)', textDecoration: 'none',
                    }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                            <polyline points="9 22 9 12 15 12 15 22" />
                        </svg>
                    </Link>
                </header>

                <RouteTransition>
                    <div style={{ padding: '28px 24px', flex: 1 }} className="dash-content-pad">
                        <Outlet />
                    </div>
                </RouteTransition>
            </div>

            <style>{`
                .dash-sidebar-mobile { display: none !important; }
                @media (max-width: 768px) {
                    .dash-sidebar-wrap { display: none !important; }
                    .dash-sidebar-mobile { display: block !important; }
                    .dash-topbar { display: flex !important; }
                    .dash-content-pad { padding: 20px 14px !important; }
                }
                @media (min-width: 769px) {
                    .dash-topbar { display: none !important; }
                }
            `}</style>
        </div>
    );
};

export default DashboardLayout;