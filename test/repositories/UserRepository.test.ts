import {UserRepositoryInterface} from "../../src/interfaces/UserRepositoryInterface";
import {CreateUserData, UpdateUserData, UserData} from "../../src/domain/dto/UserDto";
import {User} from "../../src/domain/User";
import {AppError} from "../../src/utils/AppError";
import {UserService} from "../../src/services/UserService";

class MockUserRepository implements UserRepositoryInterface {
    private users: UserData[] = []
    private nextId = 1;

    async initialize(): Promise<void> {
        this.users = [];
        this.nextId = 1;
    }

    async createUser(createUserData: CreateUserData): Promise<User> {
        const existingUser = this.users.find(user => user.email === createUserData.email);
        if (existingUser) {
            throw new AppError("이미 가입한 이메일입니다.");
        }

        const newUser = User.create(this.nextId++, createUserData);
        this.users.push(newUser.toJSON());

        return newUser;
    }

    async deleteUser(id: number): Promise<void> {
        return Promise.resolve(undefined);
    }

    async findUserByEmail(email: string): Promise<UserData[]> {
        return Promise.resolve([]);
    }

    async findUserById(id: number): Promise<UserData[]> {
        return Promise.resolve([]);
    }

    async updateUser(id: number, updateUserData: UpdateUserData): Promise<void> {
        return Promise.resolve(undefined);
    }


}

describe("UserRepository", () => {
    let userService: UserService;
    let mockRepository: MockUserRepository;

    beforeEach(async () => {
        mockRepository = new MockUserRepository();
        userService = new UserService(mockRepository);
        await userService.initialize();
    });

    describe("createUser", () => {
        it('새로운 사용자를 성공적으로 생성해야 한다.', async () => {
            /* Arrange */
            const createUserData: CreateUserData = {
                email: "test@example.com",
                name: "테스트",
                birth: 2000
            };

            /* Act */
            const result = await userService.createUser(createUserData);

            /* Assert */
            expect(result).toBeDefined();
            expect(result.email).toBe(createUserData.email);
            expect(result.name).toBe(createUserData.name);
            expect(result.birth).toBe(createUserData.birth);
            expect(result.id).toBe(1);
        });

        it("중복된 이메일로 사용자를 생성할 경우 에러가 발생해야 한다.", async () => {
            /* Arrange */
            const createUserData: CreateUserData = {
                email: "test@example.com",
                name: "테스트",
                birth: 2000
            };

            await userService.createUser(createUserData);

            const duplicateUserData: CreateUserData = {
                email: "test@example.com",
                name: "이메일 중복 테스트 유저",
                birth: 2000
            };

            /* Act */
            /* Assert */
            await expect(userService.createUser(duplicateUserData))
                .rejects.toThrow("이미 가입한 이메일입니다.");
        });
    });
});