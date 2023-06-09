import { Link, useForm, usePage } from '@inertiajs/react';
import { Typography } from '@mui/joy';
import { Box, FormControl, FormLabel, Input, FormHelperText, Button, Alert } from '@mui/joy';

export default function UpdateProfileInformation({ mustVerifyEmail, status, className }) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name: user.name,
        email: user.email,
    });

    const submit = (e) => {
        e.preventDefault();

        patch(route('profile.update'));
    };

    return (
        <section className={className}>
            <header>
                <Typography level="h4" fontWeight="700">Профиль пользователя</Typography>
                <Typography level="body1">
                    Обновить информацию профиля и адрес электронной почты вашей учетной записи.
                </Typography>
            </header>
            <form onSubmit={submit}>

                <FormControl sx={{ mt: 0.1 }}>
                    <FormLabel sx={{ fontSize: 16 }}>Имя пользователя</FormLabel>

                    <Input
                        id="name"
                        //className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        autoComplete="name"
                    />

                    <FormHelperText message={errors.name} />
                </FormControl>

                <FormControl>
                    <FormLabel sx={{ fontSize: 16 }}>Почта пользователя</FormLabel>

                    <Input
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                    />

                    <FormHelperText message={errors.email} />
                </FormControl>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <Box>
                        <Typography level="body1">
                            Ваш адрес электронной почты не подтвержден.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                            //className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Нажмите здесь, чтобы отправить письмо с подтверждением еще раз.
                            </Link>
                        </Typography>

                        {status === 'verification-link-sent' && (
                            <Box>
                                <Typography level="body1">
                                    Новая ссылка для подтверждения была отправлена на ваш адрес электронной почты.
                                </Typography>
                            </Box>
                        )}
                    </Box>
                )}

                <Box sx={{ mt: 1 }}>
                    <Button disabled={processing} variant="solid" type="submit">Сохранить</Button>

                    {recentlySuccessful &&
                        <Box mt={2}>
                            <Alert color={"success"}>Сохранено</Alert>
                        </Box>
                    }
                </Box>
            </form>
        </section>
    );
}
