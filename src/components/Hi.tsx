import React, { FC, ReactElement, useState } from 'react'
import styled from 'styled-components'

import TextField from '@material-ui/core/TextField'

const Container = styled.div`
    width: 500px;
    margin: 0 auto;
    text-align: center;
`

const HiText = styled.div`
    color: darkblue;
    font-weight: bold;
    font-size: 20px;
    margin-top: 15px;

    > span {
        margin-right: 7px;
    }
`

export const Hi: FC = (): ReactElement => {
    const [name] = useState('')

    return (
        <Container>
            <TextField placeholder="Escribí tu nombre" />
            <HiText>
                <span>Hola</span>
                {name.length ? name : 'anónimo'}.
            </HiText>
        </Container>
    )
}
