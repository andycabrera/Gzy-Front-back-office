import React, { FC } from 'react'

import Paper from '@material-ui/core/Paper'
import styled from 'styled-components'

const Title = styled.div`
    font-size: 18px;
    color: dimgrey;

    margin-bottom: 10px;
`

const Container = styled(Paper)`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 15px;

    flex-direction: column;
`

export interface ChartCardProps {
    title: string
}

const ChartCard: FC<ChartCardProps> = ({ children, title }) => {
    return (
        <Container elevation={4}>
            <Title>{title}</Title>
            {children}
        </Container>
    )
}

export default ChartCard
