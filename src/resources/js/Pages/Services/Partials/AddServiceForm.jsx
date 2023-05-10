import {
    Box,
    Button, Card, Checkbox,
    FormControl,
    FormHelperText,
    FormLabel,
    Input,
    List,
    ListItem,
    Stack,
    Textarea,
    Typography
} from "@mui/joy";
import {useForm, usePage} from "@inertiajs/react";
import ListMaterialsForm from "./ListMaterialsForm";


export default function () {
    const {data, setData, post, processing, errors, reset} = useForm({
        name: "",
        price: "",
        description: "",
    });

    const handleOnChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('services.create'));
    };

    return <>
        <form onSubmit={submit}>
            <Stack gap={2}>
                <FormControl error={!!errors.name}>
                    <FormLabel>Название услгуи</FormLabel>
                    <Input
                        name="name"
                        value={data.name}
                        onChange={handleOnChange}
                    />
                    <FormHelperText>{errors.name}</FormHelperText>
                </FormControl>

                <FormControl error={!!errors.price}>
                    <FormLabel>Цена</FormLabel>
                    <Input
                        name="name"
                        value={data.price}
                        onChange={handleOnChange}
                    />
                    <FormHelperText>{errors.price}</FormHelperText>
                </FormControl>


                <FormControl error={!!errors.description}>
                    <FormLabel>Описание услгуи</FormLabel>
                    <Textarea
                        minRows={4}
                        name="description"
                        value={data.description}
                        onChange={handleOnChange}
                    />
                    <FormHelperText>{errors.description}</FormHelperText>
                </FormControl>

                <Box>
                    <Typography>Требуемые материалы:</Typography>
                    <Card>
                        <Typography> Форма требуемых материалов появится сразу после добавления услуги</Typography>
                    </Card>

                </Box>


                <Box display={'flex'} justifyContent={'end'}>
                    <Button type='submit' disabled={processing}>
                        Добавить услугу
                    </Button>
                </Box>
            </Stack>
        </form>
    </>
}
