import React, { ReactElement } from 'react'
import { Formik, Form } from 'formik'

import Accordion from '@material-ui/core/Accordion'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionActions from '@material-ui/core/AccordionActions'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'

import FiltersIcon from '@material-ui/icons/FilterList'

const FiltersContainer = ({
    initialValues,
    onSubmit,
    children,
    validationSchema,
}): ReactElement => (
    <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Grid container spacing={2} alignItems="flex-start">
                <Grid item>
                    <FiltersIcon />
                </Grid>
                <Grid item>
                    <Typography variant="body1">Filtros</Typography>
                </Grid>
            </Grid>
        </AccordionSummary>
        <AccordionDetails style={{ paddingBottom: 5 }}>
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
                {({ handleReset, handleSubmit }) => (
                    <Form noValidate style={{ width: '100%' }}>
                        {children}
                        <Divider style={{ marginTop: 15 }} />
                        <AccordionActions>
                            <Button
                                color="secondary"
                                onClick={() => {
                                    handleReset()
                                    handleSubmit()
                                }}
                            >
                                Limpiar
                            </Button>
                            <Button
                                variant="outlined"
                                color="primary"
                                type="submit"
                            >
                                Filtrar
                            </Button>
                        </AccordionActions>
                    </Form>
                )}
            </Formik>
        </AccordionDetails>
    </Accordion>
)

export default FiltersContainer
