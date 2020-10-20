import React, { ReactElement } from 'react'
import { Formik, Form } from 'formik'

import ReportSchema from '~/schemas/report'

import BasicInfo from './BasicInfo'
import Files from './Files'
import SettingsInputs from './SettingsInputs'
import FormButtons from '../forms/FormButtons'

const FunctionForm = ({ initialValues, onSubmit, fetching }): ReactElement => {
    return (
        <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={ReportSchema}
            initialTouched={{ coverImage: true }}
        >
            <Form noValidate>
                <BasicInfo />

                <Files />

                <SettingsInputs />

                <FormButtons isFetching={fetching} isSaving={fetching} />
            </Form>
        </Formik>
    )
}

export default FunctionForm
