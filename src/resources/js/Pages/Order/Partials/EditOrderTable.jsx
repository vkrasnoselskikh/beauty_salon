import {DataGrid, ruRU} from '@mui/x-data-grid';
import {Box, IconButton, Button, Avatar, Typography, Autocomplete} from '@mui/joy';
import {Edit2, Trash2, Phone} from "react-feather";
import {usePage} from '@inertiajs/react'
import DeleteOrderDialog from "./DeleteOrderDialog";




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


export function EditOrderTable() {
    const {orders, statuses} = usePage().props;

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
            editable: false,
            renderCell: (params) => {
                return params.value.map(e => e.name).join(', ')
            }

        },

        {
            field: 'price',
            headerName: 'Цена',
            valueGetter: (params) => {
                return params.row.services.map(e => e.price).reduce((a, b) => a + b, 0);
            }
        },

        {
            field: 'date',
            headerName: 'Дата и время заказа',
            type: 'dateTime',
            width: 200,
            sortable: true,
            editable: true,
            valueGetter: ({value}) => value && new Date(value),

        },

        {
            field: 'status_id',
            headerName: 'Статус заказа',
            type: 'singleSelect',
            width: 150,
            editable: true,
            valueOptions: statuses,
            getOptionValue: (value) => value.id,
            getOptionLabel: (value) => value.name,
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
