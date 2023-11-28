const { Patient, MedicalRecord } = require('../models')
const authorization = async (req, res, next) => {
    try {
        const { userId, role } = req.loginInfo
        const { id } = req.params

        if (role == "Patient") {
            const patient = await Patient.findOne({
                where: {
                    userId
                }
            })

            if (!patient) {
                throw { name: "Forbidden" }
            }

            const medicalRecord = await MedicalRecord.findByPk(id)

            if (!medicalRecord) {
                throw { name: "Forbidden" }
            }

            if (patient.id !== medicalRecord.patientId) {
                throw { name: "Forbidden" }
            }
        }

        next()
    } catch (err) {
        next(err)
    }
}

module.exports = authorization