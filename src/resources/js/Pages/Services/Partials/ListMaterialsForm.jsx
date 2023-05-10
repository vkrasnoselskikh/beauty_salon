import React, {useState} from 'react';
import {
    Input,
    Button,
    FormControl,
    FormLabel,
    Checkbox, Box,
} from '@mui/joy';
import {usePage} from "@inertiajs/react";
import {DataGrid, ruRU} from '@mui/x-data-grid';

const columns = [
    {field: 'id', headerName: '#', width: 40},
    {field: 'name', headerName: 'Материал', width: 300},
    {field: 'count', type: "number", headerName: 'Количество', width: 300, editable: true},
    {field: 'unit_of_measure', headerName: 'Единица измерения', width: 300},
]
export default function ({materials_ids, setItems}) {
    const {materials} = usePage().props

    return <DataGrid
        columns={columns}
        localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
        // processRowUpdate={processRowUpdate}
        // onProcessRowUpdateError={(error) => console.error(error)}
        rows={materials}
    />
};
