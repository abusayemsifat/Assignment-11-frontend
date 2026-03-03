import React, { useState } from 'react';
import { Outlet } from 'react-router';
import Aside from '../components/Aside/Aside';

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

            {/* Sidebar - desktop always visible, mobile slides in */}
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
                    padding: '14px 16px',
                    backgroundColor: 'var(--bg-subtle)',
                    borderBottom: '1px solid var(--border)',
                    position: 'sticky', top: 0, zIndex: 30,
                }}>
                    <button
                        onClick={() => setSidebarOpen(true)}
                        style={{
                            width: 40, height: 40, display: 'flex', alignItems: 'center',
                            justifyContent: 'center', border: 'none', borderRadius: 10,
                            backgroundColor: 'var(--bg-base)', cursor: 'pointer',
                            color: 'var(--text-primary)', flexShrink: 0,
                        }}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <line x1="3" y1="6" x2="21" y2="6" />
                            <line x1="3" y1="12" x2="21" y2="12" />
                            <line x1="3" y1="18" x2="21" y2="18" />
                        </svg>
                    </button>
                    <span style={{
                        fontFamily: "'Sora', sans-serif",
                        fontWeight: 800, fontSize: 18,
                        background: 'linear-gradient(135deg,#C00707,#FF4400)',
                        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                    }}>
                        🩸 BloodLink
                    </span>
                </header>

                <div style={{ padding: '28px 24px', flex: 1 }} className="dash-content-pad">
                    <Outlet />
                </div>
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