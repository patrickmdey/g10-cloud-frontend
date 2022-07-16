import { FormGroup, FormLabel, InputGroup, FormControl, Button } from 'react-bootstrap';
import useErrorMessage from '../../hooks/useErrorMessage';

export default function FormInput(props) {
	const {
		register,
		label,
		name,
		value,
		error,
		errorMessage,
		type,
		as,
		show,
		disabled,
		placeholder,
		prependIcon,
		appendIcon,
		appendIconOnClick,
		validation
	} = props;

	const errorDesc = useErrorMessage(errorMessage, error, validation);
	return (
		<FormGroup>
			<FormLabel>{label}</FormLabel>
			<InputGroup>
				{prependIcon != null && <InputGroup.Text>{prependIcon}</InputGroup.Text>}
				<FormControl
					as={as === undefined ? 'input' : as}
					type={type === 'password' && show ? 'text' : type}
					{...(type === 'number'
						? { step: '0.01' }
						: type === 'date'
						? { min: new Date().toISOString().split('T')[0] }
						: {})}
					defaultValue={value}
					placeholder={placeholder}
					{...register(name, validation)}
					isInvalid={error != null}
					disabled={disabled}
				/>
				{appendIcon != null && (
					<InputGroup.Text style={{ position: 'relative', width: '35px' }}>
						{appendIconOnClick ? (
							<Button
								variant='link'
								className='text-decoration-none m-0 p-0'
								style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}
								onClick={(_) => appendIconOnClick()}
							>
								{appendIcon}
							</Button>
						) : (
							{ appendIcon }
						)}
					</InputGroup.Text>
				)}
				{errorDesc && <FormControl.Feedback type='invalid'>{errorDesc}</FormControl.Feedback>}
			</InputGroup>
		</FormGroup>
	);
}
