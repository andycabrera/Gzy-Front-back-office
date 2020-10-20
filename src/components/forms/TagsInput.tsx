/* global alert */
import React, { ReactElement, useState } from 'react'
import { get, trim, find } from 'lodash'
import AddBoxIcon from '@material-ui/icons/AddBox'
import TextField from '@material-ui/core/TextField'
import { InputAdornment, IconButton } from '@material-ui/core'
import ChipsArray from '../Chip'

const TagsInput = ({
    form,
    name,
    push,
    remove,
    required,
    fullWidth,
    label,
}): ReactElement => {
    const { values } = form

    const [inputValue, setInputValue] = useState('')

    const arrayValues = get(values, name, [])

    const error = get(form, `errors[${name}]`, false)
    const isTouched = get(form, `touched[${name}]`, false)
    const showError = !!error && isTouched

    const handleChipDelete = index => () => {
        remove(index)
    }

    const onChange = prop => {
        setInputValue(prop.target.value)
    }

    const addValue = () => {
        if (!inputValue) return

        const repeatedValue = find(arrayValues, i => i === inputValue)

        if (repeatedValue) {
            // eslint-disable-next-line no-alert
            alert('No puede haber tags repetidos')
            return
        }

        inputValue.split(',').forEach(value => push(trim(value)))
        setInputValue('')
    }

    const handleEnter = event => {
        if (event.key === 'Enter') {
            addValue()
            event.preventDefault()
            event.stopPropagation()
            event.target.focus()
        }
    }

    return (
        <form>
            <TextField
                // eslint-disable-next-line react/jsx-props-no-spreading
                required={required}
                label={label}
                fullWidth={fullWidth}
                name={name}
                value={inputValue}
                onChange={onChange}
                onKeyPress={handleEnter}
                error={showError}
                helperText={showError ? error : undefined}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                onClick={addValue}
                                color="primary"
                                type="button"
                            >
                                <AddBoxIcon color="primary" />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />

            <ChipsArray
                chipData={arrayValues}
                handleDelete={handleChipDelete}
            />
        </form>
    )
}

export default TagsInput
