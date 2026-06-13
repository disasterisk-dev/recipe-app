import { AuthService } from "./authService";
import { UserService } from "./userService";

class ServiceLocator {
  private static instance: ServiceLocator | null = null;

  readonly authService: AuthService;
  readonly userService: UserService;

  private constructor() {
    this.authService = new AuthService();
    this.userService = new UserService();

    // keep user service synced to auth service without dependencies
    this.authService.onAuthStateChanged((user) => {
      this.userService.setCurrentUser(user?.uid ?? null);
    });
  }

  static getInstance(): ServiceLocator {
    if (!ServiceLocator.instance) {
      ServiceLocator.instance = new ServiceLocator();
    }
    return ServiceLocator.instance;
  }
}

export const { authService, userService } = ServiceLocator.getInstance();
