const categoryController = require("../controller/category-contoller");
const httpMocks = require("node-mocks-http");
const Category = require("../models/index").category;

jest.mock("../models");
jest.mock("../middleware/authentication");

let req, res;

beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
});

describe("category controller findAll", () => {
    it("category findall should return 200 ", async() => {
        Category.findAll.mockResolvedValue({ category: "category" });
        await categoryController.getAll(req, res);
        expect(res.statusCode).toBe(200);
    });

    it("category findall should return 503", async() => {
        const rejected = Promise.reject({ message: "internal server error" });
        Category.findAll.mockResolvedValue(rejected);
        await categoryController.getAll(req, res);
        expect(res.statusCode).toBe(503);
    });
});

describe("Category Controller ", () => {
    it("post category should return 201 ", async() => {
        Category.create.mockResolvedValue({ category: "computer" });
        await categoryController.postCategories(req, res);
        expect(res.statusCode).toBe(201);
    });

    it("post category should return 503 ", async() => {
        const rejected = Promise.reject({ message: "error" });
        Category.create.mockResolvedValue(rejected);
        await categoryController.postCategories(req, res);
        expect(res.statusCode).toBe(503);
    });
});

describe("Category Controller", () => {
    it("update Category should return 200 ", async() => {
        Category.update.mockResolvedValue({ Category: "Categorys" });
        await categoryController.updateCategories(req, res);
        expect(res.statusCode).toBe(500);
    });

    it("update Category should return 500 ", async() => {
        const rejected = Promise.reject({ message: "error" });
        Category.update.mockResolvedValue(rejected);
        await categoryController.updateCategories(req, res);
        expect(res.statusCode).toBe(500);
    });
});

describe("categoryController deleteCategory", () => {
    it("Category delete should return 200 deleted", async() => {
        Category.destroy.mockResolvedValue({ Category: "Category" });
        await categoryController.deleteCategories(req, res);
        expect(res.statusCode).toBe(200);
    });

    it("Category delete should return 503", async() => {
        const rejected = Promise.reject({ message: "internal server error" });
        Category.destroy.mockResolvedValue(rejected);
        await categoryController.deleteCategories(req, res);
        expect(res.statusCode).toBe(500);
    });
});