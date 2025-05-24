import {userRepository} from "../repositories/UserRepository.js";

export class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async initialize() {
        await this.userRepository.initialize();
    }

}

export const userService = new UserService(userRepository);