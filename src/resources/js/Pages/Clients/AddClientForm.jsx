import { useForm } from '@inertiajs/react';
import { Button, Box, FormControl, FormLabel, FormHelperText,  Input } from '@mui/joy';


export function AddClientForm() {
    const { data, setData, post, processing, errors, reset } = useForm({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
    });

    const handleOnChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('clients.add'));
    };

    return <>
        <form onSubmit={submit}>
            <Box mt={2}>
                <FormControl>
                    <FormLabel>Имя</FormLabel>
                    <Input
                        id="first_name"
                        name="first_name"
                        value={data.first_name}
                        onChange={handleOnChange}
                        error={!!errors.first_name}
                    />
                    <FormHelperText>{errors.first_name}</FormHelperText>
                </FormControl>
            </Box>

            <Box mt={2}>
                <FormControl>
                    <FormLabel>Фамилия</FormLabel>
                    <Input
                        id="last_name"
                        name="last_name"
                        value={data.last_name}
                        onChange={handleOnChange}
                        error={!!errors.last_name}
                    />
                    <FormHelperText>{errors.last_name}</FormHelperText>
                </FormControl>
            </Box>
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
                <FormControl>
                    <FormLabel>Телефон</FormLabel>
                    <Input
                        id="phone"
                        type="phone"
                        name="phone"
                        value={data.phone}
                        onChange={handleOnChange}
                        error={!!errors.phone}
                    />
                    <FormHelperText>{errors.phone}</FormHelperText>
                </FormControl>
            </Box>

            <Box mt={2} display={'flex'} justifyContent={'end'}  >
                <Button type='submit' disabled={processing}>
                    Coхранить
                </Button>
            </Box>
        </form>
    </>
}