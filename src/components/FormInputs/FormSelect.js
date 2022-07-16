import { FormGroup, FormLabel, InputGroup, FormControl, Form } from 'react-bootstrap';
import { UseFormRegister, Path, FieldError } from 'react-hook-form';

export default function FormSelect(props) {
	const {
		register,
		label,
		name,
		options,
		value,
		disabled,
		prependIcon,
		appendIcon,
		validation,
		error,
		errorMessage
	} = props;
	return (
		<FormGroup>
			{label && <FormLabel>{label}</FormLabel>}
			<InputGroup>
				{prependIcon != null && <InputGroup.Text>{prependIcon}</InputGroup.Text>}
				<Form.Select
					{...register(name, validation)}
					isInvalid={error != null}
					defaultValue={value}
					disabled={disabled}
				>
					{options.map(([value, message]) => (
						<option key={value} value={value}>
							{message}
						</option>
					))}
				</Form.Select>
				{appendIcon != null && <InputGroup.Text>{appendIcon}</InputGroup.Text>}
				{errorMessage && error && (
					<FormControl.Feedback type='invalid'>{errorMessage[error.type]}</FormControl.Feedback>
				)}
			</InputGroup>
		</FormGroup>
	);
}
