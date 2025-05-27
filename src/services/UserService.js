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
        const newUser = new User({...userData});

        const savedUser = await this.userRepository.create(newUser);
        return savedUser;
    }

    async findUserById(id) {
        return await this.userRepository.findUserById(id);
    }

    async findUserByEmail(email) {
        return await this.userRepository.findUserByEmail(email);
    }

    async updateUser(updateUserData) {
        return await this.userRepository.updateUser(updateUserData);
    }

    async deleteUser(id) {
        return await this.userRepository.deleteUser(id);
    }
}

export const userService = new UserService(userRepository);