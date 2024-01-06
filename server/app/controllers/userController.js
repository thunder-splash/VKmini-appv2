const ApiError = require('../error/ApiError')
const {User} = require('../models/models')
const jwt = require('jsonwebtoken')

const generateJwt = (vkId, name) => {
    return jwt.sign(
        {id, vkId, name},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {

    async registration(req, res, next) {
        try {
            const {vkId, last_name, first_name} = req.body
            const candidate = await User.findOne({where: {vkId}})
            if (candidate) {
                throw new next(ApiError.badRequest('Пользователь с таким vkId уже существует'))
            }
            const user = await User.create({vkId, name: first_name + ' ' + last_name});
            const token = generateJwt(user.id, user.vkId, user.name)
            return res.json({token})
        } catch (e) {
            new next(ApiError.internal(e.message))
        }
    }

    async login(req, res, next) {
        try {
            const {vkId, last_name, first_name} = req.body
            let user = await User.findOne({where: {vkId}})
            if (!user) {
                return res.json('Такого пользователя не существует, выполните api/user/registration')
            }
            if (user.name !== first_name + ' ' + last_name) {
                user.name = first_name + ' ' + last_name
                await user.save()
            }
            const token = generateJwt(user.vkId, user.name)
            return res.json({token})
        } catch (e) {
            new next(ApiError.internal(e.message))
        }
    }

    async delete (req, res, next) {
        try {
            const { vkId } = req.params.id
            const user = await User.destroy({ where: { vkId } })
            if (user[0] === 0){
                throw new next(ApiError.badRequest('Пользователь с таким vkId не найден'))
            }
            return res.json({ message: 'Пользователь удалён успешно' })
        } catch (e) {
            new next(ApiError.internal(e.message))
        }
    }

    async getAll (req, res, next) {
        try{
            const all = await User.findAll()
            return res.json(all)
        } catch (e) {
            new next(ApiError.internal(e.message))
        }
    }


    async getOne (req, res, next) {
        try{
            const ref = await User.findOne({
                where: { vkId: req.params.id
                }
            })
            return res.json(ref)
        } catch (e) {
            new next(ApiError.internal(e.message))
        }
    }

}

module.exports = new UserController()
