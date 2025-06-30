import { User } from "../../../src/domain/aggregates/User";
import {mockCreateUserData} from "../../helpers/mockData";

describe('User Aggregate', () => {

    describe('create', () => {
        it('새로운 사용자를 생성해야 한다.', async () => {
            /* given */
            const createData = {...mockCreateUserData};

            /* when */
            const user = await User.create(createData);

            /* then*/
            const userPersistence = user.toPersistence();
            expect(userPersistence.password).not.toBe(createData.password);
            expect(userPersistence.password).toContain('$');

        });
    });
});