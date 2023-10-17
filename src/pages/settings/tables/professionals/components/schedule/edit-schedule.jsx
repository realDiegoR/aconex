import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import MuiDrawer from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import { Autocomplete, DatePicker, Form, TimePicker } from '@/components/form';
import { dayList } from '@/constants/day-list';
import { useProfessionalsContext } from '../../context/professionals.context';

const especialidades = ['Cirugia', 'Odontologia'];

const Drawer = styled(MuiDrawer)(() => ({
	'& .MuiDrawer-paper': {
		padding: '1.45rem',
		minWidth: '300px',
		maxWidth: '50vw',
	},
}));

/**
 * @param {object} props
 * @param {boolean} props.open
 * @param {() => void} props.onClose
 */
export const EditSchedule = ({ open, onClose }) => {
	const { scheduleInView, professionalInView } = useProfessionalsContext();

	return (
		<Drawer anchor="right" open={open} onClose={onClose} sx={{ zIndex: 1201 }}>
			<Typography variant="h4" component="h2">
				Horarios disponible
			</Typography>
			<Typography variant="h6" component="p" sx={{ mt: 1, mb: 3 }}>
				{professionalInView?.nombre} {professionalInView?.apellido} - {professionalInView?.cedula}
			</Typography>
			<Form
				onSubmit={console.info}
				defaultValues={{
					dia: scheduleInView,
					especialidad: scheduleInView?.especialidad,
					horaDesde: dayjs(scheduleInView?.horaDesde),
					horaHasta: dayjs(scheduleInView?.horaHasta),
					intervalo: dayjs(scheduleInView?.intervalo),
					fechaDesde: dayjs(scheduleInView?.fechaDesde),
					fechaHasta: dayjs(scheduleInView?.fechaHasta),
				}}
			>
				<Stack spacing={3}>
					<Autocomplete
						options={professionalInView?.horarios}
						name="dia"
						getOptionLabel={(option) => dayList[option.nroDia]}
						isOptionEqualToValue={(option, value) => option.nroDia === value.nroDia}
						inputProps={{ label: 'Seleccionar día', variant: 'standard' }}
					/>
					<Autocomplete
						options={especialidades}
						name="especialidad"
						inputProps={{ label: 'Seleccionar especialidad', variant: 'standard' }}
					/>
					<Divider />
					<Stack direction="row" spacing={1}>
						<TimePicker
							name="horaDesde"
							label="Hora Desde"
							slotProps={{ textField: { variant: 'standard' } }}
						/>
						<TimePicker
							name="horaHasta"
							label="Hora Hasta"
							slotProps={{ textField: { variant: 'standard' } }}
						/>
					</Stack>
					<TimePicker
						name="intervalo"
						label="Intervalo"
						slotProps={{ textField: { variant: 'standard' } }}
					/>
					<Stack direction="row" spacing={1}>
						<DatePicker
							name="fechaDesde"
							label="Fecha desde"
							slotProps={{ textField: { variant: 'standard' } }}
						/>
						<DatePicker
							name="fechaHasta"
							label="Fecha hasta"
							rules={{ required: false }}
							slotProps={{ textField: { variant: 'standard' } }}
						/>
					</Stack>
					<Button type="submit" variant="contained">
						Guardar
					</Button>
				</Stack>
			</Form>
		</Drawer>
	);
};
