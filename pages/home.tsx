import React, { ReactElement, FC } from 'react'

import Layout from '~/components/Layout'
import Charts from '~/components/home/Charts'
import Shortcuts from '~/components/home/Shortcuts'
import Tops from '~/components/home/Tops'

const Home: FC = (): ReactElement => (
    <Layout>
        <Shortcuts />
        <Charts />
        <Tops />
    </Layout>
)

export default Home
