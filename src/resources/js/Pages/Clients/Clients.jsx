import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Box, Button} from '@mui/joy';
import { DataGrid, ruRU, useGridApiRef } from '@mui/x-data-grid';
import { Plus } from 'react-feather';
import { Link } from '@inertiajs/react'
import DeleteClientDialog from '@/Pages/Clients/Partials/DeleteClientDialog'

const columns = [
    { field: 'id', headerName: '#', width: 50 },
    {
        field: 'last_name',
        headerName: 'Фамилия',
        width: 200,
        editable: true,
    },
    {
        field: 'first_name',
        headerName: 'Имя',
        width: 250,
        editable: false,
    },

    {
        field: 'phone',
        headerName: 'Телефон',
        width: 200,
        sortable: true,
        editable: true,
    },

    {
        field: 'email',
        headerName: 'Email',
        width: 250,
        editable: true,
    },

    {
        field: 'actions',
        type: 'actions',
        width: 100,
        getActions: (params) => [
            <DeleteClientDialog user_id={params.id} user_name={params.row.first_name}/>           
        ],
    }
]

export default function ({ auth, errors, clients }) {

    const apiRef = useGridApiRef();



    return <AuthenticatedLayout
        auth={auth}
        errors={errors}
        header={"Клиенты"}
        actions={[ 
            <Button startDecorator={<Plus />} key={'add'} component={Link} href={route('clients.add')}>Добавить клиента</Button>
        ]}
    >
        <Head title="Клиенты" />

       

        <Box mt={2}>
            <DataGrid
                columns={columns}
                apiRef={apiRef}
                rows={clients}
                localeText={ruRU.components.MuiDataGrid.defaultProps.localeText} />
        </Box>
    </AuthenticatedLayout>
}