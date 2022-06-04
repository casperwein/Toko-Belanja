const transactionController = require("../controller/transaction-histories-controller");
const httpMocks = require("node-mocks-http");
const { transactionhistory: TransactionHostory } = require("../models/index");
const {
    product: Product,
    category: Category,
    user: User,
} = require("../models/index");

jest.mock("../models");
jest.mock("../middleware/authentication");

let req, res;

beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
});

describe("Transaction controller findAll by User", () => {
    it("transaction findall should return 200 ", async() => {
        TransactionHostory.findAll.mockResolvedValue({
            transaction: "transaction",
        });
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
        TransactionHostory.findAll.mockResolvedValue({
            Transaction: "Transaction",
        });
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

describe("Transaction controller findById", () => {
    it("Transaction Find By Id should return 200 ", async() => {
        TransactionHostory.findOne.mockResolvedValue({
            Transaction: "Transaction",
        });
        await transactionController.getTransactionById(req, res);
        expect(res.statusCode).toBe(200);
    });

    it("Transaction Find By Id should return 500", async() => {
        const rejected = Promise.reject({ message: "internal server error" });
        TransactionHostory.findOne.mockResolvedValue(rejected);
        await transactionController.getTransactionById(req, res);
        expect(res.statusCode).toBe(500);
    });
});

describe("Transaction controller post Transactions", () => {
    it("Transaction post transaction should return 400 ", async() => {
        const stockada = 100;
        Product.findOne.mockResolvedValue({ stockada }, false);
        await transactionController.postTransaction(req, res);
        expect(res.statusCode).toBe(400);
    });

    it("Transaction post transaction should return 400", async() => {
        const saldopas = 200000;
        Product.findOne.mockResolvedValue({ stockada: 40000 });
        User.findOne.mockResolvedValue({ saldopas }, false);
        await transactionController.postTransaction(req, res);
        expect(res.statusCode).toBe(400);
    });

    it("Transaction Find By Id should return 500", async() => {
        const rejected = Promise.reject({ message: "internal server error" });
        TransactionHostory.findOne.mockResolvedValue(rejected);
        User.findOne.mockResolvedValue(rejected);
        await transactionController.postTransaction(req, res);
        expect(res.statusCode).toBe(503);
    });

    it("Transaction Find By Id should return 500", async() => {
        const rejected = Promise.reject({ message: "internal server error" });
        TransactionHostory.findOne.mockResolvedValue(rejected);
        await transactionController.postTransaction(req, res);
        expect(res.statusCode).toBe(503);
    });

});