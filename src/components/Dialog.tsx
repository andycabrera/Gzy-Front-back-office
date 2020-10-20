import React, { FC } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

export interface AlertDialogProps {
    open: boolean
    onClose: () => void
    title: string
    cancelLabel?: string
    onAction: () => void
    actionLabel?: string
}

const AlertDialog: FC<AlertDialogProps> = ({
    open,
    onClose,
    title,
    children,
    cancelLabel,
    onAction,
    actionLabel,
}) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {children}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    {cancelLabel}
                </Button>
                <Button onClick={onAction} color="primary" autoFocus>
                    {actionLabel}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

AlertDialog.defaultProps = {
    cancelLabel: 'Cancelar',
    actionLabel: 'Si, estoy seguro',
}

export default AlertDialog
