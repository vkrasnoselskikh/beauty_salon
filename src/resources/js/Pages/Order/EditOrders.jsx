import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Box, Button } from '@mui/joy';
import { Plus } from 'react-feather';
import { Link } from '@inertiajs/react'
import {EditOrderTable} from "./Partials/EditOrderTable";


export default function EditOrders(props) {
    return <AuthenticatedLayout
        auth={props.auth}
        errors={props.errors}
        header={"Заказы"}
        actions={[
            <Button startDecorator={<Plus />} key={'add'} component={Link} href={route('orders.add')}>Добавить заказ</Button>
        ]}
    >
        <Head title="Редактор заказов" />

        <Box>
            <EditOrderTable/>
        </Box>
    </AuthenticatedLayout>
}
