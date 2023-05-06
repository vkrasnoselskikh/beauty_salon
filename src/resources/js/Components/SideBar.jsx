import * as React from 'react';
import Box from '@mui/joy/Box';
import List from '@mui/joy/List';
import ListSubheader from '@mui/joy/ListSubheader';
import ListItem from '@mui/joy/ListItem';
import ListItemContent from '@mui/joy/ListItemContent';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListItemButton from '@mui/joy/ListItemButton';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import {Link as InteriaLink, router} from '@inertiajs/react';
import {Activity, ShoppingCart, User, Briefcase, Archive, Settings, LogOut} from "react-feather";

export const closeSidebar = () => {
    if (typeof document !== 'undefined') {
        document.documentElement.style.removeProperty('--SideNavigation-slideIn');
        document.body.style.removeProperty('overflow');
    }
};

export const openSidebar = () => {
    if (typeof document !== 'undefined') {
        document.body.style.overflow = 'hidden';
        document.documentElement.style.setProperty('--SideNavigation-slideIn', '1');
    }
};

export const toggleSidebar = () => {
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
        const slideIn = window
            .getComputedStyle(document.documentElement)
            .getPropertyValue('--SideNavigation-slideIn');
        if (slideIn) {
            closeSidebar();
        } else {
            openSidebar();
        }
    }
};

export const SidebarListItem = ({icon, title, route_name}) => {
    const is_active = route_name && route().current(route_name)


    return <ListItem>
        <ListItemButton
            component={InteriaLink}
            href={route_name ? route(route_name) : '#'}
            selected={is_active}
            onClick={closeSidebar}
            variant={is_active ? 'soft' : 'plain'}>
            <ListItemDecorator>
                {icon}
            </ListItemDecorator>
            <ListItemContent>{title}</ListItemContent>
        </ListItemButton>
    </ListItem>

}


export const SideBar = (props) => {

    function logout(e) {
        e.preventDefault()
        router.post('/logout')
    }

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
                    <ListSubheader role="presentation" sx={{color: 'text.primary'}}>
                        Меню
                    </ListSubheader>

                    <SidebarListItem route_name={'main'} icon={<Activity/>} title={'Главная'}/>
                    <SidebarListItem route_name={'orders.index'} icon={<ShoppingCart/>} title={'Заказы'}/>
                    <SidebarListItem route_name={'clients.index'} icon={<User/>} title={'Клиенты'}/>
                    <SidebarListItem route_name={'services.index'} icon={<Briefcase/>} title={'Мои услуги'}/>
                    <SidebarListItem route_name={'materials.index'} icon={<Archive/>} title={'Материалы'}/>
                    <SidebarListItem route_name={'profile.edit'} icon={<Settings/>} title={'Настройки профиля'}/>
                </List>


                <Box sx={{pl: 1, mt: 'auto', display: 'flex', alignItems: 'center'}}>
                    <Box>
                        <Typography fontWeight="lg" level="body2"> {props.auth?.user?.name}</Typography>
                        <Typography level="body2">{props.auth?.user?.email}</Typography>
                    </Box>


                    <IconButton
                        onClick={logout}
                        variant="plain"
                        sx={{ml: 'auto'}}>
                        <LogOut/>
                    </IconButton>

                </Box>
            </Sheet>
        </React.Fragment>
    );
}
