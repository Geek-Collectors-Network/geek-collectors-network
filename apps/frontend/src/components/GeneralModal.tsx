import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';

type ModalProps = {
    onClose: () => void;
    isOpen: boolean;
    headerContent: React.ReactNode;
    bodyContent: React.ReactNode;
    footerContent: React.ReactNode;
}

function GeneralModal({ onClose, isOpen, headerContent, bodyContent, footerContent } : ModalProps) {
  return (

    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent maxWidth={{ base: '90%', sm: '80%', md: '70%', lg: '50%', xl: '40%' }}>

        <ModalHeader>{headerContent}</ModalHeader>
        <ModalCloseButton />

        <ModalBody>{bodyContent}</ModalBody>

        <ModalFooter>{footerContent}</ModalFooter>

      </ModalContent>
    </Modal>

  );
}

export default GeneralModal;
