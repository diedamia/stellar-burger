import React, { FC } from 'react';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from '../../../services/store';
import { selectUserData } from '../../../services/slices/user-slice';

export const AppHeader: FC = () => {
  const location = useLocation();
  const user = useSelector(selectUserData);

  return (
    <AppHeaderUI
      userName={user?.name || ''}
      location={location.pathname}
    />
  );
};

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName, location }) => {
  const isConstructorActive = location === '/' || location.startsWith('/ingredients/');
  const isFeedActive = location === '/feed' || location.startsWith('/feed/');
  const isProfileActive = location === '/profile' || location.startsWith('/profile/');

  return (
  <header className={styles.header}>
    <nav className={`${styles.menu} p-4`}>
      <div className={styles.menu_part_left}>
          <Link to='/' className={styles.link}>
            <BurgerIcon type={isConstructorActive ? 'primary' : 'secondary'} />
            <p className={`text text_type_main-default ml-2 mr-10 ${isConstructorActive ? styles.active : ''}`}>
              Конструктор
            </p>
          </Link>
          <Link to='/feed' className={styles.link}>
            <ListIcon type={isFeedActive ? 'primary' : 'secondary'} />
            <p className={`text text_type_main-default ml-2 ${isFeedActive ? styles.active : ''}`}>
              Лента заказов
            </p>
          </Link>
      </div>
      <div className={styles.logo}>
          <Link to='/'>
        <Logo className='' />
          </Link>
      </div>
      <div className={styles.link_position_last}>
          <Link to='/profile' className={styles.link}>
            <ProfileIcon type={isProfileActive ? 'primary' : 'secondary'} />
            <p className={`text text_type_main-default ml-2 ${isProfileActive ? styles.active : ''}`}>
          {userName || 'Личный кабинет'}
        </p>
          </Link>
      </div>
    </nav>
  </header>
);
};
