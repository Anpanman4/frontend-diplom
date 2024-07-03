import React, { FC } from 'react';
import './private-admin.scss';

import { Navigate } from 'react-router-dom';

import Goods from './goods/goods';
import { ProductType, UserType } from '../../http/types';
import { NavigationTab } from '../theme/navigation-tab/navigation-tab';

export type PrivateAdminProps = {
  user: UserType | null;
  products?: ProductType[];
};

const PrivateAdmin: FC<PrivateAdminProps> = ({ user, products }) => {
  if (!localStorage.getItem('hairgrad-JWT')) return <Navigate to="/sign-in" />;

  return (
    <section className="private-admin">
      <NavigationTab
        items={[
          { label: 'Товары', body: <Goods user={user} products={products} /> },
          { label: 'Товары1s', body: '1s' }
        ]}
      />
    </section>
  );
};

export default PrivateAdmin;
