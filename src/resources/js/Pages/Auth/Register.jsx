import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import { Box, Input, Button, Alert, Checkbox, FormLabel, FormControl, FormHelperText } from '@mui/joy'
import { Link } from '@/Components/Link'

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const handleOnChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('register'));
    };

    return (
        <GuestLayout>
            <Head title="Регистрация" />

            <form onSubmit={submit}>

                <Box mt={2}>
                    <FormControl>
                        <FormLabel>Имя</FormLabel>
                        <Input
                            id="name"
                            name="name"
                            value={data.name}
                            onChange={handleOnChange}
                            error={!!errors.name}
                            required
                        />
                        <FormHelperText>{errors.name}</FormHelperText>
                    </FormControl>
                </Box>


                <Box mt={2}>
                    <FormControl>
                        <FormLabel>Email</FormLabel>
                        <Input
                            id="email"
                            name="email"
                            value={data.email}
                            onChange={handleOnChange}
                            error={!!errors.email}
                            required
                        />
                        <FormHelperText>{errors.email}</FormHelperText>
                    </FormControl>
                </Box>

                <Box mt={2}>
                    <FormControl>
                        <FormLabel>Пароль</FormLabel>
                        <Input
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            onChange={handleOnChange}
                            error={!!errors.password}
                            required
                        />
                        <FormHelperText>{errors.password}</FormHelperText>
                    </FormControl>
                </Box>

                <Box mt={2}>
                    <FormControl>
                        <FormLabel>Повторите пароль</FormLabel>
                        <Input
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            onChange={handleOnChange}
                            error={!!errors.password_confirmation}
                            required
                        />
                        <FormHelperText>{errors.password_confirmation}</FormHelperText>
                    </FormControl>
                </Box>

                <Box mt={2} display={'flex'} gap={2} alignItems={'center'}>
                    <Link href={route('login')}>
                        Уже зарегистровались?
                    </Link>

                    <Button type='submit' disabled={processing}>
                        Регистрация
                    </Button>

                </Box>
            </form>
        </GuestLayout>
    );
}
