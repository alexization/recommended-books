import {userRepository} from "../repositories/UserRepository.js";
import {UserRepositoryInterface} from "../interfaces/UserRepositoryInterface.js";
import {UserServiceInterface} from "../interfaces/UserServiceInterface.js";
import {CreateUserData, UpdateUserData} from "../domain/dto/UserDto.js";
import {User} from "../domain/User.js";

export class UserService implements UserServiceInterface {
    constructor(private readonly userRepository: UserRepositoryInterface) {
        this.userRepository = userRepository;
    }

    async createUser(createUserData: CreateUserData): Promise<boolean> {
        return await this.userRepository.createUser(createUserData);
    }

    async findUserById(id: number): Promise<User> {
        return await this.userRepository.findUserById(id);
    }

    async findUserByEmail(email: string): Promise<User> {
        return await this.userRepository.findUserByEmail(email);
    }

    async updateUser(id: number, updateUserData: UpdateUserData): Promise<void> {
        return await this.userRepository.updateUser(id, updateUserData);
    }

    async deleteUser(id: number): Promise<void> {
        return await this.userRepository.deleteUser(id);
    }
}

export const userService = new UserService(userRepository);