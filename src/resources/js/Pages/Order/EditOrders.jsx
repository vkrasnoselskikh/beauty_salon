import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Box } from '@mui/joy';

export default function EditOrders(props) {

    return <AuthenticatedLayout
        auth={props.auth}
        errors={props.errors}
        header={"Заказы"}
    >
        <Head title="Редактор заказов" />

        <Box>
            <Box>
                <Box>
                    <Box>Заказы</Box>
                </Box>
            </Box>
        </Box>
    </AuthenticatedLayout>
}