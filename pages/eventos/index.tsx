import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { usePaginatedQuery, useMutation } from 'react-query'
import { omitBy, isEmpty } from 'lodash'

import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import FabBase from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import styled from 'styled-components'
import { useSnackbar } from 'notistack'
import eventsService from '~/services/events'
import Layout from '~/components/Layout'
import Table from '~/components/Table'
import FiltersContainer from '~/components/FiltersContainer'

const Fab = styled(FabBase)`
    position: fixed;
    right: 50px;
    bottom: 50px;
`

const columns = [
    { key: 'es.name', label: 'Nombre' },
    {
        key: 'report.es.title',
        label: 'Informes',
    },
]

const EventsListPage = () => {
    const router = useRouter()

    const [page, setPage] = useState(0)
    const [pageSize, setPageSize] = useState(10)
    const [orderBy, setOrderBy] = useState('en.title')
    const [orderDirection, setOrderDirection] = useState('asc')
    const [filters, setFilters] = useState({ id: '', description: '' })
    const { enqueueSnackbar } = useSnackbar()

    const onFiltersChange = newFilters => {
        setPage(0)
        setFilters(newFilters)
    }

    const { resolvedData, isFetching, isError, refetch } = usePaginatedQuery(
        [
            `events-${page}`,
            page,
            pageSize,
            orderBy,
            orderDirection,
            omitBy(filters, isEmpty),
        ],
        eventsService.fetch
    )
    const handleNew = () => {
        const currentRoute = router.pathname
        router.push(`${currentRoute}/nuevo`)
    }

    const [deleteEvent] = useMutation(eventsService.delete, {
        onSuccess: () => {
            enqueueSnackbar('Evento eliminado correctamente', {
                variant: 'success',
            })
            refetch()
        },
        onError: () => {
            enqueueSnackbar('Hubo un error eliminando el evento', {
                variant: 'error',
            })
        },
    })

    const handleDelete = event => {
        deleteEvent(event._id)
    }

    const getDeleteMessage = (event): string => {
        return `¿Esta seguro que desea eliminar el evento "${event?.es?.title}"?`
    }

    return (
        <Layout titleSuffix="Eventos">
            <Grid container style={{ marginTop: 35 }}>
                <Grid item xs={1} />
                <Grid item xs={10}>
                    <FiltersContainer
                        onSubmit={onFiltersChange}
                        initialValues={{ name: '', description: '' }}
                        validationSchema={{}}
                    >
                        Filtros
                    </FiltersContainer>
                </Grid>
            </Grid>
            <Grid container style={{ marginTop: 35 }}>
                <Grid item xs={1} />
                <Grid item xs={10}>
                    <Paper>
                        <Table
                            items={resolvedData?.items}
                            columns={columns}
                            fetching={isFetching}
                            error={isError}
                            count={resolvedData?.count}
                            currentPage={page}
                            pageSize={pageSize}
                            orderBy={orderBy}
                            orderDirection={orderDirection}
                            onDelete={handleDelete}
                            onChangePage={(ev, newPage) => setPage(newPage)}
                            onChangeRowsPerPage={ev => {
                                setPageSize(ev.target.value)
                            }}
                            onChangeOrderBy={setOrderBy}
                            onChangeOrderDirection={setOrderDirection}
                            getDeleteMessage={getDeleteMessage}
                        />
                    </Paper>
                </Grid>
            </Grid>
            <Fab color="primary" onClick={handleNew}>
                <AddIcon />
            </Fab>
        </Layout>
    )
}

export default EventsListPage
