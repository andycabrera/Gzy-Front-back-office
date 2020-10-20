import { object, string } from 'yup'

const EventSchema = object().shape({
    es: object().shape({
        name: string()
            .required('El nombre es obligatorio')
            .min(5, 'El nombre debe tener al menos 5 caracteres')
            .max(15, 'El nombre debe tener 15 caracteres como máximo'),
    }),
    en: object().shape({
        name: string()
            .required('El nombre es obligatorio')
            .min(5, 'El nombre debe tener al menos 5 caracteres')
            .max(15, 'El nombre debe tener 15 caracteres como máximo'),
    }),
})

export default EventSchema
