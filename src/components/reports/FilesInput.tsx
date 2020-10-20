import React from 'react'
import { Field, useFormikContext } from 'formik'
import { tail } from 'lodash'
import Grid from '@material-ui/core/Grid'
import { IconButton, Typography, makeStyles } from '@material-ui/core'
import AddIcon from '@material-ui/icons/AddCircle'
import DeleteIcon from '@material-ui/icons/Delete'
import Input from '../forms/Input'
import DropzoneInput from '../forms/DropzoneInput'
import InputPlaceholder from '../forms/InputPlaceholder'

function FilesInput({ push, remove }) {
    const { values } = useFormikContext<any>()

    const addNewFile = () => {
        push({
            principal: false,
            en: { content: '', cta: '', filename: '' },
            es: { content: '', cta: '', filename: '' },
        })
    }

    const removeRow = index => {
        remove(index)
    }

    return (
        <Grid container xs={12} md={12}>
            <Typography
                variant="h5"
                color="primary"
                style={{ marginBottom: 10, marginTop: 20 }}
            >
                Reporte
            </Typography>
            <Grid container xs={12} md={12} spacing={2} style={{}}>
                <Grid item xs={12} md={6}>
                    <Field
                        name="files.0.es"
                        label="Archivo en español"
                        soportedTypes=".pdf,.doc,.docx,.xml,application/msword,.mp3"
                        component={DropzoneInput}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <Field
                        name="files.0.en"
                        label="Archivo en ingles"
                        soportedTypes=".pdf,.doc,.docx,.xml,application/msword,.mp3"
                        component={DropzoneInput}
                    />
                </Grid>
            </Grid>
            <Grid
                container
                alignItems="center"
                item
                xs={12}
                md={6}
                style={{ marginTop: 25, marginBottom: 0 }}
            >
                <Typography variant="h5" color="primary">
                    Anexos
                </Typography>
                <IconButton
                    onClick={() => {
                        addNewFile()
                    }}
                    color="primary"
                >
                    <AddIcon color="primary" />
                </IconButton>
            </Grid>
            {values.files.length < 2 && (
                <InputPlaceholder>
                    Aún no hay anexos cargados, haga click sobre el + para
                    agregar el primero
                </InputPlaceholder>
            )}
            {tail(values.files).map((file: any, index) => (
                <Grid
                    key={`${file.filename}_${file.cta}_${index + 1}`}
                    container
                    xs={12}
                    md={12}
                    spacing={2}
                    style={{ marginBottom: 15 }}
                >
                    <Grid item xs={12} container alignItems="center">
                        <Typography variant="h6" color="primary">
                            Anexo {index + 1}
                        </Typography>
                        <IconButton
                            onClick={(): void => {
                                removeRow(index + 1)
                            }}
                            color="secondary"
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Field
                            name={`files.${index + 1}.es`}
                            label="Archivo en español"
                            soportedTypes=".pdf,.doc,.docx,.xml,application/msword,.mp3"
                            component={DropzoneInput}
                        />
                        <Field
                            name={`files.${index + 1}.es.cta`}
                            label="Texto del boton de descarga"
                            component={Input}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Field
                            name={`files.${index + 1}.en`}
                            label="Archivo en ingles"
                            component={DropzoneInput}
                            soportedTypes=".pdf,.doc,.docx,.xml,application/msword,.mp3"
                        />

                        <Field
                            name={`files.${index + 1}.en.cta`}
                            label="Texto del boton de descarga"
                            component={Input}
                            fullWidth
                            required
                        />
                    </Grid>
                </Grid>
            ))}
        </Grid>
    )
}

export default FilesInput
