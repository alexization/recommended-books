import dotenv from "dotenv";
import {afterEach} from "jest-circus";

dotenv.config({path: ".env.test"});

afterEach(() => {
    jest.clearAllMocks();
});