import { useState, useEffect } from 'react';
import { Link } from '@/Components/Link';
import { Box, Breadcrumbs, Typography, CssBaseline } from '@mui/joy'
import { SideBar } from '@/Components/SideBar'

export default function Authenticated({ auth, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    useEffect(() => {
        // Feather icon setup: https://github.com/feathericons/feather#4-replace
        // @ts-ignore
        if (typeof feather !== 'undefined') {
          // @ts-ignore
          feather.replace();
        }
      }, []);

    return (
        <>
            <CssBaseline/>
            <Box sx={{ display: 'flex', minHeight: '100dvh' }}>

                <SideBar auth={auth} />

                <Box
                    component="main"
                    className="MainContent"
                    sx={(theme) => ({
                        px: {
                            xs: 2,
                            md: 6,
                        },
                        pt: {
                            xs: `calc(${theme.spacing(2)} + var(--Header-height))`,
                            sm: `calc(${theme.spacing(2)} + var(--Header-height))`,
                            md: 3,
                        },
                        pb: {
                            xs: 2,
                            sm: 2,
                            md: 3,
                        },
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        minWidth: 0,
                        height: '100dvh',
                        gap: 1,
                    })}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Breadcrumbs
                            size="sm"
                            aria-label="breadcrumbs"
                            separator={<i data-feather="chevron-right" />}
                            sx={{
                                '--Breadcrumbs-gap': '1rem',
                                '--Icon-fontSize': '16px',
                                fontWeight: 'lg',
                                color: 'neutral.400',
                                px: 0,
                            }}
                        >
                            <Link
                                underline="none"
                                color="neutral"
                                fontSize="inherit"
                                href="/dashboard"
                                aria-label="Home"
                            >
                                <i data-feather="home" />
                            </Link>
                        
                            <Typography fontSize="inherit" variant="soft" color="primary">{header}</Typography>
                        </Breadcrumbs>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            my: 1,
                            gap: 1,
                            flexWrap: 'wrap',
                            '& > *': {
                                minWidth: 'clamp(0px, (500px - 100%) * 999, 100%)',
                                flexGrow: 1,
                            },
                        }}
                    >
                        <Typography level="h1" fontSize="xl4">{header}</Typography>
                    </Box>

                    <main>{children}</main>

                </Box>


            </Box>
        </>

    );
}
