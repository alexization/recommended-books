import {userRepository} from "../repositories/UserRepository.js";
import {User} from "../domain/User.js";

export class UserService {

    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async initialize() {
        await this.userRepository.initialize();
    }

    async createUser(userData) {
        const newUser = new User({
            email: userData.email,
            name: userData.name,
            birth: userData.birth,
        })

        const savedUser = await this.userRepository.create(newUser);
        return savedUser;
    }

    async findUserById(id) {
        return await this.userRepository.findUserById(id);
    }
}

export const userService = new UserService(userRepository);