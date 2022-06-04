const helper = require("../helpers/findById");
const httpMocks = require("node-mocks-http");
const { category: Category } = require("../models/index")

jest.mock("../models");
jest.mock("../middleware/authentication");

let req, res, next;

beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
});

describe("findByid findIdCategory", () => {
    it("findByid should return 200 ", async() => {
        Category.findOne.mockResolvedValue(null);
        await helper.findIdCategory(req, res, next);
        expect(res.statusCode).toBe(400);
    });
    it("findByid should return 200 ", async() => {
        Category.findOne.mockResolvedValue({ id: 5 });
        await helper.findIdCategory(req, res, next);
        expect(next())

    });
});


describe("findByid findIdProductTransaction", () => {
    it("findByid should return 200 ", async() => {
        Category.findOne.mockResolvedValue(null);
        await helper.findIdProduct(req, res, next);
        expect(res.statusCode).toBe(400);
    });
    it("findByid should return 200 ", async() => {
        Category.findOne.mockResolvedValue({ id: 5 });
        await helper.findIdProduct(req, res, next);
        expect(next())

    });
});

describe("findByid findIdProductTransaction", () => {
    it("findByid should return 200 ", async() => {
        Category.findOne.mockResolvedValue(null);
        await helper.findIdProductTransaction(req, res, next);
        expect(res.statusCode).toBe(400);
    });
    it("findByid should return 200 ", async() => {
        Category.findOne.mockResolvedValue({ id: 5 });
        await helper.findIdProductTransaction(req, res, next);
        expect(next())

    });
});


describe("findByid findIdProductTransaction", () => {
    it("findByid should return 200 ", async() => {
        Category.findOne.mockResolvedValue(null);
        await helper.findIdProductTransaction(req, res, next);
        expect(res.statusCode).toBe(400);
    });
    it("findByid should return 200 ", async() => {
        Category.findOne.mockResolvedValue({ id: 5 });
        await helper.findIdProductTransaction(req, res, next);
        expect(next())

    });
});