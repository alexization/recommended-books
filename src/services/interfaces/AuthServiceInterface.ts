import {LoginUserData} from "../../domain/dto/UserDto";
import {TokenPair} from "../../utils/JwtUtils";
import {User} from "../../domain/aggregates/User";

export interface AuthServiceInterface {
    login(loginUserData: LoginUserData): Promise<TokenPair>;

    validateAccessToken(accessToken: string): Promise<User>;
}