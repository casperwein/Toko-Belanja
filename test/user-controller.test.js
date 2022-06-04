const userController = require("../controller/user-controller");
const httpMocks = require("node-mocks-http");
const bcrypt = require("bcrypt");
const User = require("../models/index").user;
const generateToken = require("../middleware/authentication").generateToken;

jest.mock("../models");
jest.mock("../middleware/authentication");

let req, res

beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    bcrypt.compareSync = jest.fn().mockImplementation(() => true);
});

describe("userController findAll", () => {
    it("user findall should return 200 ", async() => {
        User.findAll.mockResolvedValue({ user: "user" });
        await userController.usergetall(req, res);
        expect(res.statusCode).toBe(200);
    });

    it("user findall should return 500", async() => {
        const rejected = Promise.reject({ message: "internal server error" });
        User.findAll.mockResolvedValue(rejected);
        await userController.usergetall(req, res);
        expect(res.statusCode).toBe(500);
    });
});

describe("User Controller register", () => {
    it("user register should return 400 ", async() => {
        const email = "email@gmail.com";
        User.findOne.mockResolvedValue({ rows: [email] });
        await userController.userRegister(req, res);
        expect(res.statusCode).toBe(400);
    });

    it("user register should return 200 ", async() => {
        User.findOne.mockResolvedValue(null);
        User.create.mockResolvedValue({ name: "user" });
        await userController.userRegister(req, res);
        expect(res.statusCode).toBe(201);
    });

    it("user register return error 500 test", async() => {
        const rejected = Promise.reject({ message: "can't sign up" });
        User.findOne.mockResolvedValue(null);
        User.create.mockResolvedValue(rejected);
        await userController.userRegister(req, res);
        expect(res.statusCode).toBe(500);
    });

    it("user register return error 500 test", async() => {
        const rejected = Promise.reject({ message: "can't sign up" });
        User.findOne.mockResolvedValue(rejected);
        await userController.userRegister(req, res);
        expect(res.statusCode).toBe(500);
    });
});

describe("userController login", () => {
    beforeAll(() => {
        bcrypt.hashSync = jest.fn();
        generateToken.mockReturnValue("get Token");
    });

    it("sign should return 400 if email not found", async() => {
        User.findOne.mockResolvedValue(null);
        await userController.userLogin(req, res);
        expect(res.statusCode).toBe(400);
    });

    it("User login should return 400 if password not match", async() => {
        const data = {
            email: "email",
            password: "wrongpassword",
        };
        User.findOne.mockResolvedValue(data);
        bcrypt.compareSync = jest.fn().mockImplementation(() => false);
        await userController.userLogin(req, res);
        expect(res.statusCode).toBe(400);
    });

    it("User login should return 200 ", async() => {
        User.findOne.mockResolvedValue({ user: "login" });
        userController.userLogin(req, res);
        expect(res.statusCode).toBe(200);
    });

    it("User login should return 500", async() => {
        const rejected = Promise.reject({ message: "can't sign in" });
        User.findOne.mockResolvedValue(rejected);
        await userController.userLogin(req, res);
        expect(res.statusCode).toBe(500);
    });
});

describe("userController updateUser", () => {
    it("User update should return 200 updated", async() => {
        User.update.mockResolvedValue({ user: "user" });
        await userController.userUpdate(req, res);
        expect(res.statusCode).toBe(500);
    });

    it("User update should return 500", async() => {
        const rejected = Promise.reject({ message: "internal server error" });
        User.update.mockResolvedValue(rejected);
        await userController.userUpdate(req, res);
        expect(res.statusCode).toBe(500);
    });
});

describe("userController userTopup", () => {
    it("user top up should return 400 if id not found", async() => {
        User.findOne.mockResolvedValue(null);
        await userController.userTopUp(req, res);
        expect(res.statusCode).toBe(400);
    });

    it("User update should return 200 updated", async() => {
        const user = {
            balance: 30000
        }
        const balance = 100000
        user.balance = user.balance + balance
        User.findOne.mockResolvedValue({ rows: ["balance"] });
        await userController.userTopUp(req, res);
        expect(res.statusCode).toBe(500);
    });

    it("user top up should return 500", async() => {
        const rejected = Promise.reject({ message: "internal server error" });
        User.findOne.mockResolvedValue(rejected);
        await userController.userTopUp(req, res);
        expect(res.statusCode).toBe(500);
    });
});

describe("userController deleteUser", () => {
    it("user delete should return 200 deleted", async() => {
        User.destroy.mockResolvedValue({ user: "user" });
        await userController.userDelete(req, res);
        expect(res.statusCode).toBe(200);
    });

    it("user delete should return 500", async() => {
        const rejected = Promise.reject({ message: "internal server error" });
        User.destroy.mockResolvedValue(rejected);
        await userController.userDelete(req, res);
        expect(res.statusCode).toBe(500);
    });
});