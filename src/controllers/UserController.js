import {userService} from "../services/UserService.js";

export class UserController {
    constructor(userService) {
        this.userService = userService;
    }

}

export const userController = new UserController(userService);