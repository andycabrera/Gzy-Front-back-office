import React, { ReactElement } from 'react'
import { useRouter } from 'next/router'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { useMutation } from 'react-query'
import { useSnackbar } from 'notistack'
import { AxiosError } from 'axios'
import TypeForm from '~/components/types/TypeForm'
import Layout from '~/components/Layout'
import CategoriesService from '~/services/types'
import { Type } from '~/interfaces/type'
import { ErrorCode } from '~/interfaces/ErrorCode'

const initialValues: Type = {
    es: {
        name: '',
        description: '',
    },
    en: {
        name: '',
        description: '',
    },
}

const TypeNewPage = (): ReactElement => {
    const router = useRouter()
    const { enqueueSnackbar } = useSnackbar()

    const [saveType, { isLoading }] = useMutation(CategoriesService.save, {
        onSuccess: () => {
            router.push('/tipos-informe')
            enqueueSnackbar('Tipo de informe creado correctamente', {
                variant: 'success',
            })
        },
        onError: (err: AxiosError<ErrorCode>) => {
            let errorMessage = 'Ha ocurrido un error'
            const code = err?.response?.data?.code

            if (code === 'NAME_ALREADY_EXISTS') {
                errorMessage = 'Ya existe un tipo con ese nombre'
            }

            enqueueSnackbar(errorMessage, { variant: 'error' })
        },
    })

    const handleSubmit = (values: Type): void => {
        saveType(values)
    }

    return (
        <Layout>
            <Grid container style={{ margin: '50px 0' }}>
                <Grid item lg={2} sm={1} xs={false} />
                <Grid item lg={8} sm={10} xs={12}>
                    <Paper style={{ padding: '25px 35px' }}>
                        <Typography
                            variant="h5"
                            color="primary"
                            style={{ marginBottom: 10 }}
                        >
                            Nuevo tipo de informe
                        </Typography>
                        <TypeForm
                            isFetching={isLoading}
                            isSaving={isLoading}
                            onSubmit={handleSubmit}
                            initialValues={initialValues}
                        />
                    </Paper>
                </Grid>
            </Grid>
        </Layout>
    )
}
export default TypeNewPage
