import React, { ReactElement } from 'react'
import { get } from 'lodash'

import TextField from '@material-ui/core/TextField'

const Input = ({ field, form, ...props }): ReactElement => {
    const { name, value, onChange, onBlur } = field
    const error = get(form, `errors[${name}]`, false)
    const isTouched = get(form, `touched[${name}]`, false)

    const showError = !!error && isTouched

    return (
        <TextField
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...props}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            error={showError}
            helperText={showError ? error : undefined}
        />
    )
}

export default Input
