import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Box } from '@mui/joy';

export default function Dashboard(props) {
    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <Box className="py-12">
                <Box className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Box className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <Box className="p-6 text-gray-900">Welcome to ma</Box>
                    </Box>
                </Box>
            </Box>
        </AuthenticatedLayout>
    );
}
