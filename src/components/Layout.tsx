import React, { FC } from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '@material-ui/core/AppBar'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import AccountIcon from '@material-ui/icons/AccountCircle'
import HomeIcon from '@material-ui/icons/Home'
import ReportsIcon from '@material-ui/icons/Assignment'
import EventsIcon from '@material-ui/icons/Event'
import CategoriesIcon from '@material-ui/icons/Dashboard'
import ReportTypesIcon from '@material-ui/icons/AssignmentLate'

import styled from 'styled-components'

const drawerWidth = 220

const Main = styled.main`
    min-height: 90vh;
`

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        height: '100%',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: 0,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(8) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    title: {
        flex: 1,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    // @ts-ignore
    nested: ({ open }) => ({
        paddingLeft: theme.spacing(open ? 4 : 2),
    }),
}))

const MenuItems = [
    {
        href: '/eventos',
        label: 'Eventos',
        icon: <EventsIcon />,
    },
    {
        href: '/reportes',
        label: 'Reportes',
        icon: <ReportsIcon />,
    },
    {
        href: '/categorias-informe',
        label: 'Categorias',
        icon: <CategoriesIcon />,
    },
    {
        href: '/tipos-informe',
        label: 'Tipos informe',
        icon: <ReportTypesIcon />,
    },
]

export interface LayoutProps {
    titleSuffix?: string
}

const Layout: FC<LayoutProps> = ({ children, titleSuffix }) => {
    const [open, setOpen] = React.useState(false)
    const [anchorEl, setAnchorEl] = React.useState(null)
    const accountMenuOpen = Boolean(anchorEl)
    const classes = useStyles({ open })
    const theme = useTheme()

    const handleDrawerOpen = () => {
        setOpen(true)
    }

    const handleDrawerClose = () => {
        setOpen(false)
    }

    const handleLogout = () => {
        // TODO: Handle logout
    }

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, {
                            [classes.hide]: open,
                        })}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap className={classes.title}>
                        Galicia Research
                        {titleSuffix && ` | ${titleSuffix}`}
                    </Typography>
                    <Typography>nico93f</Typography>
                    <IconButton
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={ev => setAnchorEl(ev.currentTarget)}
                        color="inherit"
                    >
                        <AccountIcon />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={accountMenuOpen}
                        onClose={() => setAnchorEl(null)}
                    >
                        <MenuItem onClick={handleLogout}>Salir</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}
            >
                <div className={classes.toolbar}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? (
                            <ChevronRightIcon />
                        ) : (
                            <ChevronLeftIcon />
                        )}
                    </IconButton>
                </div>
                <List>
                    <Link href="/home">
                        <ListItem button component="a">
                            <ListItemIcon>
                                <HomeIcon />
                            </ListItemIcon>
                            <ListItemText primary="Home" />
                        </ListItem>
                    </Link>
                </List>
                <Divider />
                <List>
                    {MenuItems.map(i => (
                        <Link href={i.href} key={i.href}>
                            <ListItem button component="a">
                                <ListItemIcon>{i.icon}</ListItemIcon>
                                <ListItemText primary={i.label} />
                            </ListItem>
                        </Link>
                    ))}
                </List>
            </Drawer>
            <Main
                role="presentation"
                className={classes.content}
                onClick={() => {
                    if (open) {
                        setOpen(false)
                    }
                }}
            >
                <div className={classes.toolbar} />
                {children}
            </Main>
        </div>
    )
}

export default Layout
