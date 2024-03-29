import React, { useState } from 'react';
import {
  HStack,
  VStack,
  Text,
  Card,
  CardBody,
  Stack,
  AspectRatio,
  Image,
  Divider,
  Tag,
  Wrap,
  WrapItem,
  Button,
  Link,
} from '@chakra-ui/react';

import GeneralModal from './GeneralModal';
import { ExternalLinkIcon } from '@chakra-ui/icons';


type ItemModalHeaderProps = {
    itemName: string;
}

function ItemModalHeader({ itemName }: ItemModalHeaderProps) {
  return (
    <HStack w={'100%'} justify={'center'}>
      <Text fontSize={'xl'}>{itemName}</Text>
    </HStack>
  );
}


type ItemModalBodyProps = {
    itemName: string;
    itemImage: string;
    itemDescription: string;
    itemURL: string;
    itemTags: string[];
}

function ItemModalBody({ itemName, itemImage, itemDescription, itemURL, itemTags }: ItemModalBodyProps) {
  return (
    <VStack>
      <Card>
        <CardBody>
          <Stack spacing={4}>

            <AspectRatio ratio={ 16 / 9 }>
              <Image src={itemImage || 'https://via.placeholder.com/150'} objectFit={'cover'} borderRadius={5}/>
            </AspectRatio>

            <Text>{itemDescription}</Text>

            <Divider />

            <Link href={itemURL} isExternal>
                Go to the product page for {itemName} <ExternalLinkIcon mx="2px" />
            </Link>

            <Divider />

            <Wrap spacing={0}>
              {itemTags.map(tag => (
                <WrapItem key={tag}>
                  <Tag size="md" m={1} backgroundColor={'brand.100'} borderRadius="15px">
                    {tag}
                  </Tag>
                </WrapItem>
              ))}
            </Wrap>

          </Stack>
        </CardBody>
      </Card>
    </VStack>
  );
}


type ItemModalFooterProps = {
    onAddItem: () => void;
    onRemoveItem: () => void;
}


function ItemModalFooter({ onAddItem, onRemoveItem } : ItemModalFooterProps) {
  return (
    <HStack w={'100%'} spacing={4}>
      <Button flex={1} variant={'solid'} colorScheme="brand" onClick={onAddItem}>Add Item</Button>
      <Button flex={1} variant={'outline'} colorScheme="brand" onClick={onRemoveItem}>Remove Item</Button>
    </HStack>
  );
}


type ItemModalProps = {
    onAddItem: () => void;
    onRemoveItem: () => void;
    onClose: () => void;
    isOpen: boolean;
    bodyProps: ItemModalBodyProps;
}


function ItemModal({ onAddItem, onRemoveItem, onClose, isOpen, bodyProps } :ItemModalProps) {
  return (
    <GeneralModal
      isOpen={isOpen}
      onClose={onClose}
      headerContent={<ItemModalHeader itemName={'Iron Man Action Figure'} />} // Simple text as header content
      bodyContent={<ItemModalBody {...bodyProps} />}
      footerContent={<ItemModalFooter onAddItem={onAddItem} onRemoveItem={onRemoveItem} />}
    />
  );
}

export default ItemModal;
