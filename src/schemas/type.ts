import { object, string } from 'yup'
// import {OnlyLettersAndSpaces} from '../regex/index';

const TypeSchema = object().shape({
    es: object().shape({
        name: string()
            .required('El nombre es obligatorio')
            .min(5, 'El nombre debe tener al menos 5 caracteres')
            .max(15, 'El nombre debe tener 15 caracteres como máximo'),

        description: string()
            .required('La descripción es obligatorio')
            .min(5, 'La descripción debe tener al menos 5 caracteres')
            .max(50, 'La descripción debe tener 50 caracteres como máximo'),
    }),
    en: object().shape({
        name: string()
            .required('El nombre es obligatorio')
            .min(5, 'El nombre debe tener al menos 5 caracteres')
            .max(15, 'El nombre debe tener 15 caracteres como máximo'),

        description: string()
            .required('La descripción es obligatorio')
            .min(5, 'La descripción debe tener al menos 5 caracteres')
            .max(50, 'La descripción debe tener 50 caracteres como máximo'),
    }),
})

export default TypeSchema
