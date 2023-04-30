import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { Box, Button } from '@mui/joy';
import { AddOrderForm } from '@/Pages/Order/Partials/AddOrderForm' 


export default function ({ auth, errors, clients, services, statuses }) {

    return <AuthenticatedLayout
        auth={auth}
        errors={errors}
        header={"Добавить заказ"}
        breadcrumbs={[
            {
                route_name: 'orders.index',
                title: 'Заказы'
            }
        ]}
    >
        <Head title="Добавить заказ" />

        <Box>
            <AddOrderForm {...{clients, services, statuses}}/>
        </Box>
    </AuthenticatedLayout>
}