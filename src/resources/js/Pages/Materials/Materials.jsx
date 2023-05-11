import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link} from '@inertiajs/react';
import {Box, Button} from '@mui/joy';
import MaterialsTable from "@/Pages/Materials/Partials/MaterialsTable";
import {Plus} from "react-feather";

export default function (props) {

    return <AuthenticatedLayout
        auth={props.auth}
        errors={props.errors}
        header={"Материалы"}
        actions={[
            <Button startDecorator={<Plus/>} key={'add'} component={Link} href={route('materials.add')}>Добавить
                материал</Button>
        ]}
    >
        <Head title="Материалы"/>

        <Box>
            <MaterialsTable/>
        </Box>
    </AuthenticatedLayout>
}
