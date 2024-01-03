const { Patient, Doctor, MedicalRecord } = require('../models/index')

class PatientController {
    static async patientMedicalRecords(req, res, next) { // data pasien
        try {
            const { userId } = req.loginInfo

            const patientMedicalRecordData = await Patient.findOne({
                include: {
                    model: MedicalRecord,
                    attributes: [
                        'diagnosis',
                        'treatment',
                        'cost'
                    ],
                    include: {
                        model: Doctor,
                        attributes: [
                            'firstName', 'speciality'
                        ]
                    }
                },
                attributes: [
                    'id', 'fullname'
                ],
                where: {
                    userId
                }
            })

            if (!patientMedicalRecordData) {
                throw ({ message: "NotFound" })
            }

            res.status(200).json({
                message: 'Data pasien berhasil didapatkan',
                data: patientMedicalRecordData
            })
        } catch (err) {
            next(err)
        }
    }

    static async findMedicalRecords(req, res, next) { // medical record scr detail
        try {
            const { id } = req.params

            const medicalRecord = await MedicalRecord.findOne({
                where: {
                    id
                },
                attributes: [
                    'diagnosis',
                    'treatment',
                    'cost'
                ],
                include: [
                    {
                        model: Doctor,
                        attributes: ['firstName', 'speciality']
                    },
                    {
                        model: Patient,
                        attributes: ['fullname']
                    }
                ]
            })

            if (!medicalRecord) {
                throw ({ message: "NotFound" })
            }

            res.status(200).json({
                message: 'Data Medical Record pasien berhasil didapatkan',
                data: medicalRecord
            })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = PatientController