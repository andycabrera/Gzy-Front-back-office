import React from 'react'
import { usePaginatedQuery } from 'react-query'

import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

import { Typography } from '@material-ui/core'
import styled from 'styled-components'
import ReportsService from '~/services/reports'
import Table from '../Table'

const columns = [
    { key: 'es.title', label: 'Titulo' },
    { key: 'type.es.name', label: 'Tipo' },
    {
        key: 'categories',
        label: 'Categorías',
        render: (r: any): string =>
            r.categories.map(cat => cat.es.name).join(', '),
    },
    {
        key: 'searchTags',
        label: 'Tags de búsqueda',
        render: (r: any): string => r.searchTags.join(', '),
    },
]

const TableContainer = styled(Paper)`
    padding: 15px 15px 25px;
`

const Title = styled(Typography)`
    margin-left: 15px;
    padding-bottom: 7px;
    border-bottom: 1px solid lightgrey;
`

function Tops() {
    const { resolvedData, isFetching, isError } = usePaginatedQuery(
        ['top-reports', 0, 5, 'es.name', 'asc'],
        ReportsService.fetch
    )
    return (
        <Grid container style={{ marginTop: 35, marginBottom: 35 }}>
            <Grid item xs={1} />
            <Grid item xs={10}>
                <TableContainer elevation={5}>
                    <Title variant="h5" color="primary">
                        Ultimo reportes creados
                    </Title>
                    <Table
                        items={resolvedData?.items}
                        columns={columns}
                        fetching={isFetching}
                        error={isError}
                        count={resolvedData?.count}
                        hidePagination
                        hideActions
                    />
                </TableContainer>
            </Grid>
        </Grid>
    )
}

export default Tops
