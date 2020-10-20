import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    color: red;
    font-size: 13px;
    margin-top: 3px;
`

function CustomErrorMessage({ children }) {
    return <Container>{children}</Container>
}

export default CustomErrorMessage
