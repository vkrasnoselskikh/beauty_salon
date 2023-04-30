import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Box, IconButton, Button } from '@mui/joy';
import { DataGrid, ruRU } from '@mui/x-data-grid';
import { Trash2, Edit2, Plus } from 'react-feather';
import { Link } from '@inertiajs/react'

const columns = [
    { field: 'id', headerName: 'Номер заказа', width: 120 },
    {
      field: 'client',
      headerName: 'Клиент',
      width: 250,   
      editable: false,
    },

    {
        field: 'services',
        headerName: 'Услуги',
        width: 200,
        editable: false,
    },

    {
        field: 'date',
        headerName: 'Дата и время заказа',
        width: 200,
        sortable: true,
        editable: false,
    },

    {
        field: 'status',
        headerName: 'Статус заказа',
        width: 150,
        editable: true,
    },

    {
        field: 'actions',
        headerName: '',
        width: 100,
        renderCell: (params) => {
            return <Box display={'flex'} gap={1}>
                <IconButton variant='outlined' color='danger' ><Trash2/> </IconButton>
                <IconButton variant='outlined' color='info'><Edit2/></IconButton>
            </Box>
        }
    },
]

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
            <DataGrid columns={columns} localeText={ruRU.components.MuiDataGrid.defaultProps.localeText} rows={[
                {id: 1, client: 'Test-1',  services: "Стрижка, Укладка", status: "Не выполнен"}
            ]}/>
        </Box>
    </AuthenticatedLayout>
}