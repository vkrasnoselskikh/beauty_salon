import {Link, usePage, router} from "@inertiajs/react";
import {Box, Typography, List, ListItem, ListItemContent, ListDivider} from "@mui/joy";
import React from "react";
import IconButton from "@mui/joy/IconButton";
import {Edit, Trash} from "react-feather";
import ListItemButton from "@mui/joy/ListItemButton";


export default function () {
    const {services} = usePage().props
    const delete_item = (id) => {
        router.visit(route('services.delete', id), {
            method: 'delete',
            preserveState: true,
            preserveScroll: true,
            only: ['services']
        })

    }
    return <>
        <Box>
            <Typography level="body3" mb={2}>

            </Typography>
            <List
                variant="outlined"
                sx={{
                    bgcolor: 'background.body',
                    minWidth: 240,
                    borderRadius: 'sm',
                    boxShadow: 'sm',
                    '--ListItemDecorator-size': '48px',
                    '--ListItem-paddingLeft': '1.5rem',
                    '--ListItem-paddingRight': '1rem',
                }}
            >
                {services.map((e, index) => <React.Fragment key={e.id}>
                        <ListItem endAction={
                            <Box display={'flex'} gap={1}>
                                <Box display={'flex'} alignItems={'center'}>
                                    <Typography fontSize="sm"> Цена: {e.price}р</Typography>
                                </Box>
                                <IconButton
                                    onClick={event => delete_item(e.id)}
                                    aria-label="Delete"
                                    size="sm"
                                    variant="plain"
                                    color="neutral">
                                    <Trash/>
                                </IconButton>
                            </Box>

                        }>
                            <ListItemButton component={Link} href={route('services.edit', e.id)}>
                                <ListItemContent>
                                    <Typography fontSize="xl"> {e.name}</Typography>
                                    {!!e.materials.length &&
                                        <Typography level="body2" noWrap>
                                            Требуемые материалы: {e.materials.map(e => `${e.material.name} - ${e.quantity} ${e.material.unit_of_measure}. `).join(', ')}
                                        </Typography>
                                    }
                                </ListItemContent>
                            </ListItemButton>

                        </ListItem>
                        {index + 1 < services.length && <ListDivider inset={'context'}/>}

                    </React.Fragment>
                )}
            </List>
        </Box>
    </>
}
