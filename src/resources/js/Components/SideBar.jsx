
import * as React from 'react';
import Box from '@mui/joy/Box';
import Chip from '@mui/joy/Chip';
import List from '@mui/joy/List';
import ListSubheader from '@mui/joy/ListSubheader';
import ListItem from '@mui/joy/ListItem';
import ListItemContent from '@mui/joy/ListItemContent';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListItemButton from '@mui/joy/ListItemButton';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import { Link } from '@inertiajs/react';

export const closeSidebar = () => {
    if (typeof document !== 'undefined') {
        document.documentElement.style.removeProperty('--SideNavigation-slideIn');
        document.body.style.removeProperty('overflow');
    }
};

export const SideBar = (props) => {
    return (
        <React.Fragment>
            <Box
                className="Sidebar-overlay"
                sx={{
                    position: 'fixed',
                    zIndex: 9998,
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    bgcolor: 'background.body',
                    opacity: 'calc(var(--SideNavigation-slideIn, 0) - 0.2)',
                    transition: 'opacity 0.4s',
                    transform: {
                        xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--FirstSidebar-width, 0px)))',
                        lg: 'translateX(-100%)',
                    },
                }}
                onClick={() => closeSidebar()}
            />
            <Sheet
                className="Sidebar"
                sx={{
                    position: {
                        xs: 'fixed',
                        lg: 'sticky',
                    },
                    transform: {
                        xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--FirstSidebar-width, 0px)))',
                        lg: 'none',
                    },
                    borderRight: '1px solid',
                    borderColor: 'divider',
                    transition: 'transform 0.4s',
                    zIndex: 9999,
                    height: '100dvh',
                    top: 0,
                    p: 2,
                    py: 3,
                    flexShrink: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                }}
            >
                <List
                    sx={{
                        '--ListItem-radius': '8px',
                        '--ListItem-minHeight': '32px',
                        '--List-gap': '4px',
                    }}
                >
                    <ListSubheader role="presentation" sx={{ color: 'text.primary' }}>
                        Dashboard
                    </ListSubheader>
                    <ListItem>

                        <ListItemButton variant="soft" component={Link} href={route('dashboard')} selected={route().current('dashboard')} onClick={() => closeSidebar()}>
                            <ListItemDecorator>
                                <i data-feather="activity" />
                            </ListItemDecorator>
                            <ListItemContent>Главная</ListItemContent>
                        </ListItemButton>

                    </ListItem>


                    <ListItem>
                        <ListItemButton>
                            <ListItemDecorator>
                                <i data-feather="shopping-cart" />
                            </ListItemDecorator>
                            <ListItemContent>Заказы</ListItemContent>
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton onClick={() => closeSidebar()}>
                            <ListItemDecorator>
                                <i data-feather="user" />
                            </ListItemDecorator>
                            <ListItemContent>Клиенты</ListItemContent>
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton href={route('profile.edit')} onClick={() => closeSidebar()}>
                            <ListItemDecorator>
                                <i data-feather="settings" />
                            </ListItemDecorator>
                            <ListItemContent>Настройки профиля</ListItemContent>
                        </ListItemButton>
                    </ListItem>
                </List>
                <Box sx={{ pl: 1, mt: 'auto', display: 'flex', alignItems: 'center' }}>
                    <div>
                        <Typography fontWeight="lg" level="body2">
                            {props.auth?.user?.name}
                        </Typography>
                        <Typography level="body2">{props.auth?.user?.email}</Typography>
                    </div>
                    <IconButton component={Link} as="button" href={route('logout')} method="post" variant="plain" sx={{ ml: 'auto' }} >
                        <i data-feather="log-out" />
                    </IconButton>
                </Box>
            </Sheet>
        </React.Fragment>
    );
}
