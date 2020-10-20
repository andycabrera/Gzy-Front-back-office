import React, { ReactElement } from 'react'
import { useRouter } from 'next/router'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { useMutation, useQuery } from 'react-query'
import { useSnackbar } from 'notistack'
import { AxiosError } from 'axios'
import TypeForm from '~/components/types/TypeForm'
import Layout from '~/components/Layout'
import TypesService from '~/services/types'
import { Type } from '~/interfaces/type'
import { ErrorCode } from '~/interfaces/ErrorCode'

const TypeEditPage = (): ReactElement => {
    const router = useRouter()
    const { enqueueSnackbar } = useSnackbar()

    const { id } = router.query

    const [initialValues, setInitialValues] = React.useState({
        es: {
            name: '',
            description: '',
        },
        en: {
            name: '',
            description: '',
        },
    })

    const { isLoading: isFetchingType } = useQuery(
        [`category-${id}`, id],
        TypesService.fetchOne,
        {
            onSuccess: type => {
                setInitialValues(type)
            },
            onError: () => {
                enqueueSnackbar(
                    'Hubo un error obteniendo el tipo de documento',
                    {
                        variant: 'error',
                    }
                )
            },
            enabled: !!id,
        }
    )

    const [updateType, { isLoading: isSavingType }] = useMutation(
        TypesService.update,
        {
            onSuccess: () => {
                enqueueSnackbar('Tipo de informe modificado correctamente', {
                    variant: 'success',
                })

                router.push('/tipos-informe')
            },
            onError: (err: AxiosError<ErrorCode>) => {
                let errorMessage = 'Ha ocurrido un error'
                const code = err?.response?.data?.code

                if (code === 'ID_ALREADY_EXIST') {
                    errorMessage = 'Ya existe un registro con ese id'
                } else if (code === 'DESCRIPTION_ALREADY_EXIST') {
                    errorMessage = 'Ya existe un registro con esa descripciòn'
                }

                enqueueSnackbar(errorMessage, { variant: 'error' })
            },
        }
    )

    const handleSubmit = (values: Type): void => {
        updateType({ ...values, _id: id })
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
                            Editar tipo
                        </Typography>
                        <TypeForm
                            isFetching={isFetchingType || isSavingType}
                            isSaving={isSavingType}
                            onSubmit={handleSubmit}
                            initialValues={initialValues}
                        />
                    </Paper>
                </Grid>
            </Grid>
        </Layout>
    )
}
export default TypeEditPage
