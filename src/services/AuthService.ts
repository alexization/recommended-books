import {AuthServiceInterface} from "../interfaces/AuthServiceInterface";
import {LoginUserData} from "../domain/dto/UserDto";
import {JwtUtils, TokenPair} from "../utils/JwtUtils";
import {userRepository} from "../repositories/UserRepository";
import {NotFoundError, ValidationError} from "../utils/AppError";
import {UserRepositoryInterface} from "../interfaces/UserRepositoryInterface";

export class AuthService implements AuthServiceInterface {

    constructor(private readonly userRepository: UserRepositoryInterface) {
        this.userRepository = userRepository;
    }

    async login(loginUserData: LoginUserData): Promise<TokenPair> {
        const user = await this.userRepository.findUserByEmail(loginUserData.email);

        if (!user) {
            throw new NotFoundError('해당 이메일을 가진 사용자가 없습니다.');
        }

        const isPasswordValidate = await user.validatePassword(loginUserData.password);

        if (!isPasswordValidate) {
            throw new ValidationError("이메일 또는 비밀번호가 올바르지 않습니다.");
        }

        return JwtUtils.generateJwtToken(user.id, user.email);
    }
}

export const authService = new AuthService(userRepository);