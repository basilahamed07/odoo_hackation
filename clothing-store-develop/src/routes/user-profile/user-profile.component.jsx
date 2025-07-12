import { useDispatch, useSelector } from 'react-redux';


const UserProfile = () => {
  const currentUser = useSelector((state) => state.user.currentUser);

  return (
    <div className='login-wrapper container'>
User Profile
    </div>)




}

export default UserProfile;