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
import Layout from '~/components/Layout'
import Table from '~/components/Table'
import FiltersContainer from '~/components/FiltersContainer'
import TypeService from '~/services/types'
import { Type } from '~/interfaces/type'

const Fab = styled(FabBase)`
    position: fixed;
    right: 50px;
    bottom: 50px;
`

const columns = [
    { key: 'es.name', label: 'Nombre en español' },
    { key: 'es.description', label: 'Descripción en español' },
]

const TypesListPage = () => {
    const router = useRouter()

    const [page, setPage] = useState(0)
    const [pageSize, setPageSize] = useState(10)
    const [orderBy, setOrderBy] = useState('description')
    const [orderDirection, setOrderDirection] = useState('asc')
    const [filters, setFilters] = useState({ id: '', description: '' })
    const { enqueueSnackbar } = useSnackbar()

    const onFiltersChange = newFilters => {
        setPage(0)
        setFilters(newFilters)
    }

    const { resolvedData, isFetching, isError, refetch } = usePaginatedQuery(
        [
            `types-${page}`,
            page,
            pageSize,
            orderBy,
            orderDirection,
            omitBy(filters, isEmpty),
        ],
        TypeService.fetch
    )

    const handleNew = () => {
        const currentRoute = router.pathname
        router.push(`${currentRoute}/nuevo`)
    }

    const [deleteType] = useMutation(TypeService.delete, {
        onSuccess: () => {
            enqueueSnackbar('Tipo de informe eliminado correctamente', {
                variant: 'success',
            })
            refetch()
        },
        onError: () => {
            enqueueSnackbar('Hubo un error eliminando el tipo de informe', {
                variant: 'error',
            })
        },
    })

    const handleDelete = (type: Type): void => {
        deleteType(type._id)
    }
    const getDeleteMessage = (type: Type): string => {
        return `¿Esta seguro que desea eliminar el tipo de informe "${type?.es?.name}"?`
    }

    return (
        <Layout titleSuffix="Tipos de informes">
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

export default TypesListPage
