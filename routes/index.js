const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Me funciona la Api de Monguito, no lo puedo creer')
})

module.exports = router;