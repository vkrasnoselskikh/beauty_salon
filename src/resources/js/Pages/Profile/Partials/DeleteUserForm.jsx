import { useRef, useState } from 'react';
import { useForm } from '@inertiajs/react';
import { Typography, Box, FormControl, FormLabel, Input, FormHelperText, Button, ModalDialog, Modal } from '@mui/joy'

export default function DeleteUserForm({ className }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        reset();
    };

    return (
        <Box mt={2}>
            <header>
                <Typography level="h4" fontWeight="700" sx={{ mb: 0.5 }}>
                    Удаление Аккаунта
                </Typography>

                <Typography level="body1" sx={{ mb: 1 }}>
                    После удаления вашей учетной записи все ее ресурсы и данные будут удалены навсегда. Прежде чем
                    удалить вашу учетную запись, загрузите все данные или информацию, которые вы хотите сохранить.
                </Typography>
            </header>

            <Button onClick={confirmUserDeletion} color="danger">Удалить Аккаунт</Button>

            <Modal open={confirmingUserDeletion} onClose={closeModal}>
                <ModalDialog>
                    <FormControl onSubmit={deleteUser}>

                        <Typography level="h4" fontWeight="700">
                            Вы уверены, что хотите удалить свой аккаунт?
                        </Typography>

                        <Typography level="body1">
                            После удаления вашей учетной записи все её ресурсы и данные будут удалены навсегда. Пожалуйста,
                            введите свой пароль, чтобы подтвердить, что вы хотите окончательно удалить свою учетную запись.
                        </Typography>

                        <Box>
                            <FormControl>
                                <FormLabel>Введите свой пароль</FormLabel>
                                <Input
                                    id="password"
                                    type="password"
                                    name="password"
                                    ref={passwordInput}
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="Пароль"
                                />
                                <FormHelperText>{errors.password}</FormHelperText>
                            </FormControl>
                        </Box>

                        <Box mt={0.4}>

                            <Button onClick={closeModal} variant="outlined">Отменить</Button>

                            <Button disabled={processing} color="danger">
                                Удалить Аккаунт
                            </Button>
                        </Box>
                    </FormControl>
                </ModalDialog>

            </Modal>
        </Box >
    );
}
