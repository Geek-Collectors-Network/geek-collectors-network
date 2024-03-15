import express from 'express';

import { Resources } from '../services/Service';
import { UserService } from '../services/UserService';
import { AuthService } from '../services/AuthService';

export class Routes {
  private readonly userService: UserService;
  private readonly authService: AuthService;

  // eslint-disable-next-line no-useless-constructor
  constructor(resources: Resources) {
    this.userService = new UserService(resources);
    this.authService = new AuthService(resources);
  }

  public create() {
    const router = express.Router();

    // router.post('/auth/signup', this.authService.handleSign(this.resources));
    // router.post('/auth/login', this.authService.handleLogin(this.resources));
    // router.post('/auth/logout', this.authService.handleLogout(this.resources));
    //
    // router.get('/user/:userId?/profile', this.userService.handleGetProfile(this.resources));
    // router.patch('/user/profile', this.userService.handleEditProfile(this.resources));

    // router.post('/auth/signup', this.authService.handleSignUp.bind(this.authService));
    // router.post('/auth/login', this.authService.handleLogin.bind(this.authService));
    // router.post('/auth/logout', this.authService.handleLogout.bind(this.authService));
    //
    // router.get('/user/:userId?/profile', this.userService.handleGetProfile.bind(this.userService));
    // router.patch('/user/profile', this.userService.handleEditProfile.bind(this.userService));

    router.post('/auth/signup', (req, res) => this.authService.handleSignUp(req, res));
    router.post('/auth/login', (req, res) => this.authService.handleLogin(req, res));
    router.post('/auth/logout', (req, res) => this.authService.handleLogout(req, res));

    router.get('/user/:userId?/profile', (req, res) => this.userService.handleGetProfile(req, res));
    router.patch('/user/profile', (req, res) => this.userService.handleEditProfile(req, res));

    return router;
  }
}
