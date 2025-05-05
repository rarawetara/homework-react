import React, { useRef, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { UserInput } from '../types/User';
import UserForm from './UserForm';

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (user: UserInput) => void;
} 

const AddUserModal: React.FC<AddUserModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mouseup', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mouseup', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <ModalBackdrop 
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <ModalContent 
        ref={modalRef}
        role="document"
        tabIndex={-1}
      >
        <ModalHeader>
          <h2 id="modal-title">Add New User</h2>
          <CloseButton 
            onClick={onClose}
            aria-label="Close modal"
          >
            &times;
          </CloseButton>
        </ModalHeader>
        <UserForm onSubmit={onSubmit} onCancel={onClose} />
      </ModalContent>
    </ModalBackdrop>
  );
};

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideIn = keyframes`
  from {
    transform: translateY(-30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: ${fadeIn} 0.3s ease;
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  padding: 1.5rem;
  animation: ${slideIn} 0.3s ease;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #eee;

  h2 {
    margin: 0;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #999;
  
  &:hover {
    color: var(--danger-color);
  }
`;

export default AddUserModal; 