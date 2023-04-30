import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { Box, Button } from '@mui/joy';
import { AddClientForm } from '@/Pages/Clients/Partials/AddClientForm' 


export default function ({ auth, errors }) {

    return <AuthenticatedLayout
        auth={auth}
        errors={errors}
        header={"Добавить клиента"}
        breadcrumbs={[
            {
                route_name: 'clients.index',
                title: 'Клиенты'
            }
        ]}
    >
        <Head title="Добавить клиента" />

        <Box>
            <AddClientForm/>
        </Box>
    </AuthenticatedLayout>
}