import React from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import FormSelect from '../FormInputs/FormSelect';
import { useListTags } from '../../api/tags/tagsSlice';
import { useState, useEffect } from 'react';
import { useAddUrlTag } from '../../api/urls/urlsSlice';

export default function AddTagForm({ urlId }) {
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm({
		defaultValues: {
			tag_id: null
		}
	});

	const { data: tags, isSuccess } = useListTags();

	const [tagOptions, setTagOptions] = useState([]);

    const [addUrlTag, result] = useAddUrlTag();

	useEffect(() => {
		if (isSuccess) setTagOptions([[-1, 'Select'], ...tags.map((tag) => [tag.id, tag.name])]);
	}, [tags, isSuccess]);

	function onSubmit(data) {
		if (data.tag_id == null || data.tag_id == -1) return;
		addUrlTag({url: urlId, tag: data.tag_id});
	}

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<Row>
				<Col>
					<FormSelect
						register={register}
						name='tag_id'
						error={errors.tag_id}
						options={tagOptions}
					></FormSelect>
				</Col>
				<Col>
					<Button type='submit'>+</Button>
				</Col>
			</Row>
		</Form>
	);
}
