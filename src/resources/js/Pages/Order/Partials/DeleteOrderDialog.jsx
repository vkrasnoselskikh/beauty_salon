import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { Trash2, Info } from 'react-feather';
import Typography from '@mui/joy/Typography';
import { router } from '@inertiajs/react'


export default function DeleteOrderDialog({order_id }) {

    const [open, setOpen] = React.useState(false);

    const delete_order = () => {
        router.delete(route('order.delete', order_id), {
            onSuccess: ()=> setOpen(false)
        })
    }
    return (
        <React.Fragment>
            <GridActionsCellItem icon={<Trash2 />} label='Удалить' onClick={e=>setOpen(true)}/>


            <Modal open={open} onClose={() => setOpen(false)}>
                <ModalDialog
                    variant="outlined"
                    role="alertdialog"
                    aria-labelledby="alert-dialog-modal-title"
                    aria-describedby="alert-dialog-modal-description"
                >
                    <Typography
                        id="alert-dialog-modal-title"
                        component="h2"
                        startDecorator={<Info />}
                    >
                        Требуется подтверждение
                    </Typography>
                    <Divider />
                    <Typography id="alert-dialog-modal-description" textColor="text.tertiary">
                        Вы действительно хотите удалить заказ #{order_id}?
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end', pt: 2 }}>
                        <Button variant="plain" color="neutral" onClick={() => setOpen(false)}>
                            Отмена
                        </Button>
                        <Button variant="solid" color="danger" onClick={delete_order}>
                            Да, удалить
                        </Button>
                    </Box>
                </ModalDialog>
            </Modal>
        </React.Fragment>
    );
}
