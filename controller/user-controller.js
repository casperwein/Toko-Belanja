const User = require("../models/index").user;
const { comparePassword } = require("../helpers/bcrypt")
const { generateToken } = require("../middleware/authentication")

const usergetall = async(req, res) => {
    await User.findAll().then(result => {
        res.status(200).json({
            result
        })
    }).catch(error => {
        res.status(500).json({
            message: "INTERNAL SERVER ERROR",
            error: error.message
        })
    })
}

const userRegister = async(req, res) => {
    const { full_name, email, gender, password } = req.body;

    await User.findOne({ where: { email } }).then(users => {
        if (users) {
            return res.status(400).json({
                msg: "Email address already in use. Try another one!"
            })
        }
        return User.create({
            full_name,
            email,
            password,
            gender,
            role: "customer",
        }).then(result => {
            res.status(201).json({
                id: result.id,
                full_name: result.full_name,
                email: result.email,
                gender: result.gender,
                balance: `Rp. ${result.balance}`,
                createdAt: result.createdAt
            })
        }).catch(error => {
            res.status(500).json({ message: "INTERNAL SERVER ERROR", error })
        })
    }).catch(error => {
        res.status(500).json({ message: "INTERNAL SERVER ERROR", error })
    })
}

const userLogin = async(req, res) => {
    const { email, password } = req.body;
    await User.findOne({ where: { email } }).then(user => {
        if (!user) {
            return res.status(400).json({
                message: "email not found!!"
            })
        }
        const isValid = comparePassword(password, user.password)
        if (!isValid) {
            return res.status(400).json({ message: "password not match" })
        }
        const data = {
            id: user.id,
            email: user.email,
            role: user.role,
            gender: user.gender,
            balance: user.balance,
        }
        const token = generateToken(data)
        return res.status(200).json({ token })
    }).catch(error => {
        res.status(500).json({ message: "INTERNAL SERVER ERROR", error })
    })
}


const userUpdate = async(req, res) => {
    const userId = req.params.userId
    const data = { full_name, email } = req.body
    await User.update(data, { where: { id: userId }, returning: true }).then(user => {
        res.status(200).json({
            user: {
                id: user[1][0].id,
                full_name: user[1][0].full_name,
                email: user[1][0].email,
                createdAt: user[1][0].createdAt,
                updatedAt: user[1][0].updatedAt
            }
        });
    }).catch(error => {
        res.status(500).json({ message: "INTERNAL SERVER ERROR", error });
    });
}

const userTopUp = async(req, res) => {
    const user_id = req.id;
    const balance = req.body.balance;
    await User.findOne({ where: { id: user_id } }).then(user => {
        if (!user) {
            return res.status(400).json({ message: "email not found!!" })
        }
        const current_balance = user.balance + balance;
        return User.update({ balance: current_balance }, {
            where: { id: user_id },
            returning: true
        }).then(result => {
            const money = result[1][0].balance;
            res.status(200).json({
                message: `Your balance has been succesfully update to  Rp. ${money}`,
            })
        }).catch(error => {
            res.status(500).json({ message: "INTERNAL SERVER ERROR", error });
        })
    }).catch(error => {
        res.status(500).json({ message: "INTERNAL SERVER ERROR", error });
    })
}

const userDelete = async(req, res) => {
    const userId = req.params.userId;
    await User.destroy({ where: { id: userId } })
        .then(() => {
            res.status(200).json({ msg: "Your account  has been successfully deleted" });
        }).catch(error => {
            res.status(500).json({ message: "INTERNAL SERVER ERROR", error });
        });
}

module.exports = {
    userRegister,
    userLogin,
    userUpdate,
    userTopUp,
    userDelete,
    usergetall
}