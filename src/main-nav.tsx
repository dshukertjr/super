import AppBar from '@material-ui/core/AppBar/AppBar';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import React, { useEffect, useState } from 'react';
import Divider from '@material-ui/core/Divider';
import { mainMenuItems, secondaryMenuItems } from './components/menu-items';
import List from '@material-ui/core/List';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { Route, BrowserRouter as Router, Switch, Link } from 'react-router-dom';
import HomePage from './pages/home-page';
import NotFound from './pages/not-found';
import Hidden from '@material-ui/core/Hidden';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import CreateQuestion from './pages/create-post-page';
import Button from '@material-ui/core/Button';
import LoginPage from './pages/login-page';
import { User } from '@supabase/gotrue-js/dist/main/lib/types'
import { useAuth, useUser } from './hooks/supabaseHooks';




const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        toolbar: {
            paddingRight: 24, // keep right padding when drawer closed
        },
        toolbarIcon: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: '0 8px',
            // ...theme.mixins.toolbar,
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
            [theme.breakpoints.up('sm')]: {
                width: `calc(100% - ${drawerWidth}px)`,
            },
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        menuButton: {
            marginRight: 36,
        },
        menuButtonHidden: {
            display: 'none',
        },
        title: {
            flexGrow: 1,
        },
        drawerPaper: {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        drawerPaperClose: {
            overflowX: 'hidden',
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            width: theme.spacing(7),
            [theme.breakpoints.up('sm')]: {
                width: theme.spacing(9),
            },
        },
        appBarSpacer: theme.mixins.toolbar,
        content: {
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
        },
        container: {
            paddingTop: theme.spacing(4),
            paddingBottom: theme.spacing(4),
        },
        paper: {
            padding: theme.spacing(2),
            display: 'flex',
            overflow: 'auto',
            flexDirection: 'column',
        },
        fixedHeight: {
            height: 240,
        },
    }),
);

function MainNav() {
    const auth = useAuth();
    const user = useUser();

    const classes = useStyles();
    const [open, setOpen] = useState(true);
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleMobileDrawerOpen = () => {
        setMobileOpen(true);
    }
    const handleMobileDrawerClose = () => {
        setMobileOpen(false);
    }

    const login = async () => {
        const { user, error } = await auth.signIn({
            email: 'example+2@email.com',
            password: 'example-password',
        })
        console.log('user', user)
        console.log('error', error)
    }


    const signout = () => {
        auth.signOut();
    }

    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    const drawerContent = (
        <div>
            <div className={classes.toolbarIcon}>
                <Hidden smUp implementation="css">
                    <IconButton onClick={handleMobileDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </Hidden>
            </div>
            <Divider />
            <List>{mainMenuItems}</List>
            <Divider />
            <List>{secondaryMenuItems}</List>
        </div>);

    let loginButtons;
    if (user) {
        loginButtons = <><Typography component="p" variant="body1" color="inherit">{user.id}</Typography>
            <Button onClick={signout}>logout</Button></>
    } else {
        loginButtons = <Button component={Link} to={'/login'}>login</Button>;

    }

    return (
        <Router>
            <div className={classes.root}>
                <CssBaseline />
                <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
                    <Toolbar className={classes.toolbar}>
                        <Hidden smUp implementation="css">
                            <IconButton
                                edge="start"
                                color="inherit"
                                aria-label="open drawer"
                                onClick={handleMobileDrawerOpen}
                                className={clsx(classes.menuButton)}
                            >
                                <MenuIcon />
                            </IconButton>
                        </Hidden>
                        <Hidden xsDown implementation="css">
                            <IconButton
                                edge="start"
                                color="inherit"
                                aria-label="open drawer"
                                onClick={handleDrawerOpen}
                                className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                            >
                                <MenuIcon />
                            </IconButton>
                        </Hidden>
                        <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>Dashboard</Typography>
                        {loginButtons}
                    </Toolbar>
                </AppBar>
                <Hidden smUp implementation="css">
                    <SwipeableDrawer
                        variant="temporary"
                        classes={{
                            paper: clsx(classes.drawerPaper),
                        }}
                        open={mobileOpen}
                        onClose={handleMobileDrawerClose}
                        onOpen={handleMobileDrawerOpen}
                    >
                        {drawerContent}
                    </SwipeableDrawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        variant="permanent"
                        classes={{
                            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
                        }}
                        open={open}
                    >
                        {drawerContent}
                    </Drawer>
                </Hidden>
                <main className={classes.content}>
                    <div className={classes.appBarSpacer} />
                    <Container maxWidth="lg" className={classes.container}>
                        <Switch>
                            <Route path="/login" exact component={LoginPage} />
                            <Route path="/create-post" exact component={CreateQuestion} />
                            <Route path="/" exact component={HomePage} />
                            <Route component={NotFound} />
                        </Switch>
                    </Container>
                </main>
            </div>
        </Router>
    );
}

export default MainNav;