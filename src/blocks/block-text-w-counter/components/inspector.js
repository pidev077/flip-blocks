const { __ } = wp.i18n;
import { Fragment, useState, useRef } from "@wordpress/element";
import {
	InspectorControls,
	__experimentalPanelColorGradientSettings as PanelColorGradientSettings,
} from "@wordpress/block-editor";
import { PanelBody, Button, TextControl } from "@wordpress/components";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
	SortableContext,
	verticalListSortingStrategy,
	arrayMove,
	useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const CountersForm = ({
	headingData,
	setheadingData,
	onSave,
	onCancel,
	buttonText = "Save",
}) => (
	<Fragment>
		<TextControl
			label="Heading"
			value={headingData.heading}
			onChange={(value) =>
				setheadingData({ ...headingData, heading: value })
			}
		/>
		<TextControl
			label="Number"
			value={headingData.number}
			onChange={(value) => setheadingData({ ...headingData, number: value })}
		/>
		<Button
			isPrimary
			onClick={onSave}
			style={{ marginTop: "10px", marginRight: "10px" }}
		>
			{buttonText}
		</Button>
		{onCancel && (
			<Button isSecondary onClick={onCancel}>
				Cancel
			</Button>
		)}
	</Fragment>
);

const SortableCountersItem = ({ heading, id, onEdit, onRemove }) => {
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({ id });

	const style = {
		border: "1px solid #ccc",
		padding: "10px",
		marginBottom: "10px",
		background: "#fff",
		transform: CSS.Transform.toString(transform),
		transition,
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
	};

	return (
		<div ref={setNodeRef} style={style} {...attributes}>
			<div style={{ flex: 1 }}>
				<p>
					<strong>{heading.number}</strong>
				</p>
				<p style={{ marginBottom: "5px" }}>{heading.heading}</p>
				<Button isSecondary onClick={onEdit} style={{ marginRight: "8px" }}>
					Edit
				</Button>
				<Button isDestructive onClick={onRemove}>
					Remove
				</Button>
			</div>

			<div
				{...listeners}
				style={{
					cursor: "grab",
					padding: "6px 8px",
					border: "1px solid #ddd",
					borderRadius: "4px",
					background: "#f0f0f0",
					marginLeft: "8px",
					userSelect: "none",
					fontSize: "16px",
					lineHeight: "16px",
				}}
				title="Drag to reorder"
			>
				☰
			</div>
		</div>
	);
};

const Inspector = ({ attributes, setAttributes }) => {
	const { counters = [], bgColor, countersColor } = attributes;

	const [newTestimonial, setNewTestimonial] = useState({
		heading: "",
		number: "",
	});
	const [editIndex, setEditIndex] = useState(null);
	const [editTestimonial, setEditCounters] = useState({
		heading: "",
		number: "",
	});
	const editPanelRef = useRef(null);

	const handleAddCounters = () => {
		if (!newTestimonial.heading || !newTestimonial.number) return;
		setAttributes({ counters: [...counters, newTestimonial] });
		setNewTestimonial({ heading: "", number: "" });
	};
	const handleSaveEditCounters = () => {
		if (editIndex === null) return;
		const updated = [...counters];
		updated[editIndex] = editTestimonial;
		setAttributes({ counters: updated });
		setEditIndex(null);
		setEditCounters({ heading: "", number: "" });
	};

	const handleRemoveTestimonial = (index) => {
		const updated = counters.filter((_, i) => i !== index);
		setAttributes({ counters: updated });
	};

	const handleDragEnd = (event) => {
		const { active, over } = event;
		if (!over || active.id === over.id) return;

		const oldIndex = counters.findIndex(
			(_, index) => index.toString() === active.id
		);
		const newIndex = counters.findIndex(
			(_, index) => index.toString() === over.id
		);

		if (oldIndex === -1 || newIndex === -1) return;

		const reordered = arrayMove(counters, oldIndex, newIndex);
		setAttributes({ counters: reordered });
	};

	return (
		<InspectorControls>
			<PanelBody
				title="Manage counters (Drag using ☰ handle)"
				initialOpen={true}
			>
				{counters.length > 0 ? (
					<Fragment>
						<DndContext
							collisionDetection={closestCenter}
							onDragEnd={handleDragEnd}
						>
							<SortableContext
								items={counters.map((_, i) => i.toString())}
								strategy={verticalListSortingStrategy}
							>
								{counters.map((heading, index) => (
									<SortableCountersItem
										key={index}
										id={index.toString()}
										heading={heading}
										onEdit={() => {
											setEditIndex(index);
											setEditCounters(heading);
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
					<p>No counters added yet.</p>
				)}
			</PanelBody>

			{editIndex !== null && (
				<PanelBody
					title="Edit Counter"
					initialOpen={true}
					ref={editPanelRef}
				>
					<CountersForm
						headingData={editTestimonial}
						setheadingData={setEditCounters}
						onSave={handleSaveEditCounters}
						onCancel={() => {
							setEditIndex(null);
							setEditCounters({ heading: "", number: "" });
						}}
					/>
				</PanelBody>
			)}

			<PanelBody title="Add Counter" initialOpen={true}>
				<CountersForm
					headingData={newTestimonial}
					setheadingData={setNewTestimonial}
					onSave={handleAddCounters}
					buttonText="Add Counter"
				/>
			</PanelBody>

			<PanelBody title="Color Settings">
				<PanelColorGradientSettings
					settings={[
						{
							colorValue: bgColor,
							label: __("Background Color"),
							onColorChange: (newValue) =>
								setAttributes({ bgColor: newValue }),
						},
						{
							colorValue: countersColor,
							label: __("Counters Color"),
							onColorChange: (newValue) =>
								setAttributes({ countersColor: newValue }),
						},
					]}
				/>
			</PanelBody>
		</InspectorControls>
	);
};

export default Inspector;
