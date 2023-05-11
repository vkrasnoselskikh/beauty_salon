import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { Box, Button } from '@mui/joy';
import EditServiceForm from "./Partials/EditServiceForm";


export default function ({ auth, errors }) {

    return <AuthenticatedLayout
        auth={auth}
        errors={errors}
        header={"Редактировать услугу"}
        breadcrumbs={[
            {
                route_name: 'services.index',
                title: 'Услуги'
            }
        ]}
    >
        <Head title="Редактировать услугу" />

        <Box>
            <EditServiceForm/>
        </Box>
    </AuthenticatedLayout>
}
