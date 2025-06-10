import {userService} from "../services/UserService";
import {BadRequestError, ValidationError} from "../utils/AppError";
import {ResponseHandler} from "../utils/ResponseHandler";
import {UserServiceInterface} from "../interfaces/UserServiceInterface";
import {Response} from "express";
import {UserRequest} from "../requests/UserRequest";
import {UpdateUserData} from "../domain/dto/UserDto";

export class UserController {
    constructor(private readonly userService: UserServiceInterface) {
        this.userService = userService;
    }

    async createUser(req: UserRequest.CreateRequest, res: Response): Promise<void> {

        if (!req.body) {
            throw new BadRequestError("생성 데이터가 없습니다.");
        }

        this.validateEmail(req.body.email);
        this.validateName(req.body.name);

        const newUser = await this.userService.createUser({...req.body});

        ResponseHandler.success(res, '사용자가 정상적으로 등록되었습니다.', newUser);
    }

    async findUserById(req: UserRequest.FindByIdRequest, res: Response): Promise<void> {

        if (!req.params) {
            throw new BadRequestError("조회 데이터가 없습니다.");
        }

        const user = await this.userService.findUserById(req.params.id);

        ResponseHandler.success(res, '사용자 정보를 성공적으로 가져왔습니다.', user);
    }

    async findUserByEmail(req: UserRequest.FindByEmailRequest, res: Response): Promise<void> {

        if (!req.query) {
            throw new BadRequestError("조회 데이터가 올바르지 않습니다.");
        }

        this.validateEmail(req.query.email);

        const user = await this.userService.findUserByEmail(req.query.email);

        ResponseHandler.success(res, '사용자 정보를 성공적으로 가져왔습니다.', user);
    }

    async updateUser(req: UserRequest.UpdateRequest, res: Response): Promise<void> {

        if (!req.params) {
            throw new BadRequestError("조회 데이터가 없습니다.");
        }

        const updateUserData: UpdateUserData = {...req.body};

        await this.userService.updateUser(req.params.id, updateUserData);

        ResponseHandler.success(res, '사용자 정보를 성공적으로 수정했습니다.', null);
    }

    async deleteUser(req: UserRequest.DeleteRequest, res: Response): Promise<void> {

        if (!req.params) {
            throw new BadRequestError("조회 데이터가 없습니다.");
        }

        await this.userService.deleteUser(req.params.id);

        ResponseHandler.success(res, '사용자를 성공적으로 삭제했습니다.', null);
    }

    validateEmail(email: string): void {
        if (!email || email.trim() === '') {
            throw new ValidationError("이메일은 필수 입력 사항입니다.");
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new ValidationError("올바른 이메일 형식이 아닙니다.");
        }
    }

    validateName(name: string): void {
        if (!name || name.trim() === '') {
            throw new ValidationError("이름은 필수 입력 사항입니다.");
        }
        if (name.length > 10) {
            throw new ValidationError("이름은 10글자 이내여야 합니다.");
        }
    }
}

export const userController = new UserController(userService);