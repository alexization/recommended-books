import {Grade} from "../enums/Grade";

export interface UserData {
    userId: number;
    email: string;
    password: string;
    name: string;
    birth: number;
    grade: Grade;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateUserData {
    email: string;
    password: string;
    name: string;
    birth: number;
}

export interface UpdateUserData {
    name: string;
    birth: number;
}

export interface LoginUserData {
    email: string;
    password: string;
}