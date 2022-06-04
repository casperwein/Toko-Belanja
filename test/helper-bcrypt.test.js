const helper = require("../helpers/bcrypt")
const bcrypt = require("bcrypt")


describe("helper testing hash password", () => {
    it("should return 200 ", async() => {
        bcrypt.hashSync = jest.fn().mockImplementation();
        const userpassword = "user"
        await helper.hashPassword(userpassword);
        expect(bcrypt.hashSync).toHaveBeenCalled();
    });

    it("should return 200 ", async() => {
        bcrypt.compareSync = jest.fn().mockImplementation();
        const userpassword = "user"
        const password = "password"
        await helper.comparePassword(userpassword, password);
        expect(bcrypt.compareSync).toHaveBeenCalled();
    });
});