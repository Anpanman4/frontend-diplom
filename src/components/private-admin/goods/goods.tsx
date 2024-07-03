import React, { FC, useState } from 'react';
import './goods.scss';

import { Navigate } from 'react-router-dom';

import { ProductType, UserType } from '../../../http/types';
import CrossIcon from '../../../images/svg/cross.svg';
import logoutIcon from '../../../images/svg/logout.svg';
import searchIcon from '../../../images/svg/search.svg';
import { Button } from '../../theme/button/button';
import { CheckBox } from '../../theme/checkbox/checkbox';
import Input from '../../theme/input/input';
import { Table } from '../../theme/table/table';
import { Text } from '../../theme/text/text';
import { Title } from '../../theme/title/title';

export type GoodsProps = {
  user: UserType | null;
  products?: ProductType[];
};

const Goods: FC<GoodsProps> = ({ user, products = [] }) => {
  const [searchInput, setSearchInput] = useState('');

  const logout = () => {
    localStorage.clear();
    <Navigate to="/" replace={true} />;
    window.location.reload();
  };

  const productsForTable = products.map((value) => {
    return { ...value, delete: '' };
  });

  return (
    <div className="goods">
      <div className="goods__controls-container">
        <Title level={2}>Товары</Title>
        <div className="goods__info">
          <Title level={4}>{user?.firstName}, админ</Title>
          <Text
            className="goods__logout"
            level={4}
            onClick={() => {
              logout();
            }}
          >
            <img src={logoutIcon} /> Выйти из аккаунта
          </Text>
        </div>
        <Input
          value={searchInput}
          onChange={setSearchInput}
          icon={<img src={searchIcon} alt="" />}
          placeholder="Поиск"
          maxWidth="840px"
        />
        <Button variant="light-blue">Добавить товар</Button>
      </div>
      <Table
        columns={[
          {
            title: 'Фото',
            key: 'image',
            render: (row) => (
              <img
                className="goods__img-table"
                src={`${process.env.REACT_APP_BACKEND_URL || ''}/${row.image}`}
                alt={row.title}
              />
            ),
            maxWidth: 110
          },
          { title: 'Название', key: 'title', position: 'left' },
          { title: 'Цена', key: 'price', maxWidth: 140 },
          {
            title: 'Наличие',
            key: 'isVisible',
            render: (data) => (
              <CheckBox checked={data.isVisible} onChange={() => ''} />
            ),
            maxWidth: 140
          },
          {
            title: 'Удалить',
            key: 'delete',
            render: (data) => (
              <img
                className="goods__cross-icon"
                src={CrossIcon}
                alt="Удаление"
              />
            ),
            maxWidth: 140
          }
        ]}
        data={productsForTable}
      />
    </div>
  );
};

export default Goods;
