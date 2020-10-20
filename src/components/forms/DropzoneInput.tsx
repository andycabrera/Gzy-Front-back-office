/* eslint-disable jsx-a11y/accessible-emoji */
/* eslint-disable react/jsx-props-no-spreading */
/* global alert */
import React, { ReactElement, useCallback, useMemo } from 'react'
import styled from 'styled-components'
import { useDropzone } from 'react-dropzone'
import { useFormikContext } from 'formik'
import { get } from 'lodash'

import InputLabel from '@material-ui/core/InputLabel'
import IconButton from '@material-ui/core/IconButton'

import TrashIcon from '@material-ui/icons/Delete'

const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out',
    height: '150px',
    position: 'relative',
}

const loadedStyle = {
    borderColor: '#5d6cbf',
    backgroundColor: '#f3f3f3',
}

const highlightText = {
    color: '#5d6cbf',
}

const DeleteButton = styled(IconButton)`
    position: absolute;
    top: 0;
    right: 0;
`

const Title = styled(InputLabel)`
    margin-bottom: 10px;
`

const Icon = styled.span`
    font-size: 30px;
    margin-bottom: 0px;
    role: 'img';
`

const DropzoneDescription = styled.p<{ isActive }>`
    color: ${({ isActive }): string => (isActive ? 'black' : '#bdbdbd')} 'black';
`

const DropzoneInput = ({ label, field, ...props }): ReactElement => {
    const { values, setFieldValue } = useFormikContext()
    const { name } = field
    const { soportedTypes } = props

    const onDrop = useCallback(files => {
        const file = files[0]
        // eslint-disable-next-line no-undef
        const reader = new FileReader()

        if (!file) {
            // eslint-disable-next-line no-alert
            alert('Este tipo de archivo no está soportado')
            return
        }

        reader.readAsDataURL(file)

        reader.onload = event => {
            setFieldValue(`${name}.content`, event.target.result)
            setFieldValue(`${name}.filename`, file.name)
            setFieldValue(`${name}.fileType`, file.type)
        }

        reader.onerror = function() {
            // eslint-disable-next-line no-alert
            alert('Hubo un problema adjuntando la imagen')
        }
    }, [])

    const setHighlightStyles = word => {
        return <span style={highlightText}>{word}</span>
    }

    const removeFile = ev => {
        ev.preventDefault()
        ev.stopPropagation()
        setFieldValue(`${name}.content`, '')
        setFieldValue(`${name}.filename`, '')
    }

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject,
    } = useDropzone({ onDrop, accept: soportedTypes })

    const isLoaded = !!get(values, `${name}.filename`)

    const filename = get(values, `${name}.filename`, '')

    const style = useMemo(
        () => ({
            ...baseStyle,
            ...(isLoaded ? loadedStyle : {}),
        }),
        [isDragActive, isDragReject, isDragAccept, isLoaded]
    )

    return (
        <div>
            <Title>{label}</Title>
            {/* @ts-ignore */}
            <div {...getRootProps({ style })}>
                <input {...getInputProps()} />
                {isLoaded ? (
                    <>
                        <Icon role="img" aria-labelledby="ok">
                            👌
                        </Icon>
                        <DropzoneDescription isActive={isLoaded}>
                            El archivo {setHighlightStyles(filename)} ha sido
                            cargado!
                        </DropzoneDescription>
                        <DeleteButton color="secondary" onClick={removeFile}>
                            <TrashIcon />
                        </DeleteButton>
                    </>
                ) : (
                    <>
                        <Icon role="img" aria-labelledby="ok">
                            👋
                        </Icon>
                        <DropzoneDescription isActive={isLoaded}>
                            Arrastre el archivo aquí o haga click para buscar
                        </DropzoneDescription>
                    </>
                )}
            </div>
        </div>
    )
}

export default DropzoneInput
