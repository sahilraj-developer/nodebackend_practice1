const express = require('express');
const { getalldata, register } = require('../controller/user.controller');

const router = express.Router();


router.get("/getalldata",getalldata)

router.post("/register",register)


module.exports = router;