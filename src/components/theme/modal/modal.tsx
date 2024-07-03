import React, { ReactNode } from 'react';

import './modal.scss';
import classNames from 'classnames';

export type ModalProps = {
  visible: boolean;
  onClose: () => void;
  children?: ReactNode;
  className?: string;
};

export const Modal = ({
  visible,
  onClose,
  children,
  className
}: ModalProps) => {
  return (
    <>
      {visible && (
        <div className="hg-modal" onClick={onClose}>
          <div
            className={classNames('hg-modal__container', className)}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {children}
          </div>
        </div>
      )}
    </>
  );
};
