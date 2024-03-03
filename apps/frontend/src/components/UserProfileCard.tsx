import React from 'react';
import { Box, Flex, HStack, IconButton, Image, Text } from '@chakra-ui/react';

type UserProfile = {
  name: string,
  image: string
}

type UserProfileIcon = {
  label: string,
  icon: React.ReactElement,
  variant?: string,
}

type UserProfileCardProps = {
    userData: UserProfile,
    icons: UserProfileIcon[];
}

function UserProfileCard({ userData, icons }: UserProfileCardProps) {
  return (
    <HStack
      backgroundColor={'background'}
      justify={'space-between'}
      px={4}
      py={3}
      spacing={4}
      w={'100%'}
      minW={'375px'}
    >
      <Box flexShrink={0}>
        <Image
          borderRadius={'full'}
          boxSize={['50px', '60px', '70px']}
          src={userData.image}
          alt="profile photo">
        </Image>
      </Box>

      <Flex
        flex={'1'}>
        <Text fontSize={['xl', '2xl']} fontWeight={'bold'}>{userData.name}</Text>
      </Flex>

      <HStack spacing={8}>
        {icons.map((icon, index) => (
          <IconButton
            key={index}
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
