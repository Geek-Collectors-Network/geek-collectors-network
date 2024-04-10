import React, { useEffect, useState } from 'react';
import SearchBar from './SearchBar';
import useFetchData from '../hooks/useFetchData';
import loadingAnimation from './widgets/LoadingAnimation';
import ItemCard from './ItemCard';
import { SimpleGrid, VStack, Container, Center } from '@chakra-ui/react';
import ItemModal from './ItemModal';
import { CardButton } from './CardButtons';
import { ViewIcon } from '@chakra-ui/icons'; // Assuming ViewIcon for opening modal
import { TagInfo } from './TagInput';


type ActionProps = {
    label: string;
    onClick: () => void;
    variant: 'solid' | 'outline';
}

type Item = {
    id: number,
    name: string,
    description: string,
    imageUrl: string
    url: string
    tags: TagInfo[]
}

type ItemListProps = {
  url: string
  buttons?: ((itemId: number) => CardButton)[]
}


function ItemList({ url, buttons }: ItemListProps) {
  const { data: items, isLoading } = useFetchData<Item>(url);
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  useEffect(() => {
    setFilteredItems(items);
  }, [items]);


  const handleItemSearch = (query: string) => {
    const lowercaseQuery = query.toLowerCase();
    const filtered = items.filter(item => item.name.toLowerCase().includes(lowercaseQuery) ||
      item.description.toLowerCase().includes(lowercaseQuery));
    setFilteredItems(filtered);
  };

  const openItemModalButton = (itemId: number) => ({
    label: 'Open Item',
    icon: <ViewIcon />,
    variant: 'solid',
    colorScheme: 'brand',
    onClick: () => {
      const item = items.find(listedItem => listedItem.id === itemId);
      setSelectedItem(item || null);
      setModalOpen(true);
    },
  });

  const itemListLayout = filteredItems.length <= 0 ? (
    <Center w="full">No items found</Center>
  ) : (
    <SimpleGrid columns={[1, 2, 3]} spacing={4}>
      {filteredItems.map(item => {
        const cardButtons = !buttons ? [] : buttons.map(button => button(item.id));
        return (
          <ItemCard
            key={item.id}
            itemData={{ title: item.name, description: item.description, itemImage: item.imageUrl }}
            buttons={[openItemModalButton(item.id), ...cardButtons]}
          />
        );
      })}
    </SimpleGrid>
  );


  const itemListModal = () => {
    if (!selectedItem) {
      return (<></>);
    }
    const item = selectedItem!;
    const modelButtons:ActionProps[] = !buttons ? [] : buttons.map(button => {
      const cb = button(item.id);
      return ({
        label: cb.label,
        onClick: cb.onClick || (() => console.log('No onClick provided')),
        variant: 'outline',
      });
    });

    return (
      <ItemModal
        isOpen={modalOpen}
        onClose={() => { setModalOpen(false); setSelectedItem(null); }} // Also reset selectedItem on close
        bodyProps={{
          id: item.id,
          name: item.name,
          description: item.description,
          imageUrl: item.imageUrl,
          url: item.url,
          tags: item.tags,
        }}
        footerActions={[
          ...modelButtons,
          {
            label: 'Close',
            onClick: () => setModalOpen(false),
            variant: 'solid',
          },
        ]}
      />
    );
  };

  return (
    <Container maxW="container.xl" centerContent p={'0'}>
      <VStack
        bg={'background'}
        px={10}
        pt={14}
        spacing={4}
        width={{ base: '100%', md: '90%', lg: '80%' }}
      >
        <SearchBar onSearch={handleItemSearch} />
        {isLoading ? loadingAnimation : itemListLayout}
        {itemListModal()}
      </VStack>
    </Container>
  );
}

export default ItemList;
