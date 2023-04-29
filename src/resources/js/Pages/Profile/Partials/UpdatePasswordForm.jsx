import { useRef } from 'react';
import { useForm } from '@inertiajs/react';
import { Box, FormControl, Typography, FormLabel, Input, FormHelperText, Button, Alert } from '@mui/joy';

export default function UpdatePasswordForm({ className }) {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword = (e) => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: () => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    return (
        <Box mt={2}>
            <header>
                <Typography level="h4" fontWeight="700" sx={{ mt: 0.8 }}>Обновить пароль</Typography>

                <Typography level="body1" sx={{ mb: 0.5 }}>
                    Убедитесь, что ваша учетная запись использует длинный, случайный пароль, чтобы оставаться в безопасности.
                </Typography>
            </header>
            <form onSubmit={updatePassword}>
                <FormControl>
                    <FormLabel sx={{ fontSize: 16 }}>Текущий пароль</FormLabel>
                    <Input
                        id="current_password"
                        ref={currentPasswordInput}
                        value={data.current_password}
                        onChange={(e) => setData('current_password', e.target.value)}
                        type="password"
                        error={!!errors.current_password}
                    />

                    <FormHelperText>{errors.current_password}</FormHelperText>
                </FormControl>

                <FormControl>
                    <FormLabel sx={{ fontSize: 16 }}>Новый пароль</FormLabel>
                    <Input
                        id="password"
                        ref={passwordInput}
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        type="password"
                        error={!!errors.password}
                    />
                    <FormHelperText>{errors.password}</FormHelperText>
                </FormControl>

                <FormControl>
                    <FormLabel sx={{ fontSize: 16 }}>Подтвердите пароль</FormLabel>
                    <Input
                        id="password_confirmation"
                        value={data.password_confirmation}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        type="password"
                        error={!!errors.password_confirmation}
                    />
                    <FormHelperText>{errors.password_confirmation}</FormHelperText>
                </FormControl>

                <Box sx={{ mt: 1 }}>
                    <Button disabled={processing} variant="solid" type='submit'>Сохранить</Button>
                    {recentlySuccessful &&
                        <Box mt={2}>
                            <Alert color={"success"}>Сохранено</Alert>
                        </Box>
                    }
                </Box>
            </form>
        </Box>
    );
}
