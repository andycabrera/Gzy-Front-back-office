import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import React, { ReactElement } from 'react'
import { useMutation, useQuery } from 'react-query'
import EventForm from '~/components/events/EventForm'
import Layout from '~/components/Layout'
import { Event } from '~/interfaces/event'
import EventsService from '~/services/events'

const EventEditPage = (): ReactElement => {
    const router = useRouter()
    const { enqueueSnackbar } = useSnackbar()

    const { id } = router.query

    const [initialValues, setInitialValues] = React.useState<Event>({
        es: {
            name: '',
        },
        en: {
            name: '',
        },
        availableFor: [],
        availableSince: new Date(),
        availableUntil: null,
        report: '',
    })

    const { isLoading: isFetchingEvent } = useQuery(
        [`Event-${id}`, id],
        EventsService.fetchOne,
        {
            onSuccess: event => {
                setInitialValues(event)
            },
            onError: () => {
                enqueueSnackbar('Hubo un error obteniendo el informe', {
                    variant: 'error',
                })
            },
            enabled: !!id,
        }
    )

    const [updateEvent, { isLoading: isSavingEvent }] = useMutation(
        EventsService.update,
        {
            onSuccess: () => {
                enqueueSnackbar('Evento modificado correctamente', {
                    variant: 'success',
                })

                router.push('/eventos')
            },
            onError: (err: any) => {
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
        updateEvent({ ...values, _id: id })
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
                            Editar evente
                        </Typography>
                        <EventForm
                            fetching={isFetchingEvent || isSavingEvent}
                            onSubmit={handleSubmit}
                            initialValues={initialValues}
                        />
                    </Paper>
                </Grid>
            </Grid>
        </Layout>
    )
}

export default EventEditPage
