import React, { FC, ReactElement } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'

import Paper from '@material-ui/core/Paper'

export interface ShortcutCardProps {
    href: string
}

const Container = styled(Paper)`
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;

    cursor: pointer;
    font-size: 20px;
    color: dimgrey;

    border-top: 5px solid #3f51b5;

    & :hover {
        background: #eee;
    }
`

const ShortcutCard: FC<ShortcutCardProps> = ({
    href,
    children,
}): ReactElement => {
    const router = useRouter()

    const handleRedirect = (): void => {
        router.push(href)
    }

    return (
        <Container elevation={3} onClick={handleRedirect}>
            {children}
        </Container>
    )
}

export default ShortcutCard
