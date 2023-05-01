import { useForm, usePage } from '@inertiajs/react';
import { Button, Box, FormControl, FormLabel, FormHelperText,  Input } from '@mui/joy';


export function AddOrderForm() {
    const {clients, services, statuses} = usePage().props

    console.log({clients, services, statuses})
    
    const { data, setData, post, processing, errors, reset } = useForm({
        client_id: "",
        services_ids: "",
        description: "",
        date: "",
        status: ""
    });

    const handleOnChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('order.add'));
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
        </form>
    </>
}