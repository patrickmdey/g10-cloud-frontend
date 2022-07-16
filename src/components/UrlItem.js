import { BsPencilFill, BsTrash } from 'react-icons/bs';
import { Col, Row, Card, Badge, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { useDeleteUrl, useListUrlTags, useDeleteUrlTag } from '../api/urls/urlsSlice';
import { useEffect } from 'react';
import AddTagForm from './forms/AddTagForm';

export default function UrlItem({ title, redirect_to, created_at, alias, clicks, id, onDelete }) {
	const navigate = useNavigate();

	const goToEditUrl = () => {
		navigate(`/editUrl/${id}`);
	};

	const [deleteUrl, result] = useDeleteUrl();
	useEffect(() => {
		if (result.isSuccess) onDelete();
	}, [result]);

	const { data: tags, isSuccess } = useListUrlTags(id);

	const [deleteTag, deleteTagResult] = useDeleteUrlTag();

	return (
		<Card className='bg-white p-3 rounded'>
			<Card.Body>
				<Card.Title>
					<Row className='align-items-center'>
						<Col xs={10}>
							<h2 className='m-0'>{title}</h2>
						</Col>
						<Col>
							<span>
								<BsPencilFill className='fa-lg color-action' onClick={() => goToEditUrl()} />
							</span>
						</Col>
						<Col>
							<span>
								<BsTrash className='fa-lg color-danger' onClick={() => deleteUrl(id)} />
							</span>
						</Col>
					</Row>
				</Card.Title>
				<hr></hr>

				<p className='lead'>
					<a href={redirect_to}>{redirect_to}</a>
				</p>
				<p className='lead'>
					<b>Created at:</b> {new Date(created_at).toLocaleDateString()}
				</p>
				<p className='lead'>
					<b>Alias:</b> <a href={alias}>{alias}</a>
				</p>
				<p className='lead'>
					<b>Clicks:</b> <b className='h2 fw-bold color-rentapp-red'>{clicks}</b>
				</p>
				<div>
					<p className='lead mb-3'>
						<b className='me-3'>Tags:</b>

						{isSuccess &&
							tags &&
							tags.map((tag) => (
								<Badge key={tag.id}>
									{tag.name.toUpperCase()}
									<BsTrash
										className='fa-lg color-danger ms-1'
										onClick={() => deleteTag({ url: id, tag: tag.id })}
									/>
								</Badge>
							))}
					</p>
					<AddTagForm urlId={id} />
				</div>
			</Card.Body>
		</Card>
	);
}
