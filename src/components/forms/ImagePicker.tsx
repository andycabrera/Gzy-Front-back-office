import React, { ReactElement } from 'react'
import { Grid, Typography } from '@material-ui/core'
import CheckIcon from '@material-ui/icons/CheckCircle'
import { useFormikContext, ErrorMessage } from 'formik'
import styled from 'styled-components'
import { breakpoint } from 'styled-components-breakpoint'
import CustomErrorMessage from './CustomErrorMessage'

const Container = styled.div`
    height: 180px;
    overflow-y: auto;
    overflow-x: hidden;
    padding-top: 10px;
`

const Picture = styled.div<{ active: boolean; src: string }>`
    background-image: url("${(props): string => props.src}");
    background-size: cover;
    background-position: 50%;
    height: 150px;
    width: 100%;
    cursor: pointer;

    ${breakpoint('mobile')`
        height: 125px;
    `}

    opacity: ${({ active }): string => (active ? '0.4' : '1')};

    &: hover {
        opacity: 0.4;
        filter: 'alpha(opacity = 40)';
    }
`

const IconContainer = styled.div`
    position: absolute;
    top: 22px;
    right: 22px;
    color: darkgreen;

    svg {
        font-size: 30px;
    }
`

const ImagePicker = ({ field, ...props }): ReactElement => {
    const { setFieldValue } = useFormikContext()
    const { name, value } = field
    const { options } = props

    const handleSelect = (imgName: string): void => {
        if (value === imgName) {
            setFieldValue(name, undefined)
        } else {
            setFieldValue(name, imgName)
        }
    }

    return (
        <>
            <Typography
                variant="h5"
                color="primary"
                style={{ marginBottom: 15, marginTop: 20 }}
            >
                Imagen de portada
            </Typography>
            <Container>
                <Grid container spacing={3}>
                    {options.map(
                        (image: string): ReactElement => {
                            const isActive = value === image
                            return (
                                <Grid
                                    item
                                    xs={12}
                                    sm={6}
                                    md={4}
                                    lg={3}
                                    xl={3}
                                    style={{ position: 'relative' }}
                                >
                                    <Picture
                                        key={image}
                                        src={`/images/${image}`}
                                        active={isActive}
                                        onClick={() => handleSelect(image)}
                                    />
                                    {isActive && (
                                        <IconContainer>
                                            <CheckIcon />
                                        </IconContainer>
                                    )}
                                </Grid>
                            )
                        }
                    )}
                </Grid>
            </Container>

            <ErrorMessage name={name} component={CustomErrorMessage} />
        </>
    )
}

export default ImagePicker
