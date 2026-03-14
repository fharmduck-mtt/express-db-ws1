const express = require('express');
const validateCreateUser = require('../middlewares/validateCreateUser');
const bcrypt = require('bcryptjs');
const usersRepo = require('../repositories/user.repo')


const router = express.Router();

router.post('/', validateCreateUser,async (req, res) => {

    try{
        const email = req.body.email.trim().toLowerCase()
        const name = req.body.name.trim()
        const password = req.body.password

        const passwordHash = await bcrypt.hash(password, 10);

        const user = await usersRepo.createUser(email, name, passwordHash)

        res.status(201).json({
            id: user.id,
            email: user.email,
            name: user.name,
            createdAt: user.created_at,
            });
        // console.log("password: ", passwordHash);
        // console.log("email:", email);
        // console.log("name:", name);
        // console.log("password:", password);

        res.json({data: user});
    } catch(error) {
        if (error && error.code === '23505') {
            return res.status(409).json({ Message: 'Email already exists'});
        }
    }
    
})

module.exports = router;