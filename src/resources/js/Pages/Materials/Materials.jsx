import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Box } from '@mui/joy';

export default function (props) {

    return <AuthenticatedLayout
        auth={props.auth}
        errors={props.errors}
        header={"Материалы"}
    >
        <Head title="Материалы" />

        <Box>
            Материалы
        </Box>
    </AuthenticatedLayout>
}