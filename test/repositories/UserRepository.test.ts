import {CreateUserData, UpdateUserData} from "../../src/domain/dto/UserDto";
import fs from "fs/promises";
import {NotFoundError, ValidationError} from '../../src/utils/AppError'
import {UserRepository} from "../../src/repositories/UserRepository";

jest.mock('fs/promises');
const mockedFs = fs as jest.Mocked<typeof fs>;

describe('UserRepository Tests', () => {

    let userRepository: UserRepository;

    beforeEach(() => {
        jest.clearAllMocks();

        userRepository = new UserRepository();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('createUser', () => {

        it('빈 파일에 첫 번째 사용자를 생성해야 한다.', async () => {
            /* Arrange */
            const createUserData: CreateUserData = {
                email: "test@email.com", name: "testUser", birth: 2000,
            };

            mockedFs.readFile.mockResolvedValue('[]');
            mockedFs.writeFile.mockResolvedValue();

            /* Act */
            const result = await userRepository.createUser(createUserData);

            /* Assert */
            expect(result.id).toBe(1);
            expect(result.email).toBe(createUserData.email);
            expect(result.name).toBe(createUserData.name);
            expect(result.birth).toBe(createUserData.birth);
            expect(result.createdAt).toBeDefined();
            expect(result.updatedAt).toBeDefined();
        });

        it('기존 사용자가 있으면 다음 ID를 사용해야 한다.', async () => {
            /* Arrange */
            const existedUsers = [{
                id: 1,
                email: 'user1@example.com',
                name: '유저1',
                birth: 1990,
                createdAt: '2025-01-01',
                updatedAt: '2025-01-01'
            }, {
                id: 3,
                email: 'user3@example.com',
                name: '유저3',
                birth: 1995,
                createdAt: '2025-01-01',
                updatedAt: '2025-01-01'
            }]

            const createUserData: CreateUserData = {
                email: 'new@email.com', name: 'newUser', birth: 2000
            };

            mockedFs.readFile.mockResolvedValue(JSON.stringify(existedUsers));
            mockedFs.writeFile.mockResolvedValue();

            /* Act */
            const result = await userRepository.createUser(createUserData);

            /* Assert */
            expect(result.id).toBe(4);
        });

        it('중복된 이메일로 사용자 생성 시 ValidationError가 발생해야 한다.', async () => {
            /* Arrange */
            const existedUser = [{
                id: 1,
                email: 'exist@email.com',
                name: 'existUser',
                birth: 1990,
                createdAt: '2025-01-01',
                updatedAt: '2025-01-01'
            }];

            const createUserData: CreateUserData = {
                email: 'exist@email.com', name: 'newUser', birth: 2000,
            };

            mockedFs.readFile.mockResolvedValue(JSON.stringify(existedUser));

            /* Act & Assert */
            await expect(userRepository.createUser(createUserData))
                .rejects.toThrow(ValidationError);
        })
    });

    describe('findUserById', () => {
        const users = [{
            id: 1,
            email: 'user1@example.com',
            name: '유저1',
            birth: 1990,
            createdAt: '2025-01-01',
            updatedAt: '2025-01-01'
        }, {
            id: 3,
            email: 'user3@example.com',
            name: '유저3',
            birth: 1995,
            createdAt: '2025-01-01',
            updatedAt: '2025-01-01'
        }]

        it('존재하는 사용자 ID로 조회 시 해당 사용자를 반환해야 한다.', async () => {
            /* Arrange */
            mockedFs.readFile.mockResolvedValue(JSON.stringify(users));

            /* Act */
            const result = await userRepository.findUserById(1);

            /* Assert */
            expect(result).toHaveLength(1);
            expect(result[0].id).toBe(1);
            expect(result[0].email).toBe('user1@example.com');
        });

        it('존재하지 않는 사용자 ID로 조회 시 빈 배열을 반환해야 한다.', async () => {
            /* Arrange */
            mockedFs.readFile.mockResolvedValue(JSON.stringify(users));

            /* Act */
            const result = await userRepository.findUserById(999);

            /* Assert */
            expect(result).toHaveLength(0);
        });
    });

    describe('findUserByEmail', () => {
        const users = [{
            id: 1,
            email: 'user1@example.com',
            name: '유저1',
            birth: 1990,
            createdAt: '2025-01-01',
            updatedAt: '2025-01-01'
        }, {
            id: 3,
            email: 'user3@example.com',
            name: '유저3',
            birth: 1995,
            createdAt: '2025-01-01',
            updatedAt: '2025-01-01'
        }]

        it('존재하는 사용자 Email로 조회 시 해당 사용자를 반환해야 한다.', async () => {
            /* Arrange */
            mockedFs.readFile.mockResolvedValue(JSON.stringify(users));

            /* Act */
            const result = await userRepository.findUserByEmail('user3@example.com');

            /* Assert */
            expect(result).toHaveLength(1);
            expect(result[0].id).toBe(3);
            expect(result[0].email).toBe('user3@example.com');
        });

        it('존재하지 않는 사용자 Email로 조회 시 빈 배열을 반환해야 한다.', async () => {
            /* Arrange */
            mockedFs.readFile.mockResolvedValue(JSON.stringify(users));

            /* Act */
            const result = await userRepository.findUserByEmail('user999@example.com');

            /* Assert */
            expect(result).toHaveLength(0);
        });
    });

    describe('updateUser', () => {
        it('존재하는 사용자 정보를 성공적으로 수정해야 한다.', async () => {
            /* Arrange */
            const user = [{
                id: 1,
                email: "exist@email.com",
                name: 'existUser',
                birth: 1990,
                updatedAt: '2025-01-01',
                createdAt: '2025-01-01'
            }];

            const updateUserData: UpdateUserData = {
                name: "updateName", birth: 2000,
            }

            mockedFs.readFile.mockResolvedValue(JSON.stringify(user));
            mockedFs.writeFile.mockResolvedValue();

            /* Act */
            await userRepository.updateUser(1, updateUserData);

            /* Assert */
            expect(mockedFs.writeFile).toHaveBeenCalled();

            const writeFileCall = mockedFs.writeFile.mock.calls[0];
            const savedData = JSON.parse(writeFileCall[1] as string);

            expect(savedData).toHaveLength(1);
            expect(savedData[0].id).toBe(1);
            expect(savedData[0].email).toBe("exist@email.com");
            expect(savedData[0].name).toBe('updateName');
            expect(savedData[0].birth).toBe(2000);
            expect(savedData[0].createdAt).toBe('2025-01-01');
            expect(new Date(savedData[0].updatedAt).getTime()).toBeGreaterThan(new Date('2024-01-01T00:00:00.000Z').getTime());
        });

        it('존재하지 않는 사용자 수정 시 NotFoundError가 발생해야 한다.', async () => {
            /* Arrange */
            mockedFs.readFile.mockResolvedValue('[]');

            const updateUserData: UpdateUserData = {
                name: 'updateName', birth: 2000
            };

            /* Act & Assert */
            await expect(userRepository.updateUser(999, updateUserData))
                .rejects.toThrow(NotFoundError);
        });
    });

    describe('deleteUser', () => {
        it('존재하는 사용자를 성공적으로 삭제해야 한다.', async () => {
            /* Arrange */
            const existedUsers = [{
                id: 1,
                email: 'user1@example.com',
                name: '유저1',
                birth: 1990,
                createdAt: '2025-01-01',
                updatedAt: '2025-01-01'
            }, {
                id: 3,
                email: 'user3@example.com',
                name: '유저3',
                birth: 1995,
                createdAt: '2025-01-01',
                updatedAt: '2025-01-01'
            }]

            mockedFs.readFile.mockResolvedValue(JSON.stringify(existedUsers));
            mockedFs.writeFile.mockResolvedValue();

            /* Act */
            await userRepository.deleteUser(1);

            /* Assert */
            expect(mockedFs.writeFile).toHaveBeenCalled();

            const writeFileCall = mockedFs.writeFile.mock.calls[0];
            const savedData = JSON.parse(writeFileCall[1] as string);

            expect(savedData).toHaveLength(1);
            expect(savedData[0].id).toBe(3);
        });
    });
})
