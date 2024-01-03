const express = require('express')
const AuthController = require('../controllers/AuthController')
const PatientController = require('../controllers/PatientController')
const router = express.Router()
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.get('/', (req, res) => {
    res.send('Hello world')
})

router.post('/login', AuthController.login)

router.use(authentication) // pemasangan middleware secara router-level

// endpoint yang dibawah ini harus lewat function authentication dulu
router.get('/patients', PatientController.patientMedicalRecords)
router.get('/medicalRecords/:id', authorization, PatientController.findMedicalRecords) // pemasangan middleware secara endpoint level

module.exports = router