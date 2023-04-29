import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Head } from '@inertiajs/react';
import { Alert } from '@mui/joy';
import { Box } from '@mui/joy'
export default function Edit({ auth, mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout
            auth={auth}
            header={"Настройки профиля"}
        >
            <Head title="Настройки профиля" />
            <Box>
                <Box>
                    <Box>
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                        />
                    </Box>

                    <Box>
                        <UpdatePasswordForm className="max-w-xl" />
                    </Box>

                    <Box >
                        <DeleteUserForm className="max-w-xl" />
                    </Box>
                </Box>
            </Box>
        </AuthenticatedLayout>
    );
}
