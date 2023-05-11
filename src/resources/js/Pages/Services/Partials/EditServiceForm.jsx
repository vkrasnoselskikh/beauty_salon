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
    const {service, service_count_materials} = usePage().props
    const {data, setData, post, processing, errors, reset} = useForm({
        name: service.name,
        price: service.price,
        description: service.description,
        materials: service.materials
    });
    console.log(service)

    const handleOnChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('services.update', service.id));
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
                        name="price"
                        type='number'
                        step=".01"
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
                        value={data.description || ""}
                        onChange={handleOnChange}
                    />
                    <FormHelperText>{errors.description}</FormHelperText>
                </FormControl>

                <Box>
                    <Typography>Требуемые материалы:</Typography>
                    <ListMaterialsForm value={service.materials} onChange={(m)=> setData('materials', m)}/>
                </Box>


                <Box display={'flex'} justifyContent={'end'}>
                    <Button type='submit' disabled={processing}>
                        Сохранить
                    </Button>
                </Box>
            </Stack>
        </form>
    </>
}
