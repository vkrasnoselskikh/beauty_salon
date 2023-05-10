import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { Box, Button } from '@mui/joy';
import { AddClientForm } from '@/Pages/Clients/Partials/AddClientForm'
import ListServices from "./Partials/ListServices";
import AddServiceForm from "./Partials/AddServiceForm";


export default function ({ auth, errors }) {

    return <AuthenticatedLayout
        auth={auth}
        errors={errors}
        header={"Добавить услугу"}
        breadcrumbs={[
            {
                route_name: 'services.index',
                title: 'Услуги'
            }
        ]}
    >
        <Head title="Добавить услугу" />

        <Box>
            <AddServiceForm/>
        </Box>
    </AuthenticatedLayout>
}
