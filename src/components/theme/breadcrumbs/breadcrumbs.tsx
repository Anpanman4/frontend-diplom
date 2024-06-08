import React, { Fragment, memo } from 'react';
import './breadcrumbs.scss';

import { Link } from 'react-router-dom';

import ArrowIcon from '../../../images/svg/arrow-left.svg';

export type BreadCrumbsProps = { items?: { label: string; link: string }[] };

export const BreadCrumbs = memo<BreadCrumbsProps>(({ items }) => {
  return (
    <nav className="breadcrumbs">
      {items?.map((item, index) => {
        return (
          <Fragment key={index}>
            <Link className="breadcrumbs__link" to={item.link}>
              {item.label}
            </Link>
            {items?.length - 1 > index && (
              <img className="breadcrumbs__arrow" src={ArrowIcon} alt="" />
            )}
          </Fragment>
        );
      })}
    </nav>
  );
});
