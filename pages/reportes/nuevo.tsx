import React from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { useRouter } from 'next/dist/client/router'
import { useSnackbar } from 'notistack'
import { useMutation } from 'react-query'
import { AxiosError } from 'axios'
import ReportForm from '~/components/reports/ReportForm'
import Layout from '~/components/Layout'
import { Report } from '~/interfaces/report'
import ReportService from '~/services/reports'
import { ErrorCode } from '~/interfaces/ErrorCode'

const initialValues: Report = {
    es: {
        title: '',
        description: '',
    },
    en: {
        title: '',
        description: '',
    },
    author: 'Galicia Research',
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
}

const ReportNewPage = () => {
    const router = useRouter()
    const { enqueueSnackbar } = useSnackbar()

    const [saveReport, { isLoading }] = useMutation(ReportService.save, {
        onSuccess: () => {
            router.push('/reportes')
            enqueueSnackbar('Reporte creado correctamente', {
                variant: 'success',
            })
        },
        onError: (err: AxiosError<ErrorCode>) => {
            let errorMessage = 'Ha ocurrido un error'
            const code = err?.response?.data?.code

            if (code === 'TITLE_ALREADY_EXISTS') {
                errorMessage = 'Ya existe un reporte con ese nombre'
            }

            enqueueSnackbar(errorMessage, { variant: 'error' })
        },
    })

    const handleSubmit = (report: Report) => {
        saveReport(report)
    }

    return (
        <Layout>
            <Grid container style={{ margin: '50px 0' }}>
                <Grid item lg={1} sm={1} xs={false} />
                <Grid item lg={10} sm={10} xs={12}>
                    <Paper style={{ padding: '25px 35px' }}>
                        <Typography
                            variant="h5"
                            color="primary"
                            style={{ marginBottom: 10 }}
                        >
                            Nuevo reporte
                        </Typography>
                        <ReportForm
                            onSubmit={handleSubmit}
                            fetching={isLoading}
                            initialValues={initialValues}
                        />
                    </Paper>
                </Grid>
            </Grid>
        </Layout>
    )
}
export default ReportNewPage
