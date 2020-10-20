import React, { FC, ReactElement, useState } from 'react'
import { get } from 'lodash'
import TableMaterial from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TablePagination from '@material-ui/core/TablePagination'
import Typography from '@material-ui/core/Typography'
import LinearProgress from '@material-ui/core/LinearProgress'
import Alert from '@material-ui/lab/Alert'
import AlertTitle from '@material-ui/lab/AlertTitle'
import IconButton from '@material-ui/core/IconButton'
import TableSortLabel from '@material-ui/core/TableSortLabel'

import EditIcon from '@material-ui/icons/Create'
import RemoveIcon from '@material-ui/icons/Delete'
import { useRouter } from 'next/router'

import RemoveDialog from './Dialog'

export interface TableProps {
    items
    columns
    fetching
    error
    errorMessage?
    currentPage?
    count?
    orderDirection?
    onDelete?
    orderBy?
    onChangePage?
    showEdit?
    showRemove?
    pageSize?
    onChangeRowsPerPage?
    onChangeOrderDirection?
    onChangeOrderBy?
    getDeleteMessage?
    hidePagination?
    hideActions?
}

const Table: FC<TableProps> = ({
    items,
    columns,
    fetching,
    error,
    errorMessage,
    currentPage,
    count,
    orderDirection,
    onDelete,
    orderBy,
    onChangePage,
    showEdit,
    showRemove,
    pageSize,
    onChangeRowsPerPage,
    onChangeOrderDirection,
    onChangeOrderBy,
    getDeleteMessage,
    hidePagination,
    hideActions,
}): ReactElement => {
    const router = useRouter()
    const [modalOpen, setModalOpen] = useState(false)
    const [rowToDelete, setRowToDelete] = useState<any>()

    const handleEdit = rowData => {
        const currentRoute = router.pathname
        router.push(`${currentRoute}/editar/${rowData._id}`)
    }

    const handleReorder = selectedColumn => {
        if (selectedColumn === orderBy) {
            onChangeOrderDirection(orderDirection === 'asc' ? 'desc' : 'asc')
        } else {
            onChangeOrderDirection('asc')
            onChangeOrderBy(selectedColumn)
        }
    }

    const handleRemoveModalSetUp = row => {
        setRowToDelete(row)
        setModalOpen(true)
    }

    const handleRemove = () => {
        onDelete(rowToDelete)
        setModalOpen(false)
    }

    return (
        <>
            <TableContainer>
                {fetching && <LinearProgress />}
                {error && (
                    <Alert severity="error">
                        {error && <AlertTitle>{errorMessage}</AlertTitle>}
                    </Alert>
                )}
                <TableMaterial size="medium">
                    <TableHead>
                        <TableRow>
                            {columns.map(column => (
                                <TableCell
                                    key={column.key}
                                    sortDirection={
                                        orderBy === column.key
                                            ? orderDirection
                                            : false
                                    }
                                >
                                    <TableSortLabel
                                        active={orderBy === column.key}
                                        direction={
                                            orderBy === column.key
                                                ? orderDirection
                                                : 'asc'
                                        }
                                        onClick={() => {
                                            handleReorder(column.key)
                                        }}
                                    >
                                        <Typography
                                            variant="h6"
                                            gutterBottom
                                            color="primary"
                                        >
                                            {column.label}
                                        </Typography>
                                    </TableSortLabel>
                                </TableCell>
                            ))}
                            {!hideActions && (
                                <TableCell style={{ width: 200 }}>
                                    <Typography
                                        variant="h6"
                                        gutterBottom
                                        color="primary"
                                    >
                                        Acciones
                                    </Typography>
                                </TableCell>
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.map(row => (
                            <TableRow key={row._id}>
                                {columns.map(column => (
                                    <TableCell
                                        key={`${column.key}_body`}
                                        align="left"
                                    >
                                        {typeof column.render === 'function'
                                            ? column.render(row)
                                            : get(row, column.key, '---')}
                                    </TableCell>
                                ))}
                                {!hideActions && (
                                    <TableCell>
                                        {showEdit && (
                                            <IconButton
                                                style={{
                                                    padding: 5,
                                                    marginLeft: 7,
                                                }}
                                                onClick={() => handleEdit(row)}
                                            >
                                                <EditIcon />
                                            </IconButton>
                                        )}
                                        {showRemove && (
                                            <IconButton
                                                style={{
                                                    padding: 5,
                                                    marginLeft: 7,
                                                }}
                                                onClick={(): void => {
                                                    handleRemoveModalSetUp(row)
                                                }}
                                            >
                                                <RemoveIcon />
                                            </IconButton>
                                        )}
                                    </TableCell>
                                )}
                            </TableRow>
                        ))}
                    </TableBody>
                </TableMaterial>
            </TableContainer>
            {!hidePagination && (
                <TablePagination
                    rowsPerPageOptions={[5, 10, 15, 25]}
                    component="div"
                    rowsPerPage={pageSize}
                    count={count}
                    page={currentPage}
                    onChangePage={onChangePage}
                    onChangeRowsPerPage={onChangeRowsPerPage}
                    labelDisplayedRows={({
                        from,
                        to,
                        count: total,
                    }): string => {
                        return `${from}-${to} de ${total}`
                    }}
                    labelRowsPerPage="Registros por página"
                />
            )}
            <RemoveDialog
                open={modalOpen}
                title="Eliminar registro"
                onClose={() => setModalOpen(false)}
                onAction={handleRemove}
            >
                {getDeleteMessage(rowToDelete)}
            </RemoveDialog>
        </>
    )
}

Table.defaultProps = {
    errorMessage: 'Hubo un error obteniendo información',
    items: [],
    count: 0,
    showEdit: true,
    showRemove: true,
    getDeleteMessage: () => '¿Esta seguro que quiere eliminar este registro?',
    hidePagination: false,
    hideActions: false,
}

export default Table
