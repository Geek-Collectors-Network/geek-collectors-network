import { BaseService, type Resources } from './Service';
// import passport from 'passport';
// import { Strategy as LocalStrategy, Strategy } from 'passport-local';
import { pbkdf2, randomBytes } from 'crypto';
import { user } from '../../models/user';

// import { object, string, email } from 'zod';
// const userSignupSchema = object({
//   username: string(),
//   email: email(),
//   password: string().min(6), // Assuming a minimum password length of 6 characters
// });

export class AuthController {
  // eslint-disable-next-line no-useless-constructor
  constructor(private readonly resources: Resources) {}

  public async signup(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
  ) {
    const createdUser = { user: null };
    const salt = randomBytes(16).toString('utf8');
    console.log(salt);
    const result = pbkdf2(password, salt, 310000, 32, 'sha256', (err, hashedPassword) => {
      if (err) return { message: 'Error hashing password' };
      const userInfo = {
        email,
        firstName,
        lastName,
        salt,
        hashedPassword: hashedPassword.toString('utf8'),
        createdAt: new Date(),
      };
      // const insertedUser =  this.resources.db
      //   .insert(user)
      //   .values(userInfo)
      //   .execute();
      // console.log(insertedUser);
      // return insertedUser;
      return userInfo;
    });
  }
}

export class AuthService extends BaseService {
  constructor(resources: Resources) {
    super(resources, '/auth');

    const controller = new AuthController(resources);

    this.router.post('/signup', (req, res, next) => {
      const { email, password, firstName, lastName } = req.body;
      if (!email || !password || !firstName || !lastName) {
        res.status(400).json({
          message: 'Missing required fields',
        });
        return;
      }

      controller.signup(
        email.toString(),
        password.toString(),
        firstName.toString(),
        lastName.toString(),
      ).then(insertedUser => {
        console.log(insertedUser);
      });
      const insertedUser = null;

      if (insertedUser !== null) {
        res.status(200).json(insertedUser);
      } else {
        res.status(500).json({
          message: 'User not created',
        });
      }
    });
  }
}
