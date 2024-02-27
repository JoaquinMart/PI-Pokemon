const { Router } = require("express");
const router = Router();
const { getTypesHandler } = require('../handlers/getTypeHandler');

router.use("/", getTypesHandler);

module.exports = router;