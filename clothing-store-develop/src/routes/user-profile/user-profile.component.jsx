import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { setCurrentUser } from '../../store/user.reducer'; // adjust path if needed
import './user-profile.styles.scss';

const UserProfile = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  const [user, setUser] = useState(null);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Load user details from localStorage
  useEffect(() => {
    const allUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
    if (currentUser && typeof currentUser === 'object') {
      const matchedUser = allUsers.find((u) => u.email === currentUser.email);
      if (matchedUser) {
        setUser(matchedUser);
      }
    } else if (currentUser === 'logged-in') {
      const savedUser = JSON.parse(localStorage.getItem('currentUser'));
      if (savedUser) {
        setUser(savedUser);
        dispatch(setCurrentUser(savedUser));
      }
    }
  }, [currentUser, dispatch]);

  const handlePasswordChange = () => {
    if (!newPassword || newPassword.length < 6) {
      alert('Password must be at least 6 characters.');
      return;
    }

    if (newPassword !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    const users = JSON.parse(localStorage.getItem('registeredUsers')) || [];
    const updatedUsers = users.map((u) =>
      u.email === user.email ? { ...u, password: newPassword } : u
    );

    const updatedUser = { ...user, password: newPassword };

    localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    dispatch(setCurrentUser(updatedUser));
    setUser(updatedUser);

    setNewPassword('');
    setConfirmPassword('');

    alert('Password updated successfully!');
  };

  if (!user) {
    return <p className='container'>No user is currently logged in.</p>;
  }
  return (
    <div className='login-wrapper container'>
      <div className='profile-content'>
        {/* Left Side: User Info */}
        <div className='user-details'>
          <div className='detail-row'>
            <span className='label'>Name:</span>
            <span className='value'>{user.displayName || 'N/A'}</span>
          </div>
          <div className='detail-row'>
            <span className='label'>Email:</span>
            <span className='value'>{user.email}</span>
          </div>
        </div>
  
        {/* Right Side: Password Change Form */}
        <div className='change-password'>
          <h4>Change Password</h4>
          <input
            type='password'
            placeholder='Enter new password'
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
            type='password'
            placeholder='Confirm new password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button onClick={handlePasswordChange}>
            Update Password
          </button>
        </div>
      </div>
    </div>
  );
  
  
};

export default UserProfile;
