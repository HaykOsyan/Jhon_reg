const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const { User } = require('../models/models')
const jwt = require('jsonwebtoken')
const { body, validationResult } = require('express-validator');

const generateJwt = (id, email) => {
    return jwt.sign(
        { id, email },
        process.env.SECRET_KEY,
        { expiresIn: '24h' }
    )
}

class UserController {

    async registration(req, res) {
        await body('email').isEmail().normalizeEmail().run(req);
        await body('password').isLength({ min: 6 }).run(req);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(202).json({ errors: errors.array() });
        }

        const { email, password } = req.body;
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            // UPGRADE look if it is true writing 202 whent ... line 22 too
            return res.status(202).json({ errors: [{ msg: 'Email already exists' }] });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ email, password: hashedPassword });
        const token = generateJwt(user.id, user.email);
        return res.status(200).json(token);
    }

    async login(req, res, next) {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return next(ApiError.internal('No user with such email'));
        }

        const comparePassword = bcrypt.compareSync(password, user.password);
        if (!comparePassword) {
            return next(ApiError.internal('Wrong email or password'));
        }

        
        const token = generateJwt(user.id, user.email);
        return res.json(token);
    }


    async check(req, res) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        return res.json(token)
    }
}

module.exports = new UserController()