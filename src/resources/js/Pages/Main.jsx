import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Box } from '@mui/joy';

export default function Dashboard(props) {
    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={"Главная"}
        >
            <Head title="Главная" />

            <Box>
                <Box>
                    <Box>
                        <Box>Сводка по ближайшим заказам</Box>
                    </Box>
                </Box>
            </Box>
        </AuthenticatedLayout>
    );
}
