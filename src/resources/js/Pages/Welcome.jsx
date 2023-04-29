import { Head } from '@inertiajs/react';
import { Box } from "@mui/joy"
import { Link } from "@/Components/Link"


export default function Welcome(props) {
    return (
        <>
            <Head title="Welcome" />
            <Box display="flex" justifyContent={'flex-end'}>
                {props.auth.user ? (
                    <Link href={route('main')}>
                        Личный кабинет
                    </Link>
                ) : (
                    <Box display="flex" gap={2}>
                        <Link href={route('login')}>
                            Войти
                        </Link>

                        <Link href={route('register')}>
                            Регистрация
                        </Link>
                    </Box>
                )}
            </Box>
        </>
    );
}
