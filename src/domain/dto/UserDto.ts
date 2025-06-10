export interface UserData {
    id: number;
    email: string;
    password: string;
    name: string;
    birth: number;
    createdAt: string;
    updatedAt: string;
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