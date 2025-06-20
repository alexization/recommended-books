import {LoginUserData} from "../domain/dto/UserDto.js";
import {TokenPair} from "../utils/JwtUtils.js";
import {User} from "../domain/User.js";

export interface AuthServiceInterface {
    login(loginUserData: LoginUserData): Promise<TokenPair>;

    validateAccessToken(accessToken: string): Promise<User>;
}