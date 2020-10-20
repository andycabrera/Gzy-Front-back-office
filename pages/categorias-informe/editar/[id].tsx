import React, { ReactElement } from 'react'
import { useRouter } from 'next/router'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { useMutation, useQuery } from 'react-query'
import { useSnackbar } from 'notistack'
import { AxiosError } from 'axios'
import CategoryForm from '~/components/categories/CategoryForm'
import Layout from '~/components/Layout'
import CategoriesService from '~/services/categories'
import { Category } from '~/interfaces/category'
import { ErrorCode } from '~/interfaces/ErrorCode'

const CategoryEditPage = (): ReactElement => {
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

    const { isLoading: isFetchingCategory } = useQuery(
        [`category-${id}`, id],
        CategoriesService.fetchOne,
        {
            onSuccess: category => {
                setInitialValues(category)
            },
            onError: () => {
                enqueueSnackbar('Hubo un error obteniendo la categoría', {
                    variant: 'error',
                })
            },
            enabled: !!id,
        }
    )

    const [updateCategory, { isLoading: isSavingCategory }] = useMutation(
        CategoriesService.update,
        {
            onSuccess: () => {
                enqueueSnackbar('Categoria modificada correctamente', {
                    variant: 'success',
                })

                router.push('/categorias-informe')
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

    const handleSubmit = (values: Category): void => {
        updateCategory({ ...values, _id: id })
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
                            Editar categoria
                        </Typography>
                        <CategoryForm
                            isFetching={isFetchingCategory || isSavingCategory}
                            isSaving={isSavingCategory}
                            onSubmit={handleSubmit}
                            initialValues={initialValues}
                        />
                    </Paper>
                </Grid>
            </Grid>
        </Layout>
    )
}
export default CategoryEditPage
