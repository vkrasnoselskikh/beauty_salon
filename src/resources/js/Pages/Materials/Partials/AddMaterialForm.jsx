import {useForm} from '@inertiajs/react';
import {Button, Box, FormControl, FormLabel, FormHelperText, Input, Select, Option} from '@mui/joy';

export const unit_of_measures = ['шт', 'гр', 'мл', 'уп']

export function AddMaterialForm() {

    const {data, setData, post, processing, errors, reset} = useForm({
        name: "",
        quantity: "",
        unit_of_measure: unit_of_measures[0]
    });

    const handleOnChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('materials.create'));
    };

    return <>
        <form onSubmit={submit}>
            <Box mt={2}>
                <FormControl error={!!errors.name}>
                    <FormLabel>Материал</FormLabel>
                    <Input
                        id="name"
                        name="name"
                        value={data.name}
                        onChange={handleOnChange}
                    />
                    <FormHelperText>{errors.name}</FormHelperText>
                </FormControl>
            </Box>

            <Box mt={2} display={'flex'} gap={2}>
                <Box flex={1}>
                    <FormControl error={!!errors.quantity}>
                        <FormLabel>Количество</FormLabel>
                        <Input
                            id="quantity"
                            type={'number'}
                            name="quantity"
                            value={data.last_name}
                            onChange={handleOnChange}

                        />
                        <FormHelperText>{errors.quantity}</FormHelperText>
                    </FormControl>
                </Box>

                <Box>
                    <FormControl error={!!errors.unit_of_measure}>
                        <FormLabel>Еденица измерения</FormLabel>
                        <Select
                            id="unit_of_measure"
                            name="unit_of_measure"
                            value={data.unit_of_measure}
                            onChange={(e, value)=>{setData('unit_of_measure', value)}}
                        >
                            {unit_of_measures.map((e, idx) => <Option value={e} key={idx}>{e}</Option>)}
                        </Select>
                        <FormHelperText>{errors.unit_of_measure}</FormHelperText>
                    </FormControl>
                </Box>
            </Box>


            <Box mt={2} display={'flex'} justifyContent={'end'}>
                <Button type='submit' disabled={processing}>
                    Coхранить
                </Button>
            </Box>
        </form>
    </>
}
