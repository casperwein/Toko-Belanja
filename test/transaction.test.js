const transactionController = require("../controller/transaction-histories-controller");
const httpMocks = require("node-mocks-http");
const { transactionhistory: TransactionHostory } = require("../models/index")
const { product: Product, category: Category, } = require("../models/index")

jest.mock("../models");
jest.mock("../middleware/authentication");

let req, res;

beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
});

describe("Transaction controller findAll by User", () => {
    it("transaction findall should return 200 ", async() => {
        TransactionHostory.findAll.mockResolvedValue({ transaction: "transaction" });
        await transactionController.getAllByUser(req, res);
        expect(res.statusCode).toBe(200);
    });

    it("transaction findall should return 500", async() => {
        const rejected = Promise.reject({ message: "internal server error" });
        TransactionHostory.findAll.mockResolvedValue(rejected);
        await transactionController.getAllByUser(req, res);
        expect(res.statusCode).toBe(500);
    });
});


describe("Transaction controller findAll", () => {
    it("Transaction findall should return 200 ", async() => {
        TransactionHostory.findAll.mockResolvedValue({ Transaction: "Transaction" });
        await transactionController.getAllByAdmin(req, res);
        expect(res.statusCode).toBe(200);
    });

    it("Transaction findall should return 500", async() => {
        const rejected = Promise.reject({ message: "internal server error" });
        TransactionHostory.findAll.mockResolvedValue(rejected);
        await transactionController.getAllByAdmin(req, res);
        expect(res.statusCode).toBe(500);
    });
});