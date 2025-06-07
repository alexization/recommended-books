import {CreateUserData} from "../../src/domain/dto/UserDto";
import fs from "fs/promises";
import {userRepository} from '../../src/repositories/UserRepository';
import {ValidationError} from '../../src/utils/AppError'

jest.mock('fs/promises');
const mockedFs = fs as jest.Mocked<typeof fs>;

describe('createUser', () => {

    it('빈 파일에 첫 번째 사용자를 생성해야 한다.', async () => {
        /* Arrange */
        const createUserData: CreateUserData = {
            email: "test@email.com",
            name: "testUser",
            birth: 2000,
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
        const existedUsers = [
            {
                id: 1,
                email: 'user1@example.com',
                name: '유저1',
                birth: 1990,
                createdAt: '2025-01-01',
                updatedAt: '2025-01-01'
            },
            {
                id: 3,
                email: 'user3@example.com',
                name: '유저3',
                birth: 1995,
                createdAt: '2025-01-01',
                updatedAt: '2025-01-01'
            }
        ]

        const createUserData: CreateUserData = {
            email: 'new@email.com',
            name: 'newUser',
            birth: 2000
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
        const existedUser = [
            {
                id: 1,
                email: 'exist@email.com',
                name: 'existUser',
                birth: 1990,
                createdAt: '2025-01-01',
                updatedAt: '2025-01-01'
            }
        ];

        const createUserData: CreateUserData = {
            email: 'exist@email.com',
            name: 'newUser',
            birth: 2000,
        };

        mockedFs.readFile.mockResolvedValue(JSON.stringify(existedUser));

        /* Act & Assert */
        await expect(userRepository.createUser(createUserData))
            .rejects.toThrow(ValidationError);

        expect(mockedFs.writeFile).not.toHaveBeenCalled();
    })
});