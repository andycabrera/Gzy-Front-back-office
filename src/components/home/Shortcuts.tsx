import React from 'react'

import Grid from '@material-ui/core/Grid'
import ShortcutCard from '../ShortcutCard'

const shortcutItems = [
    { href: '/reportes/nuevo', label: 'Nuevo informe' },
    { href: '/categorias-informe', label: 'Ver categorías' },
    { href: '/tipos-informe', label: 'Ver tipos de informe' },
]

function Shortcuts() {
    return (
        <Grid
            container
            spacing={5}
            justify="space-around"
            style={{ marginTop: 0 }}
        >
            {shortcutItems.map(item => (
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <ShortcutCard href={item.href}>{item.label}</ShortcutCard>
                </Grid>
            ))}
        </Grid>
    )
}

export default Shortcuts
