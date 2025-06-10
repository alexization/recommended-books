import {LoginUserData} from "../domain/dto/UserDto";
import {TokenPair} from "../utils/JwtUtils";

export interface AuthServiceInterface {
    login(loginUserData: LoginUserData): Promise<TokenPair>;
}