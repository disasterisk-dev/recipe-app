import { DateTime } from "luxon";
import { AuthService } from "./authService";
import { MenuService } from "./menuService";
import { UserService } from "./userService";
import { getWeekRangeFromDate } from "../utils";

class ServiceLocator {
  private static instance: ServiceLocator | null = null;

  readonly authService: AuthService;
  readonly userService: UserService;
  readonly menuService: MenuService;

  private constructor() {
    this.authService = new AuthService();
    this.userService = new UserService();
    this.menuService = new MenuService();

    // keep user service synced to auth service without dependencies
    this.authService.onAuthStateChanged(async (user) => {
      await this.userService.setCurrentUser(user?.uid ?? null);
      if (this.userService.currentUser == null) return;
      this.menuService.setSelectedDateRange(
        getWeekRangeFromDate(
          DateTime.now(),
          this.userService.currentUser.preferences!.startOnDay
        )
      );
    });
  }

  static getInstance(): ServiceLocator {
    if (!ServiceLocator.instance) {
      ServiceLocator.instance = new ServiceLocator();
    }
    return ServiceLocator.instance;
  }
}

export const { authService, userService, menuService } =
  ServiceLocator.getInstance();
