import {userRepository} from "../repositories/UserRepository";
import {UserRepositoryInterface} from "../interfaces/UserRepositoryInterface";
import {UserServiceInterface} from "../interfaces/UserServiceInterface";
import {CreateUserData, UserData} from "../domain/dto/UserDto";

export class UserService implements UserServiceInterface {
    constructor(private readonly userRepository: UserRepositoryInterface) {
        this.userRepository = userRepository;
    }

    async initialize(): Promise<void> {
        await this.userRepository.initialize();
    }

    async createUser(createUserData: CreateUserData): Promise<UserData> {
        return await this.userRepository.createUser(createUserData);
    }

    async findUserById(id: number): Promise<UserData[]> {
        return await this.userRepository.findUserById(id);
    }

    async findUserByEmail(email: string): Promise<UserData[]> {
        return await this.userRepository.findUserByEmail(email);
    }

    async updateUser(updateUserData: UserData): Promise<UserData> {
        return await this.userRepository.updateUser(updateUserData);
    }

    async deleteUser(id: number): Promise<void> {
        return await this.userRepository.deleteUser(id);
    }
}

export const userService = new UserService(userRepository);