import React from 'react';
import ReactDOM from 'react-dom';
import { Modal, ModalOverlay, ModalButton, ModalHeader, ModalWrapper } from './styled';

export default ({ isShowing, hide, children, title }) =>
  isShowing
    ? ReactDOM.createPortal(
        <>
          <ModalOverlay />
          <ModalWrapper aria-modal aria-hidden tabIndex={-1} role="dialog">
            <Modal>
              <ModalHeader>
                <h1>{title}</h1>
                <ModalButton type="button" onClick={hide}>
                  <span aria-hidden="true">&times;</span>
                </ModalButton>
              </ModalHeader>
              {children}
            </Modal>
          </ModalWrapper>
        </>,
        document.body,
      )
    : null;
