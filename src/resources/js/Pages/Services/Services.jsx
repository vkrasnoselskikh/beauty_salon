import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link} from '@inertiajs/react';
import {Box, Button} from '@mui/joy';
import {Plus} from "react-feather";
import ListServices from "./Partials/ListServices";

export default function (props) {

    return <AuthenticatedLayout
        auth={props.auth}
        errors={props.errors}
        header={"Мои услуги"}
        actions={[
            <Button startDecorator={<Plus />} key={'add'} component={Link} href={route('services.add')}>Добавить услугу</Button>
        ]}
    >
        <Head title="Мои услуги" />

        <Box>
            <ListServices/>
        </Box>
    </AuthenticatedLayout>
}
