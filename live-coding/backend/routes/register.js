
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { genSaltSync } = require('bcryptjs');
const { generateToken } = require('../utils/generate_jwt');
const prisma = new PrismaClient();


router.post('/register', async (req, res, next) => {

  const username = req.body.username;
  const password = req.body.password;

  var hashedPassword;


  const salt = bcrypt.genSaltSync(10)

  hashedPassword = bcrypt.hashSync(password, salt);

  try {
    const user = await prisma.user.create({
      data: {
        username: username,
        password: hashedPassword,
      }
    });
    const id = user.id
    res.status(201);
    res.json({
      "success": {
        user,
        "token": generateToken(id)
      }
    })
  }
  catch (err) {
    res.status(400)
    res.json({ "err": "Username already exists" });
    return;
  }

});

module.exports = router;