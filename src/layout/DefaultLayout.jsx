import { Outlet } from 'react-router-dom';
import { AppNavbar } from '../components/index';
const DefaultLayout = () => {
    return (
        <div className="wrapper">
            <AppNavbar />
            <Outlet />
        </div>
    );
};
export default DefaultLayout;