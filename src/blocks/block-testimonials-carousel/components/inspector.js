const { __ } = wp.i18n;
import { Fragment, useState, useRef } from "@wordpress/element";
import {
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
} from "@wordpress/block-editor";
import {
	PanelBody,
	Button,
	TextControl,
	IconButton,
	BaseControl,
	TextareaControl,
} from "@wordpress/components";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
	SortableContext,
	verticalListSortingStrategy,
	arrayMove,
	useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import CarouselSettings from "./carousel";
import ColorSettings from "./color";

const MediaUploadField = ({
	label,
	value,
	onSelect,
	onRemove,
	allowedTypes = ["image"],
	className = "",
}) => (
	<BaseControl label={label} className={`media-upload-field ${className}`}>
		<MediaUploadCheck>
			<MediaUpload
				onSelect={onSelect}
				allowedTypes={allowedTypes}
				value={value}
				render={({ open }) => (
					<div className="media-upload-container">
						{value ? (
							<div className="media-preview-wrapper">
								<div className="media-preview">
									<img
										src={value}
										alt={label}
										className="media-preview-image"
									/>
									<div className="media-preview-actions">
										<Button
											isSecondary
											onClick={open}
											className="media-replace-btn"
										>
											{__("Replace")}
										</Button>
										<Button
											isDestructive
											onClick={onRemove}
											className="media-remove-btn"
										>
											{__("Remove")}
										</Button>
									</div>
								</div>
							</div>
						) : (
							<div className="media-upload-placeholder" onClick={open}>
								<div className="media-upload-placeholder-content">
									<IconButton
										icon="format-image"
										className="media-upload-icon"
									/>
									<span className="media-upload-text">
										{__("Add " + label)}
									</span>
								</div>
							</div>
						)}
					</div>
				)}
			/>
		</MediaUploadCheck>
	</BaseControl>
);

const TestimonialForm = ({
	quoteData,
	setQuoteData,
	onSave,
	onCancel,
	buttonText = "Save",
}) => {
	const handleLogoSelect = (media) => {
		setQuoteData({ ...quoteData, logo: media.url });
	};

	const handleLogoRemove = () => {
		setQuoteData({ ...quoteData, logo: "" });
	};

	const handleAvatarSelect = (media) => {
		setQuoteData({ ...quoteData, avatar: media.url });
	};

	const handleAvatarRemove = () => {
		setQuoteData({ ...quoteData, avatar: "" });
	};

	return (
		<Fragment>
			<TextControl
				label="Name"
				value={quoteData.name}
				onChange={(value) => setQuoteData({ ...quoteData, name: value })}
				className="testimonial-field"
			/>

			<TextControl
				label="Position"
				value={quoteData.position}
				onChange={(value) =>
					setQuoteData({ ...quoteData, position: value })
				}
				className="testimonial-field"
			/>

			<TextareaControl
				label="Quote"
				value={quoteData.quote}
				onChange={(value) => setQuoteData({ ...quoteData, quote: value })}
				className="testimonial-field"
				multiline
			/>

			<div className="media-upload-fields">
				<MediaUploadField
					label="Logo"
					value={quoteData.logo}
					onSelect={handleLogoSelect}
					onRemove={handleLogoRemove}
					className="logo-upload-field"
				/>

				<MediaUploadField
					label="Avatar"
					value={quoteData.avatar}
					onSelect={handleAvatarSelect}
					onRemove={handleAvatarRemove}
					className="avatar-upload-field"
				/>
			</div>

			<div className="form-actions">
				<Button isPrimary onClick={onSave} className="save-btn">
					{buttonText}
				</Button>
				{onCancel && (
					<Button isSecondary onClick={onCancel} className="cancel-btn">
						{__("Cancel")}
					</Button>
				)}
			</div>
		</Fragment>
	);
};

const SortableTestimonialItem = ({ quote, id, onEdit, onRemove }) => {
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({ id });

	const style = {
		border: "1px solid #ccc",
		padding: "15px",
		marginBottom: "12px",
		background: "#fff",
		borderRadius: "4px",
		transform: CSS.Transform.toString(transform),
		transition,
		display: "flex",
		justifyContent: "space-between",
		alignItems: "flex-start",
		cursor: "default",
	};

	return (
		<div ref={setNodeRef} style={style} {...attributes}>
			<div
				className="testimonial-content"
				style={{ flex: 1, marginRight: "15px" }}
			>
				<div className="testimonial-header">
					<div className="testimonial-info">
						<h4 className="testimonial-name">{quote.name}</h4>
					</div>
				</div>

				<div className="testimonial-actions">
					<Button isSecondary onClick={onEdit} className="edit-btn">
						{__("Edit")}
					</Button>
					<Button isDestructive onClick={onRemove} className="remove-btn">
						{__("Remove")}
					</Button>
				</div>
			</div>

			<div
				{...listeners}
				className="drag-handle"
				title={__("Drag to reorder")}
			>
				☰
			</div>
		</div>
	);
};

const Inspector = ({ attributes, setAttributes }) => {
	const { testimonials = [] } = attributes;

	const [newTestimonial, setNewTestimonial] = useState({
		quote: "",
		name: "",
		position: "",
		logo: "",
		avatar: "",
	});
	const [editIndex, setEditIndex] = useState(null);
	const [editTestimonial, setEditTestimonial] = useState({
		quote: "",
		name: "",
		position: "",
		logo: "",
		avatar: "",
	});

	const editPanelRef = useRef(null);

	const handleAddTestimonial = () => {
		if (!newTestimonial.quote || !newTestimonial.name) {
			alert(__("Please fill in at least Name and Quote fields."));
			return;
		}
		setAttributes({ testimonials: [...testimonials, newTestimonial] });
		setNewTestimonial({
			quote: "",
			name: "",
			position: "",
			logo: "",
			avatar: "",
		});
	};

	const handleSaveEditTestimonial = () => {
		if (editIndex === null) return;
		const updated = [...testimonials];
		updated[editIndex] = editTestimonial;
		setAttributes({ testimonials: updated });
		setEditIndex(null);
		setEditTestimonial({
			quote: "",
			name: "",
			position: "",
			logo: "",
			avatar: "",
		});
	};

	const handleRemoveTestimonial = (index) => {
		if (confirm(__("Are you sure you want to remove this testimonial?"))) {
			const updated = testimonials.filter((_, i) => i !== index);
			setAttributes({ testimonials: updated });
		}
	};

	const handleDragEnd = (event) => {
		const { active, over } = event;
		if (!over || active.id === over.id) return;

		const oldIndex = testimonials.findIndex(
			(_, index) => index.toString() === active.id
		);
		const newIndex = testimonials.findIndex(
			(_, index) => index.toString() === over.id
		);

		if (oldIndex === -1 || newIndex === -1) return;

		const reordered = arrayMove(testimonials, oldIndex, newIndex);
		setAttributes({ testimonials: reordered });
	};

	return (
		<InspectorControls>
			<PanelBody title={__("Manage Testimonials")} initialOpen={true}>
				<div className="testimonials-manager">
					<p className="drag-instruction">
						{__("Drag using ☰ handle to reorder testimonials")}
					</p>

					{testimonials.length > 0 ? (
						<Fragment>
							<DndContext
								collisionDetection={closestCenter}
								onDragEnd={handleDragEnd}
							>
								<SortableContext
									items={testimonials.map((_, i) => i.toString())}
									strategy={verticalListSortingStrategy}
								>
									{testimonials.map((quote, index) => (
										<SortableTestimonialItem
											key={index}
											id={index.toString()}
											quote={quote}
											onEdit={() => {
												setEditIndex(index);
												setEditTestimonial(quote);
												setTimeout(() => {
													if (editPanelRef.current) {
														editPanelRef.current.scrollIntoView({
															behavior: "smooth",
															block: "start",
														});
													}
												}, 150);
											}}
											onRemove={() => handleRemoveTestimonial(index)}
										/>
									))}
								</SortableContext>
							</DndContext>
						</Fragment>
					) : (
						<div className="no-testimonials">
							<p>{__("No testimonials added yet.")}</p>
						</div>
					)}
				</div>
			</PanelBody>

			{editIndex !== null && (
				<PanelBody
					title={__("Edit Testimonial")}
					initialOpen={true}
					ref={editPanelRef}
				>
					<TestimonialForm
						quoteData={editTestimonial}
						setQuoteData={setEditTestimonial}
						onSave={handleSaveEditTestimonial}
						onCancel={() => {
							setEditIndex(null);
							setEditTestimonial({
								quote: "",
								name: "",
								position: "",
								logo: "",
								avatar: "",
							});
						}}
						buttonText={__("Update Testimonial")}
					/>
				</PanelBody>
			)}

			<PanelBody title={__("Add New Testimonial")} initialOpen={true}>
				<TestimonialForm
					quoteData={newTestimonial}
					setQuoteData={setNewTestimonial}
					onSave={handleAddTestimonial}
					buttonText={__("Add Testimonial")}
				/>
			</PanelBody>

			<CarouselSettings
				attributes={attributes}
				setAttributes={setAttributes}
			/>
			<ColorSettings attributes={attributes} setAttributes={setAttributes} />
		</InspectorControls>
	);
};

export default Inspector;
