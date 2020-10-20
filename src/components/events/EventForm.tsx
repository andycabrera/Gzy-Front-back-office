import Grid from '@material-ui/core/Grid'

import { useQuery } from 'react-query'
import MenuItem from '@material-ui/core/MenuItem/MenuItem'
import { Field, Form, Formik } from 'formik'
import React, { ReactElement } from 'react'
import Input from '~/components/forms/Input'
import { Report } from '~/interfaces/report'
import EventSchema from '~/schemas/event'
import ReportsService from '~/services/reports'
import DatePickerInput from '../forms/DatePickerInput'
import FormButtons from '../forms/FormButtons'
import MultipleSelect from '../forms/MutipleSelect'

interface GetFetchResponse {
    count: number
    items: Report[]
}

const FunctionForm = ({ initialValues, onSubmit, fetching }): ReactElement => {
    const {
        data: { items: reportOptions },
    } = useQuery<GetFetchResponse>(
        [`allReports`, 0, 100],
        ReportsService.fetch,
        {
            initialData: { count: 0, items: [] },
            initialStale: true,
        }
    )

    return (
        <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={EventSchema}
        >
            <Form noValidate>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Field
                            component={Input}
                            fullWidth
                            required
                            name="es.name"
                            label="Nombre en español"
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Field
                            component={Input}
                            fullWidth
                            required
                            name="en.name"
                            label="Nombre en ingles"
                        />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Field
                            component={Input}
                            fullWidth
                            required
                            name="report"
                            label="Reporte"
                            select
                        >
                            {reportOptions.map(report => (
                                <MenuItem
                                    key={`${report.es.title}_${report._id}`}
                                    value={report._id}
                                >
                                    {report.es.title}
                                </MenuItem>
                            ))}
                        </Field>
                    </Grid>
                    <Grid
                        container
                        item
                        xs={12}
                        md={12}
                        spacing={2}
                        style={{ paddingRight: '0px' }}
                    >
                        <Grid item xs={6} md={3}>
                            <Field
                                component={DatePickerInput}
                                required
                                name="availableSince"
                                label="Habilitado desde"
                                type="dateTime"
                            />
                        </Grid>
                        <Grid item xs={6} md={3}>
                            <Field
                                component={DatePickerInput}
                                required
                                name="availableUntil"
                                label="Habilitado hasta"
                                type="dateTime"
                            />
                        </Grid>

                        <Grid
                            item
                            xs={12}
                            md={6}
                            style={{ paddingRight: '0px' }}
                        >
                            <Field
                                name="availableFor"
                                component={MultipleSelect}
                                fullWidth
                                required
                                label="Habilitado para descargar"
                                menuItemLabelKey="name"
                                menuItemIdKey="_id"
                                data={[
                                    {
                                        _id: 'mesa',
                                        name: 'Usuario mesa de dinero',
                                    },
                                    {
                                        _id: 'otro',
                                        name: 'Otro rol de usuario',
                                    },
                                ]}
                            />
                        </Grid>
                    </Grid>
                </Grid>

                <FormButtons isFetching={fetching} isSaving={fetching} />
            </Form>
        </Formik>
    )
}

export default FunctionForm
