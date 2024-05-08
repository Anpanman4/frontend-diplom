import React, { FC } from 'react';
import './main.scss';

import { Link, useNavigate } from 'react-router-dom';

import { Option } from './option/option';
import { ProductCountType, ProductType } from '../../http/types';
import { Button } from '../theme/button/button';
import ProductCard from '../theme/product-card/product-card';
import { Text } from '../theme/text/text';
import { Title } from '../theme/title/title';

export type MainProps = {
  products?: ProductType[];
  basketProducts?: ProductCountType[];
  addToBasket: (product: ProductType) => void;
  reduceFromBasket: (product: ProductType, count: number) => void;
};

const Main: FC<MainProps> = ({
  products,
  basketProducts,
  addToBasket,
  reduceFromBasket
}) => {
  const navigate = useNavigate();
  return (
    <div className="main">
      <section className="main__image-container">
        <div className="main__head">
          <Title className="main__title" level={1}>
            Подбери свой стайлинговый коктейль с HairGrad
          </Title>
          <Button className="main__button" onClick={() => navigate('/catalog')}>
            В каталог
          </Button>
        </div>
      </section>
      <section className="main__populare-container">
        <div className="main__up-container">
          <Title level={1}>Популярные товары</Title>
          <Link to="/catalog" className="main__link">
            В каталог
          </Link>
        </div>
        <div className="main__products">
          {products?.slice(0, 3).map((product) => {
            const currentCount = basketProducts
              ? basketProducts.find(
                  (basketProduct) => basketProduct._id === product._id
                )
              : undefined;
            return (
              <ProductCard
                key={product._id}
                id={product._id}
                title={product.title}
                price={product.price ? product.price : '600'}
                img={product.image}
                count={currentCount?.count}
                addToBasket={() => addToBasket(product)}
                reduceFromBasket={() =>
                  reduceFromBasket(product, currentCount?.count ?? 0)
                }
              />
            );
          })}
        </div>
      </section>
      <section className="main__system">
        <div className="main__system-container">
          <Title className="main__system-title" level={1}>
            Система HairGrad
          </Title>
          <Text className="main__system-text" level={2}>
            — подбор индивидуальной комбинации лучших стайлинговых продуктов для
            волос
          </Text>
          <div className="main__options">
            <Option
              title="Правильный продукт"
              color="var(--color-dark-blue)"
              width="303px"
            />
            <Title className="main__options-title" level={3}>
              5 одинаково важных этапов
            </Title>
            <Option
              title="Правильное место"
              color="var(--color-orange)"
              width="303px"
            />
            <Option
              title="Правильное количество"
              color="var(--color-blue)"
              width="400px"
            />
            <Option
              title="Правильный настрой"
              color="var(--color-light-blue)"
              width="326px"
            />
            <Option
              title="Правильная техника"
              color="var(--color-yellow)"
              width="400px"
            />
          </div>
          <div className="main__links">
            <div className="main__link-about">
              <Title level={3}>Косметика</Title>
              <div className="main__links-container">
                <Text className="main__links-text" level={4}>
                  Косметика, созданная мастерами для мастеров.
                </Text>
                <Button
                  className="main__links-button"
                  onClick={() => navigate('/catalog')}
                >
                  В каталог
                </Button>
              </div>
            </div>
            <div className="main__link-about">
              <Title level={3}>Обучение</Title>
              <div className="main__links-container">
                <Text className="main__links-text" level={4}>
                  Авторский курс, формирующий важнейшие навыки мастера.
                </Text>
                <Button
                  className="main__links-button"
                  onClick={() => navigate('/catalog')}
                >
                  К обучению
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Main;
