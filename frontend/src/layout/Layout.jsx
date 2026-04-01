import App from '../App';
import { Outlet } from 'react-router-dom';


const Layout = () => (
  <App>
    <Outlet />
  </App>
);


export default Layout;