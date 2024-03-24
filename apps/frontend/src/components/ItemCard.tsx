import React from 'react';
import {
  Card,
  CardBody,
  Image,
  Heading,
  Text,
  Stack,
  Flex,
  Spacer,
  Divider,
  IconButton,
} from '@chakra-ui/react';

type ItemData = {
 title: string,
 description: string,
 itemImage?: string,
}

type CardButton = {
  label: string,
  icon: React.ReactElement,
  variant?: string,
  colorScheme?: string,
  onClick?: () => void
}

type ItemCardProps = {
  itemData: ItemData,
  button: CardButton
}

function ItemCard({ itemData, button }: ItemCardProps) {
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
            src={itemData.itemImage || 'https://via.placeholder.com/150'}
            objectFit="cover"
            htmlWidth="100%"
            htmlHeight="auto" />

          <Divider />

          <Heading size="md">{itemData.title}</Heading>

          <Text>{itemData.description}</Text>
        </Stack>

        <Flex>
          <Spacer />
          <IconButton
            aria-label={button.label}
            icon={button.icon}
            variant={button.variant || 'ghost'}
            colorScheme={button.colorScheme || 'brand'}
            onClick={button.onClick}
          />
        </Flex>

      </CardBody>
    </Card>
  );
}

export default ItemCard;
