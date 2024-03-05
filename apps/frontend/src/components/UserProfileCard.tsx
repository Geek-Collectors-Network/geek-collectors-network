import React from 'react';
import { Box, Flex, HStack, IconButton, Image, Text } from '@chakra-ui/react';

// If more user data is needed, it can be added here
type UserData = {
  name: string,
  image?: string
}

type UserButton = {

  // Some icons may not have explicit names; added for accessibility
  label: string,

  // The Chakra UI (or other) icon to be rendered and it's variant
  icon: React.ReactElement,
  variant?: string,

  // Allows for custom color schemes, i.e, green checkmark or red "x".
  colorScheme?: string
}

type UserProfileCardProps = {
    userData: UserData,
    icons: UserButton[]; // May need to render multiple icons
}

function navigateToUserProfile() {
  console.log('Navigating to user profile...');
}

function UserProfileCard({ userData, icons }: UserProfileCardProps) {
  return (
    <HStack
      backgroundColor={'background'}
      justify={'space-between'}
      px={2}
      py={2}
      spacing={4}
      w={'100%'}
      borderBottom={'1px'}
      borderColor={'greyOut'}
    >
      <Box flexShrink={0}
        onClick={() => navigateToUserProfile()}>
        <Image
          borderRadius={'full'} // Makes image circular
          boxSize={['50px', '60px', '70px']} // Dynamically increases image size based on screen width
          src={userData.image || 'https://via.placeholder.com/150'}
          alt={`${userData.name}'s profile photo`}>
        </Image>
      </Box>

      {/* User name, displayed to the right of the profile image */}
      <Flex
        flex={'1'}
        onClick={() => navigateToUserProfile()}>
        <Text fontSize={['lg', 'xl']} fontWeight={'bold'}>{userData.name}</Text>
      </Flex>

      <HStack spacing={3}>
        {icons.map((icon, index) => (
          <IconButton
            key={index}
            aria-label={icon.label}
            icon={icon.icon}
            variant={icon.variant || 'ghost'}
            colorScheme={icon.colorScheme || 'brand'}
          />
        ))}
      </HStack>
    </HStack>
  );
}

export default UserProfileCard;
