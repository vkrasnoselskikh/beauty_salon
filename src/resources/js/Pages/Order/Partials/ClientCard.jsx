import {usePage} from "@inertiajs/react";
import {Avatar, Box, Typography} from "@mui/joy";

export function ClientCard({client_id}) {
    const {clients} = usePage().props;
    const client = clients.find(e => e.id === client_id)
    return <>
        <Box sx={{display: 'flex', gap: 2, alignItems: 'center'}}>
            <Avatar size="sm">{client.first_name.charAt(0)}{client.last_name.charAt(0)}</Avatar>
            <div>
                <Typography
                    fontWeight="lg"
                    level="body3"
                    textColor="text.primary"
                >
                    {client.first_name} {client.last_name}
                </Typography>
                <Typography level="body3">Телефон: {client.phone}</Typography>
            </div>
        </Box>
    </>
}
