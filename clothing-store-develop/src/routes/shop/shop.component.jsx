import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { fetchCategories } from '../../store/category.reducer';
import CategoryListPage from '../category-list-page/category-list-page.component';
import Category from '../category/category.component';

import './shop.styles.scss';
import UserProfile from '../user-profile/user-profile.component';

const Shop = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    let isApiSubscribed = true;

    if (isApiSubscribed) {
      dispatch(fetchCategories());
    }

    return () => {
      isApiSubscribed = false;
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Routes>
      <Route index element={<CategoryListPage />} />
      <Route path=':category' element={<Category />} />
      <Route path=':user-profile' element={<UserProfile/>}/>
    </Routes>
  );
}

export default Shop;
