import {useForm, usePage} from '@inertiajs/react';
import {
    Button,
    Box,
    FormControl,
    FormLabel,
    FormHelperText,
    Textarea,
    Select,
    Option,
    List,
    ListItem,
    Typography,
    Checkbox,
    Stack, Input
} from '@mui/joy';


export function AddOrderForm() {
    const {clients, services, statuses} = usePage().props

    const {data, setData, post, processing, errors,} = useForm({
        client_id: undefined,
        services_ids: [],
        description: "",
        order_date: new Date().toISOString().slice(0, 16),
        status_id: 1
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('orders.create'));
    };

    return <>
        <form onSubmit={submit}>
            <Stack gap={2}>
                <FormControl error={!!errors.client_id}>
                    <FormLabel>Клиент</FormLabel>
                    <Select
                        onChange={(event, value) => setData('client_id', value)}
                        placeholder="Выберите клиента из списка"
                        value={data.client_id}
                        name={'client_id'}
                        sx={{width: '100%'}}
                    >
                        {clients.map(e => <Option value={e.id} key={e.id}>{e.first_name} {e.last_name}</Option>)}
                    </Select>
                    <FormHelperText>{errors.client_id}</FormHelperText>
                </FormControl>
                <Box>

                    <Typography id="sandwich-group" level="body2" fontWeight="lg" mb={1}>
                        Выбирите услуги
                    </Typography>

                    <FormControl error={!!errors.services_ids}>
                        <FormHelperText>{errors.services_ids}</FormHelperText>
                    </FormControl>

                    <Box role="group" aria-labelledby="sandwich-group">
                        <List size="sm">
                            {services.map(e =>
                                <ListItem key={e.id}>
                                    <Checkbox
                                        checked={data.services_ids.includes(e.id)}
                                        onChange={(event) => {
                                            if (event.target.checked) {
                                                setData('services_ids', [...data.services_ids, e.id]);
                                            } else {
                                                setData('services_ids', data.services_ids.filter(e => e !== e.id))
                                            }
                                        }}
                                        label={`${e.name} (${e.price} р.)`}/>
                                </ListItem>
                            )}
                        </List>
                    </Box>
                </Box>

                <FormControl error={!!errors.date}>
                    <FormLabel>Дата исполнения заказа</FormLabel>
                    <Input
                        placeholder="Дата заказа"
                        type={'datetime-local'}
                        onChange={(event) => setData('order_date', event.target.value)}
                        name={'order_date'}
                        value={data.order_date || ''}
                        sx={{width: '100%'}}
                    />


                    <FormHelperText error="true">{errors.date}</FormHelperText>
                </FormControl>

                <FormControl error={!!errors.status_id}>
                    <FormLabel>Статус заказа</FormLabel>
                    <Select
                        placeholder="Выберите статус из списка"
                        name={'status_id'}
                        onChange={(event, value) => setData('status_id', value)}
                        value={data.status_id}
                        sx={{width: '100%'}}
                    >
                        {statuses.map(e => <Option value={e.id} key={e.id}>{e.name}</Option>)}
                    </Select>
                    <FormHelperText error="true">{errors.status_id}</FormHelperText>
                </FormControl>


                <FormControl>
                    <FormLabel>Описание к заказу</FormLabel>
                    <Textarea
                        minRows={4}
                        value={data.description}
                        onChange={(event) => setData('description', event.target.value)}/>
                </FormControl>

                <Box>
                    <Button type={'submit'} disabled={processing}>Добавить заказ</Button>
                </Box>

            </Stack>

        </form>
    </>
}
