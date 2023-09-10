import './Dashboard.scss';
import { Outlet } from 'react-router-dom';
import DashboardNavbar from './layout/DashboardNavbar';
import PhoneMockup from '../../components/PhoneMockup';

function Dashboard() {
  return (
    <section className="dashboard">
      <div className="container">
        <DashboardNavbar />
        <section className="dashboard-section">
          <aside className="dashboard-aside__left">
            <PhoneMockup />
          </aside>

          <aside className="dashboard-sub-page__right">
            <Outlet />
          </aside>
        </section>
      </div>
    </section>
  );
}

export default Dashboard;
