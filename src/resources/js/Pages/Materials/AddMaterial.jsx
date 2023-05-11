import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { Box, Button } from '@mui/joy';
import {AddMaterialForm} from "./Partials/AddMaterialForm";


export default function ({ auth, errors }) {

    return <AuthenticatedLayout
        auth={auth}
        errors={errors}
        header={"Добавить материал"}
        breadcrumbs={[
            {
                route_name: 'materials.index',
                title: 'Материалы'
            }
        ]}
    >
        <Head title="Добавить материал" />

        <Box>
            <AddMaterialForm/>
        </Box>
    </AuthenticatedLayout>
}
