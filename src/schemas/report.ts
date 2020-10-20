import { array, object, setLocale, string } from 'yup'

setLocale({
    mixed: {
        required: 'Este campo es obligatorio',
    },
})

const ReportSchema = object().shape({
    es: object().shape({
        title: string().required(),
    }),
    en: object().shape({
        title: string().required(),
    }),
    author: string().required(),
    coverImage: string().required('La imagen de portada es obligatoria'),
    searchTags: array().min(1, 'Al menos un tag de busqueda es obligatorio'),
    categories: array().min(1, 'Al menos una categoría es obligatoria'),
    type: string().required(),
})

export default ReportSchema
