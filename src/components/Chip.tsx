import React, { FC } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Chip from '@material-ui/core/Chip'

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        listStyle: 'none',
        padding: theme.spacing(0.5),
        margin: 0,
    },
    chip: {
        margin: theme.spacing(0.5),
    },
}))

export interface ChipProps {
    chipData: string[]
    handleDelete: (index: number) => void
}

const ChipsArray: FC<ChipProps> = ({ chipData, handleDelete }) => {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            {chipData.map((data, index) => {
                return (
                    <li key={data}>
                        <Chip
                            label={data}
                            onDelete={() => handleDelete(index)}
                            className={classes.chip}
                        />
                    </li>
                )
            })}
        </div>
    )
}

export default ChipsArray
