export interface CreateUserData {
    email: string;
    name: string;
    birth: number;
}

export interface UserData {
    id: number;
    email: string;
    name: string;
    birth: number;
    createdAt: string;
    updatedAt: string;
}