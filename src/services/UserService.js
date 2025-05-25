import {userRepository} from "../repositories/UserRepository.js";

class UserService {

    async createUser(userData) {
        const newUser = await userRepository.createUser(userData);

        return newUser;
    }
}

export default new UserService();