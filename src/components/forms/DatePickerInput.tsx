import React, { ReactElement } from 'react'
import InputLabel from '@material-ui/core/InputLabel'
import {
    KeyboardDatePicker,
    KeyboardDateTimePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'

const DatePickerInput = ({ field, form, ...props }): ReactElement => {
    const { name, value } = field
    const { label } = props
    const { type } = props
    const handleDateChange = date => {
        form.setFieldValue(name, date)
    }
    /* eslint-disable indent */
    const returnPicker = () => {
        switch (type) {
            case 'dateTime':
                return (
                    <KeyboardDateTimePicker
                        clearable
                        value={value}
                        onChange={date => handleDateChange(date)}
                        format="dd/MM/yyyy HH:mm"
                    />
                )

            default:
                return (
                    <KeyboardDatePicker
                        clearable
                        value={value}
                        onChange={date => handleDateChange(date)}
                        format="dd/MM/yyyy"
                    />
                )
        }
    }

    return (
        <>
            <InputLabel>{label}</InputLabel>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                {returnPicker()}
            </MuiPickersUtilsProvider>
        </>
    )
}

export default DatePickerInput
