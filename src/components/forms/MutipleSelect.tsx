/* eslint-disable react/jsx-props-no-spreading */
import React, { ReactElement } from 'react'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Chip from '@material-ui/core/Chip'
import { get } from 'lodash'
import { ErrorMessage } from 'formik'
import CustomErrorMessage from './CustomErrorMessage'

const MultipleSelect = ({ field, form, ...props }): ReactElement => {
    const { data, menuItemLabelKey, menuItemIdKey } = props
    const { name, value = [], onChange } = field
    const { label } = props
    const error = get(form, `errors[${name}]`, false)
    const isTouched = get(form, `touched[${name}]`, false)
    const showError = !!error && isTouched

    return (
        <>
            <FormControl {...props}>
                <InputLabel>{label}</InputLabel>
                <Select
                    name={name}
                    multiple
                    error={showError}
                    value={value}
                    onChange={onChange}
                    input={<Input />}
                    renderValue={(selected: any[]) => {
                        return selected.map(item => {
                            const finalItem = data.find(x => x._id === item)
                            return (
                                <Chip
                                    key={item}
                                    label={get(finalItem, menuItemLabelKey)}
                                />
                            )
                        })
                    }}
                >
                    {data.map(item => {
                        return (
                            <MenuItem
                                key={get(item, menuItemIdKey)}
                                value={get(item, menuItemIdKey)}
                            >
                                {get(item, menuItemLabelKey)}
                            </MenuItem>
                        )
                    })}
                </Select>
            </FormControl>
            <ErrorMessage name={name} component={CustomErrorMessage} />
        </>
    )
}

export default MultipleSelect
