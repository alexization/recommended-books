import {userRepository} from "../repositories/UserRepository";
import {User, UserData} from "../domain/User";
import {UserRepositoryInterface} from "../interfaces/UserRepositoryInterface";

export class UserService {
    private readonly userRepository: UserRepositoryInterface;

    constructor(userRepository: UserRepositoryInterface) {
        this.userRepository = userRepository;
    }

    async initialize(): Promise<void> {
        await this.userRepository.initialize();
    }

    async createUser(userData: UserData): Promise<UserData> {
        const newUser = new User({...userData});
        return await this.userRepository.createUser(newUser);
    }

    async findUserById(id: string | number): Promise<UserData[]> {
        return await this.userRepository.findUserById(id);
    }

    async findUserByEmail(email: string): Promise<UserData[]> {
        return await this.userRepository.findUserByEmail(email);
    }

    async updateUser(updateUserData: UserData): Promise<UserData> {
        return await this.userRepository.updateUser(updateUserData);
    }

    async deleteUser(id: string | number): Promise<void> {
        return await this.userRepository.deleteUser(id);
    }
}

export const userService = new UserService(userRepository);