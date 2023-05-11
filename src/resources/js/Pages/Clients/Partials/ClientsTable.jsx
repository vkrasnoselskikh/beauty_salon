import {DataGrid, ruRU, useGridApiRef} from "@mui/x-data-grid";
import {useCallback} from "react";
import {router, usePage} from "@inertiajs/react";
import DeleteClientDialog from "./DeleteClientDialog";

const columns = [
    {field: 'id', headerName: '#', width: 50},
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
        editable: true,
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
export default function () {
    const apiRef = useGridApiRef();

    const {clients} = usePage().props
    const processRowUpdate = useCallback(
        async (newRow) => {
            // Make the HTTP request to save in the backend
            router.visit(route('clients.update', newRow.id), {
                method: 'post',
                data: newRow,
                preserveState: true,
                preserveScroll: true,
                only: ['clietns']
            })
            return newRow;
        },
        [],
    );

    return <DataGrid
        columns={columns}
        apiRef={apiRef}
        processRowUpdate={processRowUpdate}
        onProcessRowUpdateError={(error) => console.error(error)}
        rows={clients}
        localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}/>
}
