import React, { ReactElement } from 'react'
import { Formik, Form, Field } from 'formik'

import Grid from '@material-ui/core/Grid'

import Typography from '@material-ui/core/Typography'
import Input from '~/components/forms/Input'
import CategorySchema from '~/schemas/category'
import FormButtons from '../forms/FormButtons'

const FunctionForm = ({
    initialValues,
    onSubmit,
    isFetching,
    isSaving,
    isEditing = false,
}): ReactElement => {
    return (
        <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={CategorySchema}
        >
            <Form noValidate>
                <Typography
                    variant="h6"
                    color="primary"
                    style={{ marginBottom: 10, marginTop: 20 }}
                >
                    Español
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <Field
                            component={Input}
                            fullWidth
                            required
                            name="es.name"
                            label="Nombre en español"
                            disabled={isEditing}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Field
                            component={Input}
                            fullWidth
                            required
                            name="es.description"
                            label="Descripción en español"
                        />
                    </Grid>
                </Grid>
                <Typography
                    variant="h6"
                    color="primary"
                    style={{ marginBottom: 10, marginTop: 25 }}
                >
                    Ingles
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <Field
                            component={Input}
                            fullWidth
                            required
                            name="en.name"
                            label="Nombre en ingles"
                            disabled={isEditing}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Field
                            component={Input}
                            fullWidth
                            required
                            name="en.description"
                            label="Descripción en inglés"
                        />
                    </Grid>
                </Grid>

                <FormButtons isFetching={isFetching} isSaving={isSaving} />
            </Form>
        </Formik>
    )
}

export default FunctionForm
