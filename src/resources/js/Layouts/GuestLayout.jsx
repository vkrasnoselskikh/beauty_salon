import ApplicationLogo from '@/Components/ApplicationLogo';
import {Link} from '@inertiajs/react';
import {Box, Stack} from '@mui/joy'

export default function Guest({children}) {
    return (
        <Box display={'flex'} sx={{height: '100vh'}} justifyContent={'center'} alignItems={'center'}>
            <Stack gap={2}>
                <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
                    <Link href="/">
                        <ApplicationLogo/>
                    </Link>
                </Box>
                <Box>
                    {children}
                </Box>
            </Stack>
        </Box>
    );
}
