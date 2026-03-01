import { Outlet } from 'react-router';
import Aside from '../components/Aside/Aside';

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen" style={{ backgroundColor: 'var(--bg-subtle)' }}>
      <Aside />
      <div className="flex-1 p-6 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;