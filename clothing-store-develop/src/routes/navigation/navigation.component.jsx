import { Outlet, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import CartIcon from './../../components/cart/cart-icon.component.jsx';
import Minicart from '../../components/cart/minicart.component.jsx';
import { logOutUser } from '../../utils/firebase/firebase.utils';
import Logo from "../../assets/crown.svg";
import './navigation.styles.scss';
import FooterComponent from '../../components/footer/footer.component.jsx';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from "../../store/user.reducer.js"; // adjust path as needed

const Navigation = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();
    const dispatch = useDispatch();
const logOutUserfromsession = () =>{
          dispatch(setCurrentUser('logged-out'));

navigate("/")


};

const userdashboard = () =>{
navigate("/user-profile")


}
  return (
    <>
      <div className='navigation'>
        <div className='navigation-content'>
          <Link className='logo-container' to={'/'}>
            <img src={Logo} alt='' className=''/>
          </Link>
          <div className='nav-links-container'>
            {/* <Link className='nav-link' to={'/shop'}>Shop All</Link> */}
            {
              currentUser === 'logged-out' && <Link className='nav-link' to={'/login'}>Login</Link>
            }
            {
              (currentUser !== null && currentUser !== 'logged-out') && (<>
                                <span  className='nav-link' onClick={userdashboard}>Profile</span>

                <span onClick={logOutUserfromsession} className='nav-link'>Logout</span>
                </>
              )
            }
            <CartIcon />
          </div>
          <Minicart />
        </div>
      </div>
      <Outlet />
      <FooterComponent />
    </>
  );
};

export default Navigation;