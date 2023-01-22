export default function schemaValidation(schema) {
    return (req, res, next) => {
        const validation = schema.validate(req.body)
        if (validation.error) {
            const errorMessages = validation.error.details.map(detail => detail.message)
            return res.status(422).send(errorMessages)
        }
        next()
    }
}