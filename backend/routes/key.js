const express = require('express')
const router = express.Router()

let currKey = "b"
// GET
router.get("/", async (req, res) => {
    res.status(200).send(currKey)
    // res.status(200).json(currKey)
})

// POST key
router.post("/:key", async (req, res) => {
    const key = req.params;
    currKey = key;
    res.status(201).json(req.params)
})

//POST OpenCVI

router.post("/OpenCVI", async (req, res) => {
    
})

module.exports = router
