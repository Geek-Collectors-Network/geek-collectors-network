import React from 'react';
import { Box, Flex, HStack, IconButton, Image, Text } from '@chakra-ui/react';

type UserProfileIcon = {
  label: string,
  icon: React.ReactElement,
  variant?: string,
}

type UserProfileCardProps = {
    name: string,
    imageURL: string,
    icons: UserProfileIcon[];
}

function UserProfileCard({ name, imageURL, icons }: UserProfileCardProps) {
  return (
    <HStack
      backgroundColor={'background'}
      justify={'space-between'}
      p={3}
      spacing={4}
      w={'100%'}
      minW={'375px'}
    >
      <Box flexShrink={0}>
        <Image
          borderRadius={'full'}
          boxSize={['50px', '60px', '70px']}
          src={imageURL}
          alt="profile photo">
        </Image>
      </Box>

      <Flex
        flex={'1'}>
        <Text fontSize={['xl', '2xl']} fontWeight={'bold'}>{name}</Text>
      </Flex>

      <HStack mr={5} spacing={8}>
        {icons.map((icon, index) => (
          <IconButton
            key={name + index}
            aria-label={icon.label}
            icon={icon.icon}
            variant={icon.variant || 'ghost'}
            colorScheme={'brand'}
          />
        ))}
      </HStack>
    </HStack>
  );
}

export default UserProfileCard;
