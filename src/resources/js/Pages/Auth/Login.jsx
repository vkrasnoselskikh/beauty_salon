import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import { Box, Input, Button, Alert, Checkbox, FormLabel, FormControl, FormHelperText } from '@mui/joy'

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: '',
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const handleOnChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <GuestLayout>
            <Head title="Авторизация" />

            {status && <Alert>{status}</Alert>}

            <form onSubmit={submit}>
                <Box mt={2}>
                    <FormControl>
                        <FormLabel>Email</FormLabel>
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            onChange={handleOnChange}
                            error={!!errors.email}
                        />
                        <FormHelperText>{errors.email}</FormHelperText>
                    </FormControl>
                </Box>

                <Box mt={2}>
                    <FormLabel>Пароль</FormLabel>
                    <Input
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        onChange={handleOnChange}
                        error={!!errors.password}
                    />
                     <FormHelperText>{errors.password}</FormHelperText>

                </Box>

                <Box mt={2}>
                    <Checkbox name="remember" label="Запомнить меня" value={data.remember} onChange={(event)=>{setData('remember', event.target.checked.toString());}} />
                </Box>

                <Box mt={2} display={'flex'} justifyContent={'end'}  >
                    <Button type='submit' disabled={processing}>
                        Войти
                    </Button>
                </Box>
            </form>
        </GuestLayout>
    );
}
