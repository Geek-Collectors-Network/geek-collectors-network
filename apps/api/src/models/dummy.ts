import { drizzle } from 'drizzle-orm/mysql2';

import type { UserType, TagType, UserToTagType } from './schema';
// eslint-disable-next-line no-duplicate-imports
import { user, tag, userToTag } from './schema';

import { logger } from '../modules/logger';

// password: test123
const DUMMY_USERS: UserType[] = [
  {
    id: 1,
    createdAt: new Date('2024-01-01 00:00:00'),
    updatedAt: new Date('2024-01-02 00:00:00'),
    lastLoginAt: new Date('2024-01-03 00:00:00'),
    email: 'admin@email.com',
    isEmailVerified: true,
    hashedPassword: '2256f1af501af949bc0f529f45f6796e',
    salt: 'f50c343fbd35a171a421099609c14068',
    firstName: 'Ad',
    lastName: 'Amantium',
    displayName: 'ADMIN',
    profileImageUrl: 'https://robohash.org/ADMIN',
    birthDate: new Date('1970-01-01 00:00:00'),
    isAdmin: true,
  },
  {
    id: 2,
    createdAt: new Date('2023-11-25 10:30:00'),
    updatedAt: new Date('2024-02-28 14:45:00'),
    lastLoginAt: new Date('2024-03-10 9:15:00'),
    email: 'john.doe@email.com',
    isEmailVerified: true,
    hashedPassword: '2256f1af501af949bc0f529f45f6796e',
    salt: 'f50c343fbd35a171a421099609c14068',
    firstName: 'John',
    lastName: 'Doe',
    displayName: 'JohhnyD',
    profileImageUrl: 'https://robohash.org/JohhnyD',
    birthDate: new Date('1990-05-15 00:00:00'),
    isAdmin: false,
  },
  {
    id: 3,
    createdAt: new Date('2022-09-08 08:15:00'),
    updatedAt: new Date('2024-03-05 17:30:00'),
    lastLoginAt: new Date('2024-03-12 10:45:00'),
    email: 'alice.smith@email.com',
    isEmailVerified: true,
    hashedPassword: '2256f1af501af949bc0f529f45f6796e',
    salt: 'f50c343fbd35a171a421099609c14068',
    firstName: 'Alice',
    lastName: 'Smith',
    displayName: 'Alicia',
    profileImageUrl: 'https://robohash.org/Alicia',
    birthDate: new Date('1985-07-21 00:00:00'),
    isAdmin: false,
  },
  {
    id: 4,
    createdAt: new Date('2023-04-12 14:20:00'),
    updatedAt: new Date('2024-03-09 09:30:00'),
    lastLoginAt: new Date('2024-03-11 11:45:00'),
    email: 'jane.doe@email.com',
    isEmailVerified: true,
    hashedPassword: '2256f1af501af949bc0f529f45f6796e',
    salt: 'f50c343fbd35a171a421099609c14068',
    firstName: 'Jane',
    lastName: 'Doe',
    displayName: 'JaneyD',
    profileImageUrl: 'https://robohash.org/JaneyD',
    birthDate: new Date('1995-10-08 00:00:00'),
    isAdmin: false,
  },
  {
    id: 5,
    createdAt: new Date('2023-07-29 11:45:00'),
    updatedAt: new Date('2024-02-18 16:15:00'),
    lastLoginAt: new Date('2024-03-09 14:30:00'),
    email: 'william.shakespeare@email.com',
    isEmailVerified: true,
    hashedPassword: '2256f1af501af949bc0f529f45f6796e',
    salt: 'f50c343fbd35a171a421099609c14068',
    firstName: 'William',
    lastName: 'Shakespeare',
    displayName: 'The Bard',
    profileImageUrl: 'https://robohash.org/TheBard',
    birthDate: new Date('1564-04-23 00:00:00'),
    isAdmin: false,
  },
  {
    id: 6,
    createdAt: new Date('2023-12-05 08:30:00'),
    updatedAt: new Date('2024-03-10 13:20:00'),
    lastLoginAt: new Date('2024-03-12 08:45:00'),
    email: 'sherlock.holmes@email.com',
    isEmailVerified: true,
    hashedPassword: '2256f1af501af949bc0f529f45f6796e',
    salt: 'f50c343fbd35a171a421099609c14068',
    firstName: 'Sherlock',
    lastName: 'Holmes',
    displayName: 'Detective Holmes',
    profileImageUrl: 'https://robohash.org/DetectiveHolmes',
    birthDate: new Date('1854-01-06 00:00:00'),
    isAdmin: false,
  },
  {
    id: 7,
    createdAt: new Date('2023-10-10 13:45:00'),
    updatedAt: new Date('2024-03-09 15:35:00'),
    lastLoginAt: new Date('2024-03-11 12:15:00'),
    email: 'bruce.wayne@email.com',
    isEmailVerified: true,
    hashedPassword: '2256f1af501af949bc0f529f45f6796e',
    salt: 'f50c343fbd35a171a421099609c14068',
    firstName: 'Bruce',
    lastName: 'Wayne',
    displayName: 'Batman',
    profileImageUrl: 'https://robohash.org/Batman',
    birthDate: new Date('1939-05-01 00:00:00'),
    isAdmin: false,
  },
  {
    id: 8,
    createdAt: new Date('2023-03-28 10:20:00'),
    updatedAt: new Date('2024-03-10 13:40:00'),
    lastLoginAt: new Date('2024-03-11 08:55:00'),
    email: 'hermione.granger@email.com',
    isEmailVerified: true,
    hashedPassword: '2256f1af501af949bc0f529f45f6796e',
    salt: 'f50c343fbd35a171a421099609c14068',
    firstName: 'Hermione',
    lastName: 'Granger',
    displayName: 'Witchy',
    profileImageUrl: 'https://robohash.org/Witchy',
    birthDate: new Date('1979-09-19 00:00:00'),
    isAdmin: false,
  },
  {
    id: 9,
    createdAt: new Date('2023-11-05 08:40:00'),
    updatedAt: new Date('2024-03-07 11:15:00'),
    lastLoginAt: new Date('2024-03-10 15:30:00'),
    email: 'peter.parker@email.com',
    isEmailVerified: true,
    hashedPassword: '2256f1af501af949bc0f529f45f6796e',
    salt: 'f50c343fbd35a171a421099609c14068',
    firstName: 'Peter',
    lastName: 'Parker',
    displayName: 'Spider-Man',
    profileImageUrl: 'https://robohash.org/SpiderMan',
    birthDate: new Date('1962-08-10 00:00:00'),
    isAdmin: false,
  },
  {
    id: 10,
    createdAt: new Date('2023-09-18 13:20:00'),
    updatedAt: new Date('2024-03-07 10:45:00'),
    lastLoginAt: new Date('2024-03-12 09:30:00'),
    email: 'tony.stark@email.com',
    isEmailVerified: true,
    hashedPassword: '2256f1af501af949bc0f529f45f6796e',
    salt: 'f50c343fbd35a171a421099609c14068',
    firstName: 'Tony',
    lastName: 'Stark',
    displayName: 'Iron Man',
    profileImageUrl: 'https://robohash.org/IronMan',
    birthDate: new Date('1970-05-29 00:00:00'),
    isAdmin: false,
  },
  {
    id: 11,
    createdAt: new Date('2023-10-25 14:10:00'),
    updatedAt: new Date('2024-03-09 12:30:00'),
    lastLoginAt: new Date('2024-03-11 11:20:00'),
    email: 'clark.kent@email.com',
    isEmailVerified: true,
    hashedPassword: '2256f1af501af949bc0f529f45f6796e',
    salt: 'f50c343fbd35a171a421099609c14068',
    firstName: 'Clark',
    lastName: 'Kent',
    displayName: 'Superman',
    profileImageUrl: 'https://robohash.org/Superman',
    birthDate: new Date('1938-04-18 00:00:00'),
    isAdmin: false,
  },
  {
    id: 12,
    createdAt: new Date('2023-11-30 10:50:00'),
    updatedAt: new Date('2024-03-05 15:15:00'),
    lastLoginAt: new Date('2024-03-09 08:40:00'),
    email: 'bruce.banner@email.com',
    isEmailVerified: true,
    hashedPassword: '2256f1af501af949bc0f529f45f6796e',
    salt: 'f50c343fbd35a171a421099609c14068',
    firstName: 'Bruce',
    lastName: 'Banner',
    displayName: 'Hulk',
    profileImageUrl: 'https://robohash.org/Hulk',
    birthDate: new Date('1962-05-01 00:00:00'),
    isAdmin: false,
  },
  {
    id: 13,
    createdAt: new Date('2023-12-18 09:30:00'),
    updatedAt: new Date('2024-03-10 13:55:00'),
    lastLoginAt: new Date('2024-03-12 10:10:00'),
    email: 'diana.prince@email.com',
    isEmailVerified: true,
    hashedPassword: '2256f1af501af949bc0f529f45f6796e',
    salt: 'f50c343fbd35a171a421099609c14068',
    firstName: 'Diana',
    lastName: 'Prince',
    displayName: 'Wonder Woman',
    profileImageUrl: 'https://robohash.org/WonderWoman',
    birthDate: new Date('1941-10-21 00:00:00'),
    isAdmin: false,
  },
  {
    id: 14,
    createdAt: new Date('2024-01-07 08:00:00'),
    updatedAt: new Date('2024-03-08 11:25:00'),
    lastLoginAt: new Date('2024-03-10 14:30:00'),
    email: 'thor.odinson@email.com',
    isEmailVerified: true,
    hashedPassword: '2256f1af501af949bc0f529f45f6796e',
    salt: 'f50c343fbd35a171a421099609c14068',
    firstName: 'Thor',
    lastName: 'Odinson',
    displayName: 'God of Thunder',
    profileImageUrl: 'https://robohash.org/GodofThunder',
    birthDate: new Date('1962-08-08 00:00:00'),
    isAdmin: false,
  },
  {
    id: 15,
    createdAt: new Date(),
    updatedAt: new Date(),
    lastLoginAt: new Date(),
    email: '',
    isEmailVerified: true,
    hashedPassword: '2256f1af501af949bc0f529f45f6796e',
    salt: 'f50c343fbd35a171a421099609c14068',
    firstName: '',
    lastName: '',
    displayName: '',
    profileImageUrl: '',
    birthDate: new Date(),
    isAdmin: false,
  },
];

const tagsText: string[] = [
  'Star Wars',
  'Star Trek',
  'Marvel',
  'Lord of the Rings',
  'Transformers',
  'Minecraft',
  'Harry Potter',
  'DC Comics',
  'Nintendo',
  'Game of Thrones',
  'Pokemon',
  'Doctor Who',
  'The Simpsons',
  'Dungeons & Dragons',
  'Back to the Future',
  'Batman',
  'Super Mario Bros',
  'The Legend of Zelda',
  'The Avengers',
  'Ghostbusters',
];

const DUMMY_TAGS: TagType[] = tagsText.map((text, index) => ({
  id: index + 1,
  creatorId: (index % 3) + 2,
  text,
}));

const DUMMY_INTERESTS: UserToTagType[] = [];
for (let userId = 1; userId <= DUMMY_USERS.length; userId++) {
  for (let i = 0; i < userId; i++) {
    const tagId = (userId + i) % DUMMY_TAGS.length;
    DUMMY_INTERESTS.push({ userId, tagId });
  }
}

export const writeDummyToDb = async (db: ReturnType<typeof drizzle>) => {
  logger.info('Writing dummy data to database if it doesn\'t exist.');

  const userInsertionPromises = DUMMY_USERS.map(dummy => db.insert(user).values(dummy).execute());
  try {
    Promise.all(userInsertionPromises);
  } catch (e) {
    // Likely to throw "duplicate entry", we'll just ignore it
  }

  const tagPromises = DUMMY_TAGS.map(dummy => db.insert(tag).values(dummy).execute());
  try {
    await Promise.all(tagPromises);
  } catch (e) {
    // Likely to throw "duplicate entry", we'll just ignore it
  }

  const interestPromises = DUMMY_INTERESTS.map(dummy => db.insert(userToTag).values(dummy).execute());
  try {
    await Promise.all(interestPromises);
  } catch (e) {
    // Likely to throw "duplicate entry", we'll just ignore it
  }
};
