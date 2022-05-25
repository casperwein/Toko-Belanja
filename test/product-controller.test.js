const productController = require("../controller/product-controller");
const httpMocks = require("node-mocks-http");
const { product: Product, category: Category } = require("../models/index")

jest.mock("../models");
jest.mock("../middleware/authentication");

let req, res;

beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
});


describe("Product controller findAll", () => {
    it("Product findall should return 200 ", async() => {
        Product.findAll.mockResolvedValue({ Product: "Product" });
        await productController.getProducts(req, res);
        expect(res.statusCode).toBe(200);
    });

    it("Product findall should return 503", async() => {
        const rejected = Promise.reject({ message: "internal server error" });
        Product.findAll.mockResolvedValue(rejected);
        await productController.getProducts(req, res);
        expect(res.statusCode).toBe(500);
    });
});

describe("Product Controller ", () => {
    it("Product top up should return 400 if id not found", async() => {
        Category.findOne.mockResolvedValue(null);
        await productController.postProducts(req, res);
        expect(res.statusCode).toBe(400);
    });

    it("post Product should return 201 ", async() => {
        Category.findOne.mockResolvedValue({ id: 3 });
        Product.create.mockResolvedValue({ Product: "computer" });
        await productController.postProducts(req, res);
        expect(res.statusCode).toBe(201);
    });

    it("post Product should return 500 ", async() => {
        const rejected = Promise.reject({ message: "error" });
        Category.findOne.mockResolvedValue({ id: 3 });
        Product.create.mockResolvedValue(rejected);
        await productController.postProducts(req, res);
        expect(res.statusCode).toBe(500);
    });

    it("post Product should return 500 ", async() => {
        const rejected = Promise.reject({ message: "error" });
        Category.findOne.mockResolvedValue(rejected);
        await productController.postProducts(req, res);
        expect(res.statusCode).toBe(500);
    });
});


describe("Product updateProduct Testing", () => {
    it("update Product should return 200 ", async() => {
        Product.update.mockResolvedValue({ Product: "Products" });
        await productController.updateProducts(req, res);
        expect(res.statusCode).toBe(200);
    });

    it("update Product should return 503 ", async() => {
        const rejected = Promise.reject({ message: "error" });
        Product.update.mockResolvedValue(rejected);
        await productController.updateProducts(req, res);
        expect(res.statusCode).toBe(500);
    });
});


describe("Product Controller update CategoryID", () => {
    it("Patch Category Product should return 400 if id not found", async() => {
        Category.findOne.mockResolvedValue(null);
        await productController.updateCategoryId(req, res);
        expect(res.statusCode).toBe(400);
    });

    it("update Product should return 200 ", async() => {
        Category.findOne.mockResolvedValue({ id: 3 });
        Product.update.mockResolvedValue({ product: "laptop" });
        await productController.updateProducts(req, res);
        expect(res.statusCode).toBe(200);
    });

    it("Patch Category Product should return 500 ", async() => {
        const rejected = Promise.reject({ message: "error" });
        Category.findOne.mockResolvedValue({ id: 3 });
        Product.update.mockResolvedValue(rejected);
        await productController.updateCategoryId(req, res);
        expect(res.statusCode).toBe(500);
    });

    it("Patch Category Product should return 500 ", async() => {
        const rejected = Promise.reject({ message: "error" });
        Category.findOne.mockResolvedValue(rejected);
        await productController.updateCategoryId(req, res);
        expect(res.statusCode).toBe(500);
    });
});

describe("Product Controller delete product", () => {
    it("Product delete should return 200 deleted", async() => {
        Product.destroy.mockResolvedValue({ Product: "Product" });
        await productController.deleteProducts(req, res);
        expect(res.statusCode).toBe(200);
    });

    it("Product delete should return 503", async() => {
        const rejected = Promise.reject({ message: "internal server error" });
        Product.destroy.mockResolvedValue(rejected);
        await productController.deleteProducts(req, res);
        expect(res.statusCode).toBe(500);
    });
});