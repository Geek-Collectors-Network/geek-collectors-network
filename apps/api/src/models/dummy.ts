import { drizzle } from 'drizzle-orm/mysql2';
import { sql } from 'drizzle-orm';

import type { FriendshipsType, ItemsType, ItemsToTagsType, ItemsToUsersCollectionsType, ItemsToUsersWishlistsType, UsersType, TagsType, UsersToTagsType } from './schema';
// eslint-disable-next-line no-duplicate-imports
import { friendships, items, users, tags, usersToTags } from './schema';

import { logger } from '../modules/logger';

// password: test123
const DUMMY_USERS: UsersType[] = [
  {
    id: 1,
    createdAt: new Date('2024-01-01 00:00:00'),
    updatedAt: new Date('2024-01-02 00:00:00'),
    lastLoginAt: new Date('2024-01-03 00:00:00'),
    email: 'admin@email.com',
    hashedPassword: '4d05fea5d61dc9243dcdad3061c38df4', // "admin"
    salt: '9ed181e3387d23996ba2759537d2b543',
    firstName: 'Ad',
    lastName: 'Amantium',
    displayName: 'ADMIN',
    profileImageUrl: 'https://robohash.org/ADMIN',
    birthDate: new Date('1970-01-01 00:00:00'),
    about: 'I like to admin things.',
  },
  {
    id: 2,
    createdAt: new Date('2023-11-25 10:30:00'),
    updatedAt: new Date('2024-02-28 14:45:00'),
    lastLoginAt: new Date('2024-03-10 9:15:00'),
    email: 'john.doe@email.com',
    hashedPassword: '18d2b8d3d71f6baf9e1dbfeb44b06b3f', // "password"
    salt: '2328394c5e9a71a84bd920e9314f1af1',
    firstName: 'John',
    lastName: 'Doe',
    displayName: 'JohhnyD',
    profileImageUrl: 'https://robohash.org/JohhnyD',
    birthDate: new Date('1990-05-15 00:00:00'),
    about: 'I am a male person.',
    twitter: '@johnny_doe',
    facebook: 'john.doe',
    instagram: 'johnny_doe',
  },
  {
    id: 3,
    createdAt: new Date('2022-09-08 08:15:00'),
    updatedAt: new Date('2024-03-05 17:30:00'),
    lastLoginAt: new Date('2024-03-12 10:45:00'),
    email: 'alice.smith@email.com',
    hashedPassword: '18d2b8d3d71f6baf9e1dbfeb44b06b3f',
    salt: '2328394c5e9a71a84bd920e9314f1af1',
    firstName: 'Alice',
    lastName: 'Smith',
    displayName: 'Alicia',
    profileImageUrl: 'https://robohash.org/Alicia',
    birthDate: new Date('1985-07-21 00:00:00'),
    about: 'I am another generic person.',
    twitter: '@alicia_smith',
  },
  {
    id: 4,
    createdAt: new Date('2023-04-12 14:20:00'),
    updatedAt: new Date('2024-03-09 09:30:00'),
    lastLoginAt: new Date('2024-03-11 11:45:00'),
    email: 'jane.doe@email.com',
    hashedPassword: '18d2b8d3d71f6baf9e1dbfeb44b06b3f',
    salt: '2328394c5e9a71a84bd920e9314f1af1',
    firstName: 'Jane',
    lastName: 'Doe',
    displayName: 'JaneyD',
    profileImageUrl: 'https://robohash.org/JaneyD',
    birthDate: new Date('1995-10-08 00:00:00'),
    about: 'I am a female person.',
    facebook: 'jane.doe',
  },
  {
    id: 5,
    createdAt: new Date('2023-07-29 11:45:00'),
    updatedAt: new Date('2024-02-18 16:15:00'),
    lastLoginAt: new Date('2024-03-09 14:30:00'),
    email: 'william.shakespeare@email.com',
    hashedPassword: '18d2b8d3d71f6baf9e1dbfeb44b06b3f',
    salt: '2328394c5e9a71a84bd920e9314f1af1',
    firstName: 'William',
    lastName: 'Shakespeare',
    displayName: 'The Bard',
    profileImageUrl: 'https://robohash.org/TheBard',
    birthDate: new Date('1564-04-23 00:00:00'),
    about: 'I am a famous playwright.',
    instagram: 'william.shakespeare',
  },
  {
    id: 6,
    createdAt: new Date('2023-12-05 08:30:00'),
    updatedAt: new Date('2024-03-10 13:20:00'),
    lastLoginAt: new Date('2024-03-12 08:45:00'),
    email: 'sherlock.holmes@email.com',
    hashedPassword: '18d2b8d3d71f6baf9e1dbfeb44b06b3f',
    salt: '2328394c5e9a71a84bd920e9314f1af1',
    firstName: 'Sherlock',
    lastName: 'Holmes',
    displayName: 'Detective Holmes',
    profileImageUrl: 'https://robohash.org/DetectiveHolmes',
    birthDate: new Date('1854-01-06 00:00:00'),
    about: 'I am a fictional detective.',
    twitter: '@detective_holmes',
  },
  {
    id: 7,
    createdAt: new Date('2023-10-10 13:45:00'),
    updatedAt: new Date('2024-03-09 15:35:00'),
    lastLoginAt: new Date('2024-03-11 12:15:00'),
    email: 'bruce.wayne@email.com',
    hashedPassword: '18d2b8d3d71f6baf9e1dbfeb44b06b3f',
    salt: '2328394c5e9a71a84bd920e9314f1af1',
    firstName: 'Bruce',
    lastName: 'Wayne',
    displayName: 'Batman',
    profileImageUrl: 'https://robohash.org/Batman',
    birthDate: new Date('1939-05-01 00:00:00'),
    about: "I'm Batman.",
    facebook: 'bruce.wayne',
  },
  {
    id: 8,
    createdAt: new Date('2023-03-28 10:20:00'),
    updatedAt: new Date('2024-03-10 13:40:00'),
    lastLoginAt: new Date('2024-03-11 08:55:00'),
    email: 'hermione.granger@email.com',
    hashedPassword: '18d2b8d3d71f6baf9e1dbfeb44b06b3f',
    salt: '2328394c5e9a71a84bd920e9314f1af1',
    firstName: 'Hermione',
    lastName: 'Granger',
    displayName: 'Witchy',
    profileImageUrl: 'https://robohash.org/Witchy',
    birthDate: new Date('1979-09-19 00:00:00'),
    about: 'I am a witch.',
    instagram: 'hermione.granger',
  },
  {
    id: 9,
    createdAt: new Date('2023-11-05 08:40:00'),
    updatedAt: new Date('2024-03-07 11:15:00'),
    lastLoginAt: new Date('2024-03-10 15:30:00'),
    email: 'peter.parker@email.com',
    hashedPassword: '18d2b8d3d71f6baf9e1dbfeb44b06b3f',
    salt: '2328394c5e9a71a84bd920e9314f1af1',
    firstName: 'Peter',
    lastName: 'Parker',
    displayName: 'Spider-Man',
    profileImageUrl: 'https://robohash.org/SpiderMan',
    birthDate: new Date('1962-08-10 00:00:00'),
    about: 'I am a friendly neighborhood Spider man.',
    twitter: '@spiderman',
  },
  {
    id: 10,
    createdAt: new Date('2023-09-18 13:20:00'),
    updatedAt: new Date('2024-03-07 10:45:00'),
    lastLoginAt: new Date('2024-03-12 09:30:00'),
    email: 'tony.stark@email.com',
    hashedPassword: '18d2b8d3d71f6baf9e1dbfeb44b06b3f',
    salt: '2328394c5e9a71a84bd920e9314f1af1',
    firstName: 'Tony',
    lastName: 'Stark',
    displayName: 'Iron Man',
    profileImageUrl: 'https://robohash.org/IronMan',
    birthDate: new Date('1970-05-29 00:00:00'),
    about: "I'm a billionaire playboy philanthropist.",
    facebook: 'tony.stark',
  },
  {
    id: 11,
    createdAt: new Date('2023-10-25 14:10:00'),
    updatedAt: new Date('2024-03-09 12:30:00'),
    lastLoginAt: new Date('2024-03-11 11:20:00'),
    email: 'clark.kent@email.com',
    hashedPassword: '18d2b8d3d71f6baf9e1dbfeb44b06b3f',
    salt: '2328394c5e9a71a84bd920e9314f1af1',
    firstName: 'Clark',
    lastName: 'Kent',
    displayName: 'Superman',
    profileImageUrl: 'https://robohash.org/Superman',
    birthDate: new Date('1938-04-18 00:00:00'),
    about: 'I am a journalist with a secret identity.',
    instagram: 'clark.kent',
  },
  {
    id: 12,
    createdAt: new Date('2023-11-30 10:50:00'),
    updatedAt: new Date('2024-03-05 15:15:00'),
    lastLoginAt: new Date('2024-03-09 08:40:00'),
    email: 'bruce.banner@email.com',
    hashedPassword: '18d2b8d3d71f6baf9e1dbfeb44b06b3f',
    salt: '2328394c5e9a71a84bd920e9314f1af1',
    firstName: 'Bruce',
    lastName: 'Banner',
    displayName: 'Hulk',
    profileImageUrl: 'https://robohash.org/Hulk',
    birthDate: new Date('1962-05-01 00:00:00'),
    about: "Don't make me angry. You wouldn't like me when I'm angry.",
    twitter: '@hulk',
  },
  {
    id: 13,
    createdAt: new Date('2023-12-18 09:30:00'),
    updatedAt: new Date('2024-03-10 13:55:00'),
    lastLoginAt: new Date('2024-03-12 10:10:00'),
    email: 'diana.prince@email.com',
    hashedPassword: '18d2b8d3d71f6baf9e1dbfeb44b06b3f',
    salt: '2328394c5e9a71a84bd920e9314f1af1',
    firstName: 'Diana',
    lastName: 'Prince',
    displayName: 'Wonder Woman',
    profileImageUrl: 'https://robohash.org/WonderWoman',
    birthDate: new Date('1941-10-21 00:00:00'),
    about: 'I am an Amazonian warrior princess.',
    facebook: 'diana.prince',
  },
  {
    id: 14,
    createdAt: new Date('2024-01-07 08:00:00'),
    updatedAt: new Date('2024-03-08 11:25:00'),
    lastLoginAt: new Date('2024-03-10 14:30:00'),
    email: 'thor.odinson@email.com',
    hashedPassword: '18d2b8d3d71f6baf9e1dbfeb44b06b3f',
    salt: '2328394c5e9a71a84bd920e9314f1af1',
    firstName: 'Thor',
    lastName: 'Odinson',
    displayName: 'God of Thunder',
    profileImageUrl: 'https://robohash.org/GodofThunder',
    birthDate: new Date('1962-08-08 00:00:00'),
    about: 'I am the son of Odin.',
    instagram: 'thor.odinson',
  },
  {
    id: 15,
    createdAt: new Date(),
    updatedAt: new Date(),
    lastLoginAt: new Date(),
    email: '',
    hashedPassword: '18d2b8d3d71f6baf9e1dbfeb44b06b3f',
    salt: '2328394c5e9a71a84bd920e9314f1af1',
    birthDate: new Date(),
  },
];

const tagsText: string[] = [
  'Star Wars',
  'Marvel',
  'The Avengers',
  'Iron Man',
  'DC Comics',
  'Batman',
  'Superman',
  'Nintendo',
  'Pokemon',
  'Super Mario Bros',
  'The Legend of Zelda',
  'Transformers',
  'robots',
  'models',
  'action figures',
  'movies',
  'books',
  'comics',
  'video games',
  'board games',
  'LEGO',
  'sci-fi',
  'space',
];

const DUMMY_TAGS: TagsType[] = tagsText.map((text, index) => ({
  id: index + 1,
  creatorId: (index % 3) + 2,
  text,
}));

const DUMMY_USER_TAGS: UsersToTagsType[] = [];
for (let userId = 1; userId <= DUMMY_USERS.length; userId++) {
  for (let i = 0; i < userId; i++) {
    const tagId = ((userId + i) % DUMMY_TAGS.length) + 1;
    DUMMY_USER_TAGS.push({ userId, tagId });
  }
}

const DUMMY_FRIENDSHIPS: FriendshipsType[] = [
  // John Doe sends requests...
  { inviterId: 2, inviteeId: 3, message: 'Hey Alice, let\'s be friends!', status: 'pending' },
  { inviterId: 2, inviteeId: 4, message: 'Hey Jane, let\'s be friends!', status: 'pending' },

  { inviterId: 2, inviteeId: 5, message: 'Hey William, let\'s be friends!', status: 'accepted' },
  { inviterId: 2, inviteeId: 6, message: 'Hey Sherlock, let\'s be friends!', status: 'accepted' },
  { inviterId: 2, inviteeId: 7, message: 'Hey Bruce, let\'s be friends!', status: 'accepted' },

  { inviterId: 2, inviteeId: 8, message: 'Hey Hermione, let\'s be friends!', status: 'rejected' },
  { inviterId: 2, inviteeId: 9, message: 'Hey Peter, let\'s be friends!', status: 'blocked' },

  // John Doe recieves requests...
  { inviterId: 10, inviteeId: 2, message: 'Hey John, it\'s Tony, let\'s be friends!', status: 'pending' },
  { inviterId: 11, inviteeId: 2, message: 'Hey John, it\'s Clark, let\'s be friends!', status: 'pending' },

  { inviterId: 12, inviteeId: 2, message: 'Hey John, it\'s Bruce, let\'s be friends!', status: 'accepted' },
  { inviterId: 13, inviteeId: 2, message: 'Hey John, it\'s Diana, let\'s be friends!', status: 'accepted' },

  { inviterId: 14, inviteeId: 2, message: 'Hey John, it\'s Thor, let\'s be friends!', status: 'rejected' },
  { inviterId: 15, inviteeId: 2, message: 'Hey John, it\'s Hulk, let\'s be friends!', status: 'blocked' },

  // John Doe has 5 current friends total

  // 2 mutual friends with Alice (NOT current friends with John)
  { inviterId: 3, inviteeId: 4, message: '', status: 'accepted' },
  { inviterId: 3, inviteeId: 5, message: '', status: 'accepted' },
  { inviterId: 3, inviteeId: 6, message: '', status: 'accepted' },

  // 3 mutual friends with William (IS current friends with John)
  { inviterId: 5, inviteeId: 6, message: '', status: 'accepted' },
  { inviterId: 5, inviteeId: 7, message: '', status: 'accepted' },
  { inviterId: 5, inviteeId: 12, message: '', status: 'accepted' },

];

const DUMMY_ITEMS: ItemsType[] = [
  {
    id: 1,
    creatorId: 2,
    title: 'Iron Man Mark XLIII Action Figure',
    description: "Highly detailed action figure featuring Iron Man's Mark XLIII armor from Marvel's Avengers: Age of Ultron movie.",
    imageUrl: 'https://example.com/iron-man-mark-xliii.jpg',
    brand: 'Hot Toys',
    price: 5999, // in cents ($59.99)
    isForSale: true,
  },
  {
    id: 2,
    creatorId: 3,
    title: 'Batman: The Dark Knight Returns Graphic Novel',
    description: 'Classic graphic novel by Frank Miller featuring an older Bruce Wayne returning to the role of Batman.',
    imageUrl: 'https://example.com/batman-dark-knight-returns.jpg',
    brand: 'DC Comics',
    price: 1999, // in cents ($19.99)
    isForSale: true,
    isForTrade: true,
  },
  {
    id: 3,
    creatorId: 2,
    title: 'Star Wars Millennium Falcon LEGO Set',
    description: 'LEGO set featuring the iconic Millennium Falcon starship from the Star Wars saga. Includes Han Solo, Chewbacca, and other minifigures.',
    imageUrl: 'https://example.com/millennium-falcon-lego.jpg',
    brand: 'LEGO',
    price: 12999, // in cents ($129.99)
    isForSale: true,
    isForTrade: true,
  },
  {
    id: 4,
    creatorId: 3,
    title: 'Pokemon Trading Card Game: Sword & Shield Booster Box',
    description: 'Booster box containing 36 Pokemon TCG packs from the Sword & Shield expansion. Each pack contains 10 cards.',
    imageUrl: 'https://example.com/pokemon-sword-shield-booster-box.jpg',
    brand: 'Pokemon',
    price: 9999, // in cents ($99.99)
    isForSale: true,
  },

  {
    id: 5,
    creatorId: 4,
    title: 'Nintendo Switch Console (Animal Crossing Edition)',
    description: 'Limited edition Nintendo Switch console featuring custom designs inspired by Animal Crossing: New Horizons game.',
    imageUrl: 'https://example.com/nintendo-switch-animal-crossing.jpg',
    brand: 'Nintendo',
    price: 29999, // in cents ($299.99)
    isForSale: true,
  },
  {
    id: 6,
    creatorId: 2,
    title: 'Marvel Comics Collectible Art Print Set',
    description: 'Set of high-quality art prints featuring iconic Marvel Comics characters, including Spider-Man, Iron Man, and Captain America.',
    imageUrl: 'https://example.com/marvel-comics-art-prints.jpg',
    brand: 'Mondo',
    price: 4999, // in cents ($49.99)
    isForSale: true,
    isForTrade: true,
  },
  {
    id: 7,
    creatorId: 3,
    title: 'The Avengers: Earth\'s Mightiest Heroes DVD Box Set',
    description: 'Complete DVD box set of the animated TV series The Avengers: Earth\'s Mightiest Heroes. Includes all 52 episodes.',
    imageUrl: 'https://example.com/avengers-earths-mightiest-heroes.jpg',
    brand: 'Walt Disney Studios Home Entertainment',
    price: 2999, // in cents ($29.99)
    isForSale: true,
  },
  {
    id: 8,
    creatorId: 4,
    title: 'The Legend of Zelda Hylian Shield Backpack',
    description: 'Backpack featuring the iconic Hylian Shield design from The Legend of Zelda video game series. Perfect for fans of Link and Hyrule.',
    imageUrl: 'https://example.com/zelda-hylian-shield-backpack.jpg',
    brand: 'Bioworld',
    price: 5999, // in cents ($59.99)
    isForSale: true,
  },
  {
    id: 9,
    creatorId: 2,
    title: 'Transformers Optimus Prime Action Figure',
    description: 'Highly detailed action figure featuring Optimus Prime from the Transformers movie franchise. Includes light-up features and accessories.',
    imageUrl: 'https://example.com/transformers-optimus-prime.jpg',
    brand: 'Hasbro',
    price: 3999, // in cents ($39.99)
    isForSale: true,
    isForTrade: true,
  },

  {
    id: 10,
    creatorId: 2,
    title: 'DC Comics Batman Logo Throw Blanket',
    description: 'Soft and cozy throw blanket featuring the iconic Batman logo from DC Comics. Perfect for fans of the Dark Knight.',
    imageUrl: 'https://example.com/dc-batman-throw-blanket.jpg',
    brand: 'Bioworld',
    price: 2999, // in cents ($29.99)
    isForTrade: true,
  },
];

const DUMMY_ITEMS_TAGS: ItemsToTagsType[] = [
  { itemId: 1, tagId: 3 },

];


export const writeDummyToDb = async (db: ReturnType<typeof drizzle>) => {
  logger.info('Writing dummy data to database if it doesn\'t exist.');

  // MYSQL doesn't support onConflictDoNothing (i.e. ON DUPLICATE KEY IGNORE)
  // so instead we perform a no-op by setting any column’s value to itself

  const userInsertionPromises = DUMMY_USERS.map(dummy => db
    .insert(users)
    .values(dummy)
    .onDuplicateKeyUpdate({ set: { id: sql`id` } })
    .execute());
  try {
    Promise.all(userInsertionPromises);
  } catch (e) {
    // Likely to throw "duplicate entry", we'll just ignore it
  }

  const tagPromises = DUMMY_TAGS.map(dummy => db
    .insert(tags)
    .values(dummy)
    .onDuplicateKeyUpdate({ set: { id: sql`id` } })
    .execute());
  try {
    await Promise.all(tagPromises);
  } catch (e) {
    // Likely to throw "duplicate entry", we'll just ignore it
  }

  const userTagsPromises = DUMMY_USER_TAGS.map(dummy => db
    .insert(usersToTags)
    .values(dummy)
    .onDuplicateKeyUpdate({ set: { userId: sql`user_id` } })
    .execute());
  try {
    await Promise.all(userTagsPromises);
  } catch (e) {
    // Likely to throw "duplicate entry", we'll just ignore it
  }

  const friendshipPromises = DUMMY_FRIENDSHIPS.map(dummy => db
    .insert(friendships)
    .values(dummy)
    .onDuplicateKeyUpdate({ set: { inviterId: sql`inviter_id` } })
    .execute());
  try {
    await Promise.all(friendshipPromises);
  } catch (e) {
    // Likely to throw "duplicate entry", we'll just ignore it
  }

  const itemPromises = DUMMY_ITEMS.map(dummy => db
    .insert(items)
    .values(dummy)
    .onDuplicateKeyUpdate({ set: { id: sql`id` } })
    .execute());
  try {
    await Promise.all(itemPromises);
  } catch (e) {
    // Likely to throw "duplicate entry", we'll just ignore it
  }
};
