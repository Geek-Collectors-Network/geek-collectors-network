import React from 'react';
import {
  Card,
  CardBody,
  Image,
  Heading,
  Text,
  Stack,
  Flex,
  Button,
  Spacer,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';

type ItemData = {
 title: string,
 description: string,
 itemImage?: string,
}

function ItemCard({ title, description, itemImage }: ItemData) {
  return (
    <Card
      maxW="sm"
      variant="elevated"
      p="2"
      shadow="md"
      _hover={{ shadow: 'lg' }}>

      <CardBody>
        <Stack mt="3" spacing="6">

          <Image
            src={itemImage || 'https://via.placeholder.com/150'}
            borderRadius="lg"
            objectFit="cover"
            htmlWidth="100%"
            htmlHeight="auto" />

          <Heading size="md">{title}</Heading>

          <Text>{description}</Text>
        </Stack>

        <Flex p="0">
          <Spacer />
          <Button variant="ghost" colorScheme="brand" size="lg" p="0">
            <DeleteIcon color="brand" w={6} h={6} />
          </Button>
        </Flex>

      </CardBody>
    </Card>
  );
}

export default ItemCard;
