import { FormGroup, InputGroup, Form } from 'react-bootstrap';

export default function FormCheckbox(props) {
	const { register, label, name, value, validation, checked } = props;
	return (
		<FormGroup>
			<InputGroup>
				<Form.Check label={label} {...register(name, validation)} value={value} defaultChecked={checked} />
			</InputGroup>
		</FormGroup>
	);
}
