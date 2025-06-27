import {AuthServiceInterface} from "./interfaces/AuthServiceInterface";
import {LoginUserData} from "../domain/dto/UserDto.js";
import {JwtUtils, TokenPair} from "../utils/JwtUtils.js";
import {userRepository} from "../repositories/UserRepository.js";
import {AppError, NotFoundError, ValidationError} from "../exception/AppError";
import {UserRepositoryInterface} from "../repositories/interfaces/UserRepositoryInterface";
import {User} from "../domain/aggregates/User";
import {ErrorMessage} from "../exception/ErrorMessage";

export class AuthService implements AuthServiceInterface {
    private readonly userRepository: UserRepositoryInterface

    constructor() {
        this.userRepository = userRepository;
    }

    async login(loginUserData: LoginUserData): Promise<TokenPair> {
        const user = await this.userRepository.findByEmail(loginUserData.email);

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

        const user = await this.userRepository.findByEmail(payload.email);
        if (!user) {
            throw new AppError(ErrorMessage.USER_NOT_FOUND);
        }

        return user;
    }

    async refreshToken(refreshToken: string): Promise<{ user: User, tokenPair: TokenPair }> {
        const payload = JwtUtils.verifyRefreshToken(refreshToken);

        const user = await this.userRepository.findById(payload.userId);
        if (!user) {
            throw new AppError(ErrorMessage.USER_NOT_FOUND);
        }

        const tokenPair = JwtUtils.generateJwtToken(user.id, user.email);

        return {user, tokenPair};
    }
}

export const authService = new AuthService();