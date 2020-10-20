import React, { FC, ReactElement } from 'react'

import Grid from '@material-ui/core/Grid'
import MButton from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'

import { useRouter } from 'next/router'
import { useFormikContext } from 'formik'
import { useSnackbar } from 'notistack'
import styled from 'styled-components'

const Container = styled(Grid)`
    margin-top: 45px;
    padding-top: 15px;
    border-top: 1px dashed lightgrey;
`

const Button = styled(MButton)`
    min-height: 36px;
`

export interface FormButtonsProps {
    isFetching: boolean
    isSaving: boolean
}

const FormButtons: FC<FormButtonsProps> = ({
    isFetching,
    isSaving,
}): ReactElement => {
    const router = useRouter()
    const { isValid } = useFormikContext()
    const { enqueueSnackbar } = useSnackbar()

    const handleClick = (): void => {
        if (!isValid) {
            enqueueSnackbar(
                'El formulario no es válido, revise los campos en rojo',
                { variant: 'warning' }
            )
        }
    }

    return (
        <Container container justify="space-between">
            <Grid item xs={3}>
                <Button
                    disabled={isFetching}
                    fullWidth
                    variant="outlined"
                    onClick={router.back}
                >
                    Volver
                </Button>
            </Grid>
            <Grid item xs={3}>
                <Button
                    fullWidth
                    disabled={isFetching}
                    onClick={handleClick}
                    type="submit"
                    variant="contained"
                    color="primary"
                >
                    {isSaving ? (
                        <CircularProgress color="inherit" size={20} />
                    ) : (
                        'Guardar'
                    )}
                </Button>
            </Grid>
        </Container>
    )
}

export default FormButtons
