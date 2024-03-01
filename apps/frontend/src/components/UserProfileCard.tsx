import { EmailIcon, LinkIcon } from '@chakra-ui/icons';
import { Box, Flex, HStack, IconButton, Image, Text } from '@chakra-ui/react';
import React from 'react';

type UserProfileCardProps = {
    name: string,
    imageURL: string,
}

function UserProfileCard({ name, imageURL }: UserProfileCardProps) {
  return (
    <HStack
      backgroundColor={'background'}
      justify={'space-between'}
      p={3}
      spacing={4}
      w={'100%'}
    >
      <Box flexShrink={0}>
        <Image
          borderRadius={'full'}
          boxSize={'70px'}
          src={imageURL}
          alt="profile photo">
        </Image>
      </Box>

      <Flex
        flex={'1'}>
        <Text fontSize={'xl'} fontWeight={'black'}>{name}</Text>
      </Flex>

      <HStack
        mr={5}
        spacing={8}>

        <IconButton
          aria-label="Send email"
          icon={<EmailIcon boxSize={8}/>}
          variant={'ghost'}
          colorScheme="brand"
        />
        <IconButton
          aria-label="Connect to social media"
          icon={<LinkIcon boxSize={8}/>}
          variant={'ghost'}
          colorScheme="brand"
        />

      </HStack>
    </HStack>
  );
}

export default UserProfileCard;
