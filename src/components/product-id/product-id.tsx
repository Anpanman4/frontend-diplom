import React, { FC, useEffect, useState } from 'react';
import './product-id.scss';

import { useLocation, useNavigate } from 'react-router-dom';

import api from '../../http/api';
import { ProductCountType, ProductType } from '../../http/types';
import Product1 from '../../images/product1.png';
import Product2 from '../../images/product2.png';
import Product3 from '../../images/product3.png';
import Product4 from '../../images/product4.png';
import Result1 from '../../images/result1.png';
import Result4 from '../../images/result2.png';
import Result2 from '../../images/result3.png';
import Result5 from '../../images/result4.png';
import Result3 from '../../images/result5.png';
import BackArrowIcon from '../../images/svg/arrow-long-left.svg';
import { Button } from '../theme/button/button';
import ProductCard from '../theme/product-card/product-card';
import { Text } from '../theme/text/text';
import { Title } from '../theme/title/title';

export type ProductIdProps = {
  products: ProductType[] | undefined;
  basketProducts: ProductCountType[] | undefined;
  addToBasket: (product: ProductType) => void;
  reduceFromBasket: (product: ProductType, count: number) => void;
  setBreadCrumbsProduct: (data: { label: string; link: string }) => void;
};

const ProductId: FC<ProductIdProps> = ({
  products,
  basketProducts,
  addToBasket,
  reduceFromBasket,
  setBreadCrumbsProduct
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [productData, setProductData] = useState<ProductType | null>(null);

  useEffect(() => {
    const id = location.pathname.split('/')[2];
    if (!id) return;
    api.getProductById(id).then((data) => setProductData(data));
  }, []);

  return (
    <div className="product-id">
      <div
        className="product-id__back-container"
        onClick={() => navigate('/catalog')}
      >
        <img src={BackArrowIcon} alt="" />
        <Text level={5} color="gray-1">
          Назад к каталогу
        </Text>
      </div>
      <div className="product-id__container">
        <img
          className="product-id__image"
          src={`http://localhost:8000/${productData?.image}`}
          alt={productData?.title}
        />
        <div className="product-id__info-container">
          <Title level={1}>{productData?.title}</Title>
          <Text className="product-id__about" level={4} color="gray-1">
            {productData?.about}
          </Text>
          <Text className="product-id__size" level={4} color="gray-1">
            {productData?.volume} мл
          </Text>
          <Title
            className="product-id__price"
            level={2}
          >{`${productData?.price} ₽`}</Title>
          <ul className="product-id__items">
            <li className="product-id__item">
              Аромат:
              <Text level={4} color="black">
                {` ${productData?.smell.join(', ')}`}
              </Text>
            </li>
            <li className="product-id__item">
              Тип волос:
              <Text level={4} color="black">
                {` ${productData?.hairType.join(', ')}`}
              </Text>
            </li>
            <li className="product-id__item-degree">
              Степень фиксации
              <div className="product-id__degrees">
                {['', '', '', '', ''].map((value, index) => (
                  <div
                    key={index}
                    className={`product-id__degree ${(productData?.fixationDegree ?? 0) > index ? 'product-id__degree--active' : ''}`}
                  ></div>
                ))}
              </div>
            </li>
          </ul>
          <Button
            className="product-id__button"
            onClick={() => {
              if (!productData) return;
              setBreadCrumbsProduct({
                label: productData?.title,
                link: productData?._id
              });
              navigate('/basket');
            }}
          >
            В корзину
          </Button>
        </div>
      </div>
      <ul className="product-id__features">
        <li className="product-id__feature">
          <img
            className="product-id__feature-image"
            src={Product1}
            alt="Кристаллы"
            loading="lazy"
          />
          <Text level={3}>
            Содержит кристаллы минеральной соли, которые фиксируют пряди без
            эффекта склеивания
          </Text>
        </li>
        <li className="product-id__feature">
          <img
            className="product-id__feature-image"
            src={Product2}
            alt="Кристаллы"
            loading="lazy"
          />
          <Text level={3}>Отлично работает как престайлинг</Text>
        </li>
        <li className="product-id__feature">
          <img
            className="product-id__feature-image"
            src={Product3}
            alt="Кристаллы"
            loading="lazy"
          />
          <Text level={3}>
            Имеет мягкие антистатические и кондиционирующие свойства
          </Text>
        </li>
        <li className="product-id__feature">
          <img
            className="product-id__feature-image"
            src={Product4}
            alt="Кристаллы"
            loading="lazy"
          />
          <Text level={3}>Содержит жирные кислоты из кокосового масла</Text>
        </li>
      </ul>
      <div className="product-id__methods-container">
        <div>
          <Title level={1}>Способ применения</Title>
          <ul className="product-id__methods">
            <li className="product-id__method">
              <Text level={3}>1.</Text>
              <Text level={3}>
                Распылите его на сухие или влажные волосы с расстояния 20-30 см.
              </Text>
            </li>
            <li className="product-id__method">
              <Text level={3}>2.</Text>
              <Text level={3}>
                Разделите пряди пальцами, чтобы создать волнистые локоны.
              </Text>
            </li>
            <li className="product-id__method">
              <Text level={3}>3.</Text>
              <Text level={3}>
                Придайте волосам нужную форму своими руками.
              </Text>
            </li>
            <li className="product-id__method">
              <Text level={3}>4.</Text>
              <Text level={3}>
                Высушите волосы феном или дайте им высохнуть естественным путем.
              </Text>
            </li>
          </ul>
        </div>
        <iframe
          width="620"
          height="375"
          src="https://www.youtube.com/embed/KKhB_QJ1eeI"
          title="Как отрастить длинные волосы мужчине | Длинные волосы у мужчин | ЯБородач (12+)"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
      <div className="product-id__results">
        <Title level={1}>Результат</Title>
        <div className="product-id__photos">
          <img
            className="product-id__photo1"
            src={Result1}
            alt=""
            loading="lazy"
          />
          <img
            className="product-id__photo2"
            src={Result2}
            alt=""
            loading="lazy"
          />
          <img
            className="product-id__photo3"
            src={Result3}
            alt=""
            loading="lazy"
          />
          <img
            className="product-id__photo4"
            src={Result4}
            alt=""
            loading="lazy"
          />
          <img
            className="product-id__photo5"
            src={Result5}
            alt=""
            loading="lazy"
          />
        </div>
      </div>
      <div className="product-id__more">
        <Title level={1}>Товары в комплекте</Title>
        <div className="product-id__products">
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
      </div>
    </div>
  );
};

export default ProductId;
