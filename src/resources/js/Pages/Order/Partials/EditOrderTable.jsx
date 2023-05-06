import {DataGrid, ruRU} from '@mui/x-data-grid';
import {Box, IconButton, Button, Avatar, Typography, Autocomplete} from '@mui/joy';
import {Edit2, Trash2, Phone} from "react-feather";
import {usePage} from '@inertiajs/react'
import DeleteOrderDialog from "./DeleteOrderDialog";

const columns = [
    {field: 'id', headerName: '#', width: 40},
    {
        field: 'client_id',
        headerName: 'Клиент',
        width: 250,
        editable: false,
        renderCell: (params) => <ClientRender client_id={params.value}/>
    },

    {
        field: 'services',
        headerName: 'Услуги',
        width: 300,
        editable: true,

        renderEditCell: (params) => {
            return <Services services_ids={params.value.map(e=>e.id)}/>
        },
        renderCell: (params) => {
            console.log(params)
            return params.value.map(e => e.name).join(', ')
        }

    },

    {
        field: 'date',
        headerName: 'Дата и время заказа',
        width: 200,
        sortable: true,
        editable: false,
    },

    {
        field: 'status_id',
        headerName: 'Статус заказа',
        width: 150,
        editable: true,
    },

    {
        field: 'description',
        headerName: 'Комментарий',
        width: 200,
        editable: true,
    },

    {
        field: 'actions',
        type: 'actions',
        width: 100,
        getActions: (params) => [
            <DeleteOrderDialog order_id={params.id}/>
        ],
    },
]

function ClientRender({client_id}) {
    const {clients} = usePage().props;
    const client = clients.find(e => e.id === client_id)
    return <>
        <Box sx={{display: 'flex', gap: 2, alignItems: 'center'}}>
            <Avatar size="sm">{client.first_name.charAt(0)}{client.last_name.charAt(0)}</Avatar>
            <div>
                <Typography
                    fontWeight="lg"
                    level="body3"
                    textColor="text.primary"
                >
                    {client.first_name} {client.last_name}
                </Typography>
                <Typography level="body3">Телефон: {client.phone}</Typography>
            </div>
        </Box>
    </>
}

export default function Services({services_ids}) {
    const {services} = usePage().props;
    return (
        <Autocomplete
            multiple
            fullWidth
            id="tags-default"
            placeholder="Услуги"
            options={services}
            getOptionLabel={(option) => option.name}
        />
    );
}

export function EditOrderTable() {
    const {orders} = usePage().props;


    console.log(orders)

    return <DataGrid
        columns={columns}
        localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
        initialState={{
            sorting: {
                sortModel: [{field: 'date', sort: 'asc'}],
            },
        }}
        rows={orders}
    />
}
