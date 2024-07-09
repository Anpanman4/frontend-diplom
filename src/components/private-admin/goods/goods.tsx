import React, { FC, useMemo, useState } from 'react';
import './goods.scss';

import { Navigate } from 'react-router-dom';

import api from '../../../http/api';
import { ProductType, UserType } from '../../../http/types';
import CrossIcon from '../../../images/svg/cross.svg';
import logoutIcon from '../../../images/svg/logout.svg';
import searchIcon from '../../../images/svg/search.svg';
import { Button } from '../../theme/button/button';
import Input from '../../theme/input/input';
import { Modal } from '../../theme/modal/modal';
import { Switcher } from '../../theme/switcher/switcher';
import { Table } from '../../theme/table/table';
import { Text } from '../../theme/text/text';
import { Title } from '../../theme/title/title';

export type GoodsProps = {
  user: UserType | null;
  products?: ProductType[];
  refetchProducts: () => void;
};

const Goods: FC<GoodsProps> = ({ user, products = [], refetchProducts }) => {
  const [searchInput, setSearchInput] = useState('');
  const [currentRow, setCurrentRow] = useState<ProductType | undefined>(
    undefined
  );
  const [isCreatedVersion, setIsCreatedVersion] = useState(false);
  const [newImage, setNewImage] = useState('');
  const [imageFile, setImageFile] = useState<File | undefined>(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const logout = () => {
    localStorage.clear();
    <Navigate to="/" replace={true} />;
    window.location.reload();
  };

  const productsForTable = useMemo(
    () =>
      products.map((value) => {
        return { ...value, delete: '' };
      }),
    [products]
  );

  const productsSearch = productsForTable.filter((value) =>
    value.title.toLowerCase().includes(searchInput)
  );

  const fileHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event?.target?.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setNewImage(reader.result ?? '');
      }
    };
    setImageFile(file);
  };

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
        <Button
          variant="light-blue"
          onClick={() => {
            setIsCreatedVersion(true);
            setCurrentRow({
              _id: '',
              about: '',
              fixationDegree: 0,
              hairType: [],
              image: '',
              isVisible: false,
              price: '',
              smell: [],
              title: '',
              volume: 0
            });
            setIsModalOpen(true);
          }}
        >
          Добавить товар
        </Button>
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
            title: 'Видимость',
            key: 'isVisible',
            render: (data) => (
              <Switcher
                checked={data.isVisible}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  api
                    .updateProductVisibility(data._id, !data.isVisible)
                    .then(() => refetchProducts());
                }}
              />
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
        data={productsSearch}
        onRowClick={(data) => {
          setIsCreatedVersion(false);
          setCurrentRow(data);
          setIsModalOpen(true);
        }}
      />
      {currentRow && (
        <Modal
          className="goods__modal"
          visible={isModalOpen}
          onClose={() => {
            setNewImage('');
            setIsModalOpen(false);
          }}
        >
          <>
            <Input
              value={currentRow.title}
              onChange={(value) =>
                setCurrentRow({ ...currentRow, title: value })
              }
              label="Название товара"
              maxWidth="none"
            />
            <Input
              value={currentRow.price}
              onChange={(value) =>
                setCurrentRow({ ...currentRow, price: value })
              }
              label="Цена"
              type="number"
              maxWidth="300px"
            />
            <Input
              value={currentRow.volume}
              onChange={(value) =>
                setCurrentRow({ ...currentRow, volume: Number(value) })
              }
              label="Объем (мл)"
              type="number"
              maxWidth="300px"
            />
            <div className="goods__modal-image-container">
              {(newImage || currentRow.image) && (
                <img
                  className="goods__modal-image"
                  src={
                    newImage
                      ? newImage
                      : `${process.env.REACT_APP_BACKEND_URL}/${currentRow.image}`
                  }
                  alt=""
                />
              )}
              <input type="file" accept="image/*" onChange={fileHandler} />
            </div>
            <Input
              value={currentRow.about}
              onChange={(value) =>
                setCurrentRow({ ...currentRow, about: value })
              }
              label="Описание"
              maxWidth="none"
            />
          </>
          <div className="goods__modal-degree-container">
            Степень фиксации
            <div className="goods__modal-degrees-container">
              {['', '', '', '', ''].map((value, index) => (
                <div
                  key={index}
                  className={`goods__modal-degree ${(currentRow?.fixationDegree ?? 0) > index ? 'goods__modal-degree--active' : ''}`}
                  onClick={() =>
                    setCurrentRow({ ...currentRow, fixationDegree: index + 1 })
                  }
                ></div>
              ))}
            </div>
            <img
              className="goods__modal-cross"
              src={CrossIcon}
              alt="cross"
              onClick={() =>
                setCurrentRow({ ...currentRow, fixationDegree: 0 })
              }
            />
          </div>
          <Input
            value={currentRow.hairType.join(', ')}
            onChange={(value) =>
              setCurrentRow({ ...currentRow, hairType: value.split(', ') })
            }
            label="Тип волос (с маленькой через запятую)"
            maxWidth="none"
          />
          <Input
            value={currentRow.smell.join(', ')}
            onChange={(value) =>
              setCurrentRow({ ...currentRow, smell: value.split(', ') })
            }
            label="Аромат (с маленькой через запятую)"
            maxWidth="none"
          />
          <div className="goods__modal-controls">
            {isCreatedVersion ? (
              <>
                <Button
                  className="goods__modal-button"
                  variant="light-blue"
                  onClick={() => {
                    if (!imageFile) return;
                    api
                      .createProduct({ ...currentRow, image: imageFile })
                      .then(() => refetchProducts());
                  }}
                >
                  <Text level={4}>Добавить</Text>
                </Button>
                <Button
                  className="goods__modal-button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setNewImage('');
                  }}
                >
                  <Text level={4}>Закрыть</Text>
                </Button>
              </>
            ) : (
              <>
                <Button className="goods__modal-button" variant="red">
                  <Text level={4}>Удалить</Text>
                </Button>
                <Button className="goods__modal-button">
                  <Text level={4}>Сохранить</Text>
                </Button>
              </>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Goods;
