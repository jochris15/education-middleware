const express = require('express')
const AuthController = require('../controllers/AuthController')
const PatientController = require('../controllers/PatientController')
const router = express.Router()

router.get('/', (req, res) => {
    res.send('Hello world')
})

router.post('/login', AuthController.login)

// endpoint yang dibawah ini harus lewat function authentication dulu
router.get('/patients', PatientController.patientMedicalRecords)
router.get('/medicalRecords/:id', PatientController.findMedicalRecords) // pemasangan middleware secara endpoint level

module.exports = router