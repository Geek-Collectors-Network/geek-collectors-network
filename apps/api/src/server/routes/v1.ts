import express from 'express';

import { use } from './utils';
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

    router.post('/auth/signup', use((req, res) => this.authService.handleSignUp(req, res)));
    router.post('/auth/login', use((req, res) => this.authService.handleLogin(req, res)));
    router.post('/auth/logout', use((req, res) => this.authService.handleLogout(req, res)));

    router.get('/user/:userId?/profile', use((req, res) => this.userService.handleGetProfile(req, res)));
    router.patch('/user/profile', use((req, res) => this.userService.handleEditProfile(req, res)));

    return router;
  }
}