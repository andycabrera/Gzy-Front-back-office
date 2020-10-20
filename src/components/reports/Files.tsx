import React from 'react'
import { Field, FieldArray, FieldArrayRenderProps } from 'formik'
import FilesInput from './FilesInput'
import ImagePicker from '../forms/ImagePicker'

function Files() {
    return (
        <>
            <FieldArray
                name="files"
                component={(arrayHelpers: FieldArrayRenderProps) => (
                    <FilesInput
                        push={arrayHelpers.push}
                        remove={arrayHelpers.remove}
                    />
                )}
            />
            <Field
                name="coverImage"
                options={[
                    'cover-example.png',
                    'cat-example.jpg',
                    'cover-example2.jpg',
                    'cover-galicia.jpeg',
                ]}
                label="Imagen de portada"
                component={ImagePicker}
            />
        </>
    )
}

export default Files
