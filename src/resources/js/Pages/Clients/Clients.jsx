import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Box } from '@mui/joy';

export default function (props) {

    return <AuthenticatedLayout
        auth={props.auth}
        errors={props.errors}
        header={"Клиенты"}
    >
        <Head title="Клиенты" />

        <Box>
        Клиенты
        </Box>
    </AuthenticatedLayout>
}