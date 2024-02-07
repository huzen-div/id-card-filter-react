import { Outlet } from 'react-router-dom';
const UsersLayout = () => {
    return (
        <div className="wrapper">
            Users Layout
            <Outlet />
        </div>
    );
};
export default UsersLayout;