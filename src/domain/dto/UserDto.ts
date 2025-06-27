import {Grade} from "../enums/Grade.js";

export interface UserData {
    user_id: number;
    email: string;
    password: string;
    name: string;
    birth: number;
    grade: Grade;
    created_at: Date;
    updated_at: Date;
}

/**
 * @swagger
 * components:
 *  schemas:
 *      CreateUserData:
 *          type: object
 *          required:
 *              - email
 *              - password
 *              - name
 *              - birth
 *          properties:
 *              email:
 *                  type: string
 *                  format: email
 *                  example: "test@example.com"
 *              password:
 *                  type: string
 *                  example: "test1234"
 *              name:
 *                  type: string
 *                  example: "testUser"
 *              birth:
 *                  type: number
 *                  example: 2000
 * */
export interface CreateUserData {
    email: string;
    password: string;
    name: string;
    birth: number;
}

/**
 * @swagger
 * components:
 *  schemas:
 *      UpdateUserData:
 *          type: object
 *          required:
 *              - name
 *              - birth
 *          properties:
 *              name:
 *                  type: string
 *                  example: "testUser"
 *              birth:
 *                  type: number
 *                  example: 2000
 * */
export interface UpdateUserData {
    name: string;
    birth: number;
}

/**
 * @swagger
 * components:
 *  schemas:
 *      LoginUserData:
 *          type: object
 *          required:
 *              - email
 *              - password
 *          properties:
 *              email:
 *                  type: string
 *                  format: email
 *                  example: "test@example.com"
 *              password:
 *                  type: string
 *                  example: "test1234"
 * */
export interface LoginUserData {
    email: string;
    password: string;
}

export interface CountOfPostsPerUser {
    user_id: number;
    number_of_posts: bigint;
}