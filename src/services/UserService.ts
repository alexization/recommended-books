import {userRepository} from "../repositories/UserRepository";
import {UserRepositoryInterface} from "../interfaces/UserRepositoryInterface";
import {UserServiceInterface} from "../interfaces/UserServiceInterface";
import {CreateUserData, UpdateUserData} from "../domain/dto/UserDto";
import {User} from "../domain/User";

export class UserService implements UserServiceInterface {
    constructor(private readonly userRepository: UserRepositoryInterface) {
        this.userRepository = userRepository;
    }

    async initialize(): Promise<void> {
        await this.userRepository.initialize();
    }

    async createUser(createUserData: CreateUserData): Promise<User> {
        return await this.userRepository.createUser(createUserData);
    }

    async findUserById(id: string): Promise<User> {
        return await this.userRepository.findUserById(id);
    }

    async findUserByEmail(email: string): Promise<User> {
        return await this.userRepository.findUserByEmail(email);
    }

    async updateUser(id: string, updateUserData: UpdateUserData): Promise<void> {
        return await this.userRepository.updateUser(id, updateUserData);
    }

    async deleteUser(id: string): Promise<void> {
        return await this.userRepository.deleteUser(id);
    }
}

export const userService = new UserService(userRepository);