/* eslint-disable react/jsx-props-no-spreading */
import React, { ReactElement } from 'react'
import Head from 'next/head'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { ThemeProvider } from '@material-ui/core/styles'
import { ReactQueryConfigProvider } from 'react-query'
import { SnackbarProvider } from 'notistack'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from '~/theme/material'

export default function MyApp(props): ReactElement {
    const { Component, pageProps } = props

    React.useEffect(() => {
        // eslint-disable-next-line no-undef
        const jssStyles = document.querySelector('#jss-server-side')
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles)
        }
    }, [])

    return (
        <>
            <Head>
                <title>Galicia Research</title>
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width"
                />
            </Head>
            <ReactQueryConfigProvider
                config={{
                    queries: {
                        retry: false,
                        refetchOnWindowFocus: false,
                    },
                }}
            >
                <SnackbarProvider maxSnack={3}>
                    <ThemeProvider theme={theme}>
                        <CssBaseline />
                        <Component {...pageProps} />
                    </ThemeProvider>
                </SnackbarProvider>
            </ReactQueryConfigProvider>
        </>
    )
}
