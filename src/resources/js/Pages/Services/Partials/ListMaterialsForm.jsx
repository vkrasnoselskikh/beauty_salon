import React, {useEffect, useState} from 'react';
import {usePage} from "@inertiajs/react";
import {
    Box,
    ListItem,
    List,
    IconButton,
    Select,
    Input,
    Button,
    Card,
    Sheet,
    Option,
    Typography,
    ListItemContent
} from "@mui/joy";
import {Trash} from "react-feather";


export default function ({value, onChange}) {
    const {materials, service} = usePage().props

    const [items, setItems] = useState([])

    useEffect(() => {
            if (onChange) onChange(items);
        }, [items]
    )

    useEffect(() => {
        if (value) setItems(value)
    }, [value])

    const handleAddRow = (e) => {
        setItems((prevRows) => [...prevRows, {
            material_id: newItemId,
            service_id: service.id,
            material: {
                name: materials.find(e => e.id === newItemId).name,
                unit_of_measure: materials.find(e => e.id === newItemId).unit_of_measure
            },
            quantity: newItemQuantity

        }])
    };

    const handleDelete = (index) => {
        setItems((prevItems) => prevItems.filter((e, idx) => idx !== index));
    };


    const [newItemId, setNewItemId] = useState('');
    const [newItemQuantity, setNewItemQuantity] = useState(0);


    return <>
        <Box>
            <Sheet>
                <List>
                    {items.map((item, index) => (
                        <ListItem
                            key={index}
                            endAction={
                                <IconButton
                                    onClick={e => {
                                        handleDelete(index)
                                    }}
                                    aria-label="Delete" size="sm" variant="plain" color="danger">
                                    <Trash/>
                                </IconButton>
                            }
                        >
                            <ListItemContent>
                                <Typography>{item.material.name} <Typography
                                    variant={'body2'}>{item.quantity} {item.material.unit_of_measure}</Typography></Typography>

                            </ListItemContent>
                        </ListItem>
                    ))}
                </List>
            </Sheet>

            <Card>
                <Typography> Добавить материал:</Typography>

                <Box display={'flex'} gap={2}>
                    <Select
                        label="Item"
                        value={newItemId}
                        placeholder={'Выберите материал'}
                        required
                        onChange={(e, value) => setNewItemId(value)}
                        sx={{width: '100%'}}
                    >
                        {materials.map(e => <Option key={e.id} value={e.id}>{e.name}</Option>)}
                    </Select>
                    <Box display={'flex'}>
                        <Input
                            type="number"
                            label="Quantity"
                            required
                            value={newItemQuantity || ""}
                            placeholder={'Укажите количество'}
                            onChange={(e) => setNewItemQuantity(parseInt(e.target.value))}
                            endDecorator={materials.find(e => e.id === newItemId) ?
                                <Button
                                    variant="outlined"
                                    color="neutral"
                                    sx={{borderTopLeftRadius: 0, borderBottomLeftRadius: 0}}
                                >
                                    {materials.find(e => e.id === newItemId)?.unit_of_measure}.
                                </Button> : undefined
                            }
                            fullWidth
                        />

                    </Box>


                    <Button onClick={handleAddRow}>
                        Добавить
                    </Button>

                </Box>


            </Card>
        </Box>


    </>
};
