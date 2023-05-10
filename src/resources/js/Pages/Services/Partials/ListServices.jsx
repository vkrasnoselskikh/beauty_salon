import {usePage} from "@inertiajs/react";
import {Box, Typography, List, ListItem, ListItemDecorator, Avatar, ListDivider} from "@mui/joy";
import React from "react";
import IconButton from "@mui/joy/IconButton";
import {Edit, Trash} from "react-feather";


export default function () {
    const {services} = usePage().props
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
                            <>
                                <Typography fontSize="sm"> Цена: {e.price}р</Typography>
                                <IconButton aria-label="Edit" size="sm" variant="plain" color="neutral">
                                    <Edit />
                                </IconButton>
                                <IconButton aria-label="Delete" size="sm" variant="plain" color="neutral">
                                    <Trash />
                                </IconButton>

                            </>

                        }>
                            <div>
                                <Typography fontSize="xl"> {e.name}</Typography>
                                <Typography fontSize="xs"> {e.price}</Typography>
                            </div>



                        </ListItem>
                    {  index + 1 < services.length &&  <ListDivider inset={'context'}/>}

                    </React.Fragment>
                )}
            </List>
        </Box>
    </>
}
