import React from 'react';
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
    name: string;
}

function ItemModalHeader({ name }: ItemModalHeaderProps) {
  return (
    <HStack w={'100%'} justify={'center'}>
      <Text fontSize={'xl'}>{name}</Text>
    </HStack>
  );
}


type ItemModalBodyProps = {
    id: number;
    name: string;
    description: string;
    imageUrl: string;
    url: string
    tags: string[];
}

function ItemModalBody({ id, name, description, imageUrl, url, tags }: ItemModalBodyProps) {
  return (
    <VStack>
      <Card>
        <CardBody>
          <Stack spacing={4}>

            <AspectRatio ratio={ 16 / 9 }>
              <Image src={imageUrl || 'https://via.placeholder.com/150'} objectFit={'cover'} borderRadius={5}/>
            </AspectRatio>

            <Text>{description}</Text>

            <Divider />

            <Link href={url} isExternal> {name} <ExternalLinkIcon mx="2px" /> </Link>

            <Divider />

            <Wrap spacing={0}>
              {tags.map(tag => (
                <WrapItem key={id}>
                  <Tag size="lg" m={1} backgroundColor={'brand.100'} borderRadius="15px">
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
    isOpen: boolean;
    onClose: () => void;
    bodyProps: ItemModalBodyProps;
}

function ItemModal({ onAddItem, onRemoveItem, onClose, isOpen, bodyProps }: ItemModalProps) {
  return (
    <GeneralModal
      isOpen={isOpen}
      onClose={onClose}
      headerContent={<ItemModalHeader name={bodyProps.name}/>}
      bodyContent={<ItemModalBody {...bodyProps} />}
      footerContent={<ItemModalFooter onAddItem={onAddItem} onRemoveItem={onRemoveItem} />}
    />
  );
}


export default ItemModal;
