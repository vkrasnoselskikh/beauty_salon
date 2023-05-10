import {useCallback} from 'react'
import {DataGrid, ruRU} from '@mui/x-data-grid';
import {usePage} from '@inertiajs/react'
import DeleteOrderDialog from "./DeleteOrderDialog";
import {ClientCard} from "./ClientCard";
import {router} from '@inertiajs/react'

export function EditOrderTable() {
    const {orders, statuses} = usePage().props;

    const columns = [
        {field: 'id', headerName: '#', width: 40},
        {
            field: 'client_id',
            headerName: 'Клиент',
            width: 250,
            editable: false,
            renderCell: (params) => <ClientCard client_id={params.value}/>
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
            field: 'order_date',
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

    const processRowUpdate = useCallback(
        async (newRow) => {
            // Make the HTTP request to save in the backend
            router.visit(route('orders.update', newRow.id), {
                method: 'post',
                data: newRow,
                preserveState: true,
                preserveScroll: true,
                only: ['orders']
            })
            return newRow;
        },
        [],
    );

    return <DataGrid
        columns={columns}
        localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
        processRowUpdate={processRowUpdate}
        onProcessRowUpdateError={(error) => console.error(error)}
        initialState={{
            sorting: {
                sortModel: [{field: 'order_date', sort: 'asc'}],
            },
        }}
        rows={orders}
    />
}
