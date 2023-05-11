import {DataGrid, ruRU, useGridApiRef} from "@mui/x-data-grid";
import {Head, Link, router, usePage} from "@inertiajs/react";
import DeleteMaterialDialog from "@/Pages/Materials/Partials/DeleteMaterialDialog";
import {useCallback} from "react";
import {unit_of_measures} from "./AddMaterialForm";

const columns = [
    {field: 'id', headerName: '#', width: 50},
    {
        field: 'name',
        headerName: 'Название',
        width: 200,
        editable: true,
    },

    {
        field: 'quantity',
        type: 'number',
        headerName: 'Количество',
        width: 200,
        editable: true,
    },

    {
        field: 'unit_of_measure',
        type: 'singleSelect',
        valueOptions: unit_of_measures,
        headerName: 'Единица измерения',
        width: 200,
        editable: true,
    },

    {
        field: 'actions',
        type: 'actions',
        width: 100,
        getActions: (params) => [
            <DeleteMaterialDialog material_id={params.id} material_name={params.row.name}/>
        ],
    }
]

export default function () {
    const {materials} = usePage().props
    const apiRef = useGridApiRef();

    const processRowUpdate = useCallback(
        async (newRow) => {
            // Make the HTTP request to save in the backend
            router.visit(route('materials.update', newRow.id), {
                method: 'post',
                data: newRow,
                preserveState: true,
                preserveScroll: true,
                only: ['materials']
            })
            return newRow;
        },
        [],
    );


    return <DataGrid
        columns={columns}
        apiRef={apiRef}
        rows={materials}
        processRowUpdate={processRowUpdate}
        onProcessRowUpdateError={(error) => console.error(error)}
        localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}/>
}
