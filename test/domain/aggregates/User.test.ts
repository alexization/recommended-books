import {User} from "../../../src/domain/aggregates/User";
import {mockCreateUserData, mockUserData} from "../../helpers/mockData";
import {Grade} from "../../../src/domain/enums/Grade";
import {Password} from "../../../src/domain/valueObjects/Password";

describe('User Aggregate', () => {

    describe('create', () => {
        it('새로운 사용자를 생성해야 한다.', async () => {
            /* given */
            const createData = {...mockCreateUserData};

            /* when */
            const user = await User.create(createData);

            /* then*/
            expect(user).toBeDefined();
            expect(user.email).toBe(createData.email);
            expect(user.grade).toBe(Grade.BRONZE);

        });

        it('비밀번호는 해시되어야 한다.', async () => {
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

    describe('changePassword', () => {
        it('비밀번호를 변경해야 한다.', async () => {
            /* given */
            const user = User.fromJson(mockUserData);
            const newPassword = "newPassword0106";

            /* when */
            await user.changePassword(newPassword);

            /* then*/
            const persistence = user.toPersistence();
            expect(persistence.password).not.toBe(mockUserData.password);
            expect(persistence.updated_at).not.toBe(mockUserData.updated_at);

        });
    });

    describe('updateProfile', () => {
        it('프로필 정보를 수정해야 한다.', () => {
            /* given */
            const user = User.fromJson(mockUserData);
            const newName = "updateName";
            const newBirth = 2001;

            /* when */
            user.updateProfile(newName, newBirth);

            /* then*/
            const persistence = user.toPersistence();
            expect(persistence.name).toBe(newName);
            expect(persistence.birth).toBe(newBirth);

        });
    });

    describe('validatePassword', () => {
        it('올바른 비밀번호로 검증에 성공해야 한다.', async () => {
            /* given */
            const plainPassword = "plainPassword";
            const hashedPassword = await new Password(plainPassword).hash();
            const userData = {
                ...mockUserData,
                password: hashedPassword.getValue(),
            }
            const user = User.fromJson(userData);

            /* when */
            const isValid = await user.validatePassword(plainPassword);

            /* then*/
            expect(isValid).toBe(true);

        });

        it('잘못된 비밀번호로 검증에 실패해야 한다.', async () => {
            /* given */
            const user = User.fromJson(mockUserData);

            /* when */
            const isValid = await user.validatePassword("wrongPassword");

            /* then*/
            expect(isValid).toBe(false);

        })
    });

    describe('canReserveBookOn', () => {
        it('BRONZE 등급은 3일 전부터 예약 가능해야 한다.', () => {
            /* given */
            const user = User.fromJson({...mockUserData, grade: Grade.BRONZE});
            const today = new Date("2025-01-06");
            const reservationDate = new Date("2025-01-09");

            /* when */
            jest.useFakeTimers().setSystemTime(today);
            const canReserve = user.canReserveBookOn(reservationDate);

            /* then*/
            expect(canReserve).toBe(true);

            jest.useRealTimers();
        })

        it('SILVER 등급은 5일 전부터 예약 가능해야 한다.', () => {
            /* given */
            const user = User.fromJson({...mockUserData, grade: Grade.SILVER});
            const today = new Date("2025-01-06");
            const reservationDate = new Date("2025-01-11");

            /* when */
            jest.useFakeTimers().setSystemTime(today);
            const canReserve = user.canReserveBookOn(reservationDate);

            /* then*/
            expect(canReserve).toBe(true);

            jest.useRealTimers();
        })

        it('GOLD 등급은 7일 전부터 예약 가능해야 한다.', () => {
            /* given */
            const user = User.fromJson({...mockUserData, grade: Grade.GOLD});
            const today = new Date("2025-01-06");
            const reservationDate = new Date("2025-01-13");

            /* when */
            jest.useFakeTimers().setSystemTime(today);
            const canReserve = user.canReserveBookOn(reservationDate);

            /* then*/
            expect(canReserve).toBe(true);

            jest.useRealTimers();
        });

        it('예약 가능 기간이 아니라면 false를 반환해야 한다.', () => {
            /* given */
            const user = User.fromJson({...mockUserData, grade: Grade.BRONZE});
            const today = new Date("2025-01-06");
            const reservationDate = new Date("2025-01-13");

            /* when */
            jest.useFakeTimers().setSystemTime(today);
            const canReserve = user.canReserveBookOn(reservationDate);

            /* then*/
            expect(canReserve).toBe(false);

            jest.useRealTimers();
        });
    });

    describe('calculateReturnDate', () => {
        it('BRONZE 등급은 14일 후 반납해야 한다', () => {
            /* given */
            const user = User.fromJson({...mockUserData, grade: Grade.BRONZE})
            const loanStartDate = new Date("2025-01-01");

            /* when */
            const returnDate = user.calculateReturnDate(loanStartDate);

            /* then*/
            const expectedDate = new Date("2025-01-15");
            expect(returnDate).toEqual(expectedDate);

        });

        it('SILVER 등급은 21일 후 반납해야 한다', () => {
            /* given */
            const user = User.fromJson({...mockUserData, grade: Grade.SILVER})
            const loanStartDate = new Date("2025-01-01");

            /* when */
            const returnDate = user.calculateReturnDate(loanStartDate);

            /* then*/
            const expectedDate = new Date("2025-01-22");
            expect(returnDate).toEqual(expectedDate);

        });

        it('GOLD 등급은 28일 후 반납해야 한다', () => {
            /* given */
            const user = User.fromJson({...mockUserData, grade: Grade.GOLD})
            const loanStartDate = new Date("2025-01-01");

            /* when */
            const returnDate = user.calculateReturnDate(loanStartDate);

            /* then*/
            const expectedDate = new Date("2025-01-29");
            expect(returnDate).toEqual(expectedDate);

        });
    });
});