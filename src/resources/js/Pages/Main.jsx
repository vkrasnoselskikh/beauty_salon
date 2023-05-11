import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, router, usePage} from '@inertiajs/react';
import {Box, Button, Card, Chip, Grid, List, ListItem, Typography} from '@mui/joy';
import * as PropTypes from "prop-types";
import ListItemDecorator from "@mui/joy/ListItemDecorator";

function CardHeader(props) {
    return null;
}

CardHeader.propTypes = {
    subheader: PropTypes.string,
    action: PropTypes.element,
    avatar: PropTypes.element,
    title: PropTypes.string
};
export default function Dashboard(props) {

    const {nearest_order, nearest_order_services} = usePage().props
    const total_price = nearest_order?.services?.map(e => e.price).reduce((a, b) => a + b, 0)
    console.log(nearest_order_services)

    const cancelOrderHandle = () => {
        router.visit(route('orders.set_status', [nearest_order.id, 2]), {
            method: 'POST',
            preserveState: true,
            only: ['nearest_order']
        })
    }
    const successOrderHandle = () => {
        router.visit(route('orders.set_status', [nearest_order.id, 5]), {
            method: 'POST',
            preserveState: true,
            only: ['nearest_order']
        })
    }


    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={"Главная"}
        >
            <Head title="Главная"/>

            {!nearest_order &&
                <Typography level={'body2'}>Ближайших заказов нет. Пора поработать! Создайте заказы в разделе
                    "Заказы"</Typography>}

            {!!nearest_order &&
                <Box>
                    <Typography level={'body2'}>Ближайший заказ:</Typography>
                    <Grid container mt={2}>
                        <Grid xs={4}>
                            <Card variant="outlined">
                                <Typography level="h2" fontSize="md" sx={{mb: 0.5}}>
                                    {nearest_order.client.first_name} {nearest_order.client.last_name}
                                </Typography>
                                <Typography level="body2">Телефон: {nearest_order.client.phone}. </Typography>
                                <Typography level="body2">Email: {nearest_order.client.email}. </Typography>

                                <Box mt={2}>
                                    <Typography level="body1">Описание</Typography>
                                    <Typography level="body2">{nearest_order.description}. </Typography>
                                </Box>

                                {!!nearest_order.services.length &&
                                    <Box mt={2}>
                                        <Typography level="body1">Предоставляемые услуги: </Typography>

                                        <List size={'sm'} variant="outlined" sx={{
                                            borderRadius: 'sm',
                                            maxWidth: 300,
                                            boxShadow: 'sm',
                                            bgcolor: 'background.body',
                                        }}>
                                            {nearest_order.services.map(e => <ListItem key={e.id}>{e.name}</ListItem>)}
                                        </List>
                                    </Box>
                                }

                                {!!nearest_order_services.length &&
                                    <Box mt={2}>
                                        <Typography level="body1">Потребуются материалы: </Typography>

                                        <List size={'sm'} variant="outlined" sx={{
                                            borderRadius: 'sm',
                                            maxWidth: 300,
                                            boxShadow: 'sm',
                                            bgcolor: 'background.body',
                                        }}>
                                            {nearest_order_services.map((e, index) => {
                                                const is_have_in_stock = e.quantity <= e.material.quantity

                                                return <ListItem
                                                    endAction={!is_have_in_stock ?
                                                        <ListItemDecorator>
                                                            <Chip size={'sm'}
                                                                  color={'danger'}>Требуется купить!!!</Chip>
                                                        </ListItemDecorator> : <Chip size={'sm'}
                                                                                     color={'success'}>✓</Chip>}
                                                    key={index}>{e.material.name} - {e.quantity} {e.material.unit_of_measure}.

                                                </ListItem>
                                            })}
                                        </List>
                                    </Box>
                                }

                                <Box sx={{display: 'flex'}} mt={2}>
                                    <div>
                                        <Typography level="body3">Итоговая цена:</Typography>
                                        <Typography fontSize="lg" fontWeight="lg">
                                            {total_price} р.
                                        </Typography>
                                    </div>
                                    <Box sx={{display: 'flex', ml: 'auto'}} gap={1}>
                                        <Button
                                            variant="outlined"
                                            onClick={cancelOrderHandle}
                                            size="sm"
                                            color="danger"
                                            sx={{ml: 'auto', fontWeight: 600}}
                                        >
                                            Отменить
                                        </Button>
                                        <Button
                                            onClick={successOrderHandle}
                                            variant="solid"
                                            size="sm"
                                            color="success"
                                            sx={{ml: 'auto', fontWeight: 600}}
                                        >Завершить</Button>
                                    </Box>
                                </Box>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>
            }
        </AuthenticatedLayout>
    );
}
