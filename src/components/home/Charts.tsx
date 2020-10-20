import React from 'react'
import dynamic from 'next/dynamic'

import Grid from '@material-ui/core/Grid'
import { useQuery } from 'react-query'
import ChartCard from '../ChartCard'
import StatsService from '~/services/stats'

const ChartComponent = dynamic(() => import('react-apexcharts'), { ssr: false })

function Charts() {
    const { data: categoriesStats } = useQuery(
        'categories-stats',
        StatsService.getCategoriesStats,
        { initialData: [], initialStale: true }
    )

    const { data: typesStats } = useQuery(
        'types-stats',
        StatsService.getTypesStats,
        { initialData: [], initialStale: true }
    )

    const categoriesLabels: string[] = categoriesStats.map(
        c => c.category.es.name
    )
    const typesLabels: string[] = typesStats.map(t => t.type.es.name)

    const reportsByCategory: number[] = categoriesStats.map(c => c.reportsCount)
    const downloadsByCategory: number[] = categoriesStats.map(
        c => c.downloadsCount
    )

    const reportsByType: number[] = typesStats.map(t => t.reportsCount)
    const downloadsByType: number[] = typesStats.map(t => t.downloadsCount)

    return (
        <Grid
            container
            spacing={2}
            justify="space-evenly"
            style={{ marginTop: 45, marginBottom: 45 }}
        >
            <Grid item xs={12} md={6} lg={3}>
                <ChartCard title="Informes por categoría">
                    <ChartComponent
                        options={{
                            labels: categoriesLabels,
                        }}
                        series={reportsByCategory}
                        type="pie"
                        width="300"
                    />
                </ChartCard>
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
                <ChartCard title="Descargas por categoría">
                    <ChartComponent
                        options={{
                            labels: categoriesLabels,
                        }}
                        series={downloadsByCategory}
                        type="donut"
                        width="300"
                    />
                </ChartCard>
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
                <ChartCard title="Informes por tipo">
                    <ChartComponent
                        options={{
                            labels: typesLabels,
                        }}
                        series={reportsByType}
                        type="pie"
                        width="300"
                    />
                </ChartCard>
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
                <ChartCard title="Descargas por tipo">
                    <ChartComponent
                        options={{
                            labels: typesLabels,
                        }}
                        series={downloadsByType}
                        type="donut"
                        width="300"
                    />
                </ChartCard>
            </Grid>
        </Grid>
    )
}

export default Charts
