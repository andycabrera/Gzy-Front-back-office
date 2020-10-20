import React from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { useRouter } from 'next/dist/client/router'
import { useSnackbar } from 'notistack'
import { useMutation } from 'react-query'
import { AxiosError } from 'axios'
import EventForm from '~/components/events/EventForm'
import Layout from '~/components/Layout'
import { Event } from '~/interfaces/event'
import EventService from '~/services/events'
import { ErrorCode } from '~/interfaces/ErrorCode'

const initialValues: Event = {
    availableFor: [],
    en: {
        name: '',
    },
    es: {
        name: '',
    },
    availableSince: new Date(),
    availableUntil: null,
    report: '',
}

const EventNewPage = () => {
    const router = useRouter()
    const { enqueueSnackbar } = useSnackbar()

    const [saveEvent, { isLoading }] = useMutation(EventService.save, {
        onSuccess: () => {
            router.push('/eventos')
            enqueueSnackbar('Evento creado correctamente', {
                variant: 'success',
            })
        },
        onError: (err: AxiosError<ErrorCode>) => {
            let errorMessage = 'Ha ocurrido un error'
            const code = err?.response?.data?.code

            if (code === 'TITLE_ALREADY_EXISTS') {
                errorMessage = 'Ya existe un evento con ese nombre'
            }

            enqueueSnackbar(errorMessage, { variant: 'error' })
        },
    })

    const handleSubmit = (event: Event) => {
        saveEvent(event)
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
                            Nuevo evento
                        </Typography>
                        <EventForm
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
export default EventNewPage
