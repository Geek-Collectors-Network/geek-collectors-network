import React from 'react';

// import FriendsList from './FriendsList';
import PageLayout from '../components/PageLayout';
import ItemCard from '../components/ItemCard';

const item = {
  title: 'Star Wars Darth Vader Electronic Vinyl Figure #343',
  description: 'Celebrate one of pop cultures most recognizable villains and proclaim your allegiance to the dark side with an electronic Pop! Darth Vader.',
  itemImage: 'http://uncleodiescollectibles.com/img_lib/Star%20Wars%20Collectibles%20240%208-9-21.jpg',
};

function TestPage() {
  return (
    <PageLayout showNavigation={false}>
      <ItemCard
        title={item.title}
        description={item.description}
        itemImage={item.itemImage}
      />
      {/* <FriendsList /> */}
    </PageLayout>
  );
}

export default TestPage;
