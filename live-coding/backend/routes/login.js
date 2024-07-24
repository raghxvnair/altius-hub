
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { generateToken } = require('../utils/generate_jwt');
const prisma = new PrismaClient();


router.post('/login', async (req, res, next) => {

    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
        res.status(400);
        res.json({ "err": "Please add all fields" })

    }

    const user = await prisma.user.findFirst({
        where: {
            username: username
        }
    });

    if (user && (await bcrypt.compare(password, user.password))) {
        const id = user.id
        res.status(200)
        res.json({
            "success": {
                user,
                "token": generateToken(id)
            }
        })
    } else {
        res.status(400);
        res.json({ "err": "Invalid Creds" })
    }
});

module.exports = router;