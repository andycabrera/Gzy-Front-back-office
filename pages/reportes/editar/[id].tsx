import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import { AxiosError } from 'axios'
import React, { ReactElement } from 'react'
import { useMutation, useQuery } from 'react-query'
import Layout from '~/components/Layout'
import ReportForm from '~/components/reports/ReportForm'
import { Report } from '~/interfaces/report'
import { ErrorCode } from '~/interfaces/ErrorCode'
import ReportsService from '~/services/reports'

const ReportEditPage = (): ReactElement => {
    const router = useRouter()
    const { enqueueSnackbar } = useSnackbar()

    const { id } = router.query

    const [initialValues, setInitialValues] = React.useState<Report>({
        es: {
            title: '',
            description: '',
        },
        en: {
            title: '',
            description: '',
        },
        author: '',
        searchTags: [],
        availableFor: [],
        availableSince: new Date(),
        availableUntil: null,
        type: '',
        categories: [],
        coverImage: '',
        files: [
            {
                principal: true,
                en: { content: '', cta: '', filename: '' },
                es: { content: '', cta: '', filename: '' },
            },
        ],
    })

    const { isLoading: isFetchingReport } = useQuery(
        [`Report-${id}`, id],
        ReportsService.fetchOne,
        {
            onSuccess: report => {
                setInitialValues(report)
            },
            onError: () => {
                enqueueSnackbar('Hubo un error obteniendo el informe', {
                    variant: 'error',
                })
            },
            enabled: !!id,
        }
    )

    const [updateReport, { isLoading: isSavingReport }] = useMutation(
        ReportsService.update,
        {
            onSuccess: () => {
                enqueueSnackbar('Reporte modificado correctamente', {
                    variant: 'success',
                })

                router.push('/reportes')
            },
            onError: (err: AxiosError<ErrorCode>) => {
                let errorMessage = 'Ha ocurrido un error'
                const code = err?.response?.data?.code

                if (code === 'ID_ALREADY_EXIST') {
                    errorMessage = 'Ya existe un registro con ese id'
                } else if (code === 'DESCRIPTION_ALREADY_EXIST') {
                    errorMessage = 'Ya existe un registro con esa descripción'
                }

                enqueueSnackbar(errorMessage, { variant: 'error' })
            },
        }
    )

    const handleSubmit = (values: any): void => {
        updateReport({ ...values, _id: id })
    }

    return (
        <Layout>
            <Grid container style={{ margin: '50px 0' }}>
                <Grid item lg={1} sm={1} xs={false} />
                <Grid item lg={10} sm={10} xs={12}>
                    <Paper style={{ padding: '25px 35px' }} elevation={4}>
                        <Typography
                            variant="h5"
                            color="primary"
                            style={{ marginBottom: 10 }}
                        >
                            Editar reporte
                        </Typography>
                        <ReportForm
                            fetching={isFetchingReport || isSavingReport}
                            onSubmit={handleSubmit}
                            initialValues={initialValues}
                        />
                    </Paper>
                </Grid>
            </Grid>
        </Layout>
    )
}

export default ReportEditPage
