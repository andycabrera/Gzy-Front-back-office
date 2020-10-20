import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    text-align: center;
    padding: 25px;
    color: dimgrey;
    font-size: 17px;
    width: 100%;
`

function InputPlaceholder({ children }) {
    return <Container>{children}</Container>
}

export default InputPlaceholder
