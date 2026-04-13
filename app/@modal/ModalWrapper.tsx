'use client';

import { ReactNode } from 'react';
import css from './ModalWrapper.module.css';

interface ModalWrapperProps {
  children: ReactNode;
  onClose: () => void;
}

export default function ModalWrapper({ children, onClose }: ModalWrapperProps) {
  return (
    <div className={css.backdrop} onClick={onClose}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}