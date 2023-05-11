import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head} from '@inertiajs/react';
import {Box, Button} from '@mui/joy';
import {Plus} from 'react-feather';
import {Link} from '@inertiajs/react'
import ClientsTable from "./Partials/ClientsTable";


export default function ({auth, errors}) {


    return <AuthenticatedLayout
        auth={auth}
        errors={errors}
        header={"Клиенты"}
        actions={[
            <Button startDecorator={<Plus/>}
                    key={'add'}
                    component={Link}
                    href={route('clients.add')}>Добавить клиента</Button>
        ]}
    >
        <Head title="Клиенты"/>
        <Box mt={2}>
            <ClientsTable/>
        </Box>
    </AuthenticatedLayout>
}
