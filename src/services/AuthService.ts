import {AuthServiceInterface} from "./interfaces/AuthServiceInterface";
import {LoginUserData} from "../domain/dto/UserDto.js";
import {JwtUtils, TokenPair} from "../utils/JwtUtils.js";
import {userRepository} from "../repositories/UserRepository.js";
import {NotFoundError, ValidationError} from "../utils/AppError.js";
import {UserRepositoryInterface} from "../repositories/interfaces/UserRepositoryInterface";
import {User} from "../domain/User.js";
import {ErrorMessage} from "../utils/ErrorMessage.js";

export class AuthService implements AuthServiceInterface {

    constructor(private readonly userRepository: UserRepositoryInterface) {
        this.userRepository = userRepository;
    }

    async login(loginUserData: LoginUserData): Promise<TokenPair> {
        const user = await this.userRepository.findUserByEmail(loginUserData.email);

        if (!user) {
            throw new NotFoundError(ErrorMessage.USER_NOT_FOUND);
        }

        const isPasswordValidate = await user.validatePassword(loginUserData.password);

        if (!isPasswordValidate) {
            throw new ValidationError(ErrorMessage.PASSWORD_INVALID);
        }

        return JwtUtils.generateJwtToken(user.id, user.email);
    }

    async validateAccessToken(accessToken: string): Promise<User> {
        const payload = JwtUtils.verifyAccessToken(accessToken);

        return await this.userRepository.findUserByEmail(payload.email);
    }

    async refreshToken(refreshToken: string): Promise<{ user: User, tokenPair: TokenPair }> {
        const payload = JwtUtils.verifyRefreshToken(refreshToken);

        const user = await this.userRepository.findUserById(payload.userId);
        const tokenPair = JwtUtils.generateJwtToken(user.id, user.email);

        return {user, tokenPair};
    }
}

export const authService = new AuthService(userRepository);