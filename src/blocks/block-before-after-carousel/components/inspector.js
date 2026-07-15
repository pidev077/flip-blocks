import { __ } from "@wordpress/i18n";
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
	ToggleControl,
	RangeControl,
	BaseControl,
} from "@wordpress/components";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
	SortableContext,
	verticalListSortingStrategy,
	arrayMove,
	useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const DEFAULT_ITEM = {
	beforeId: 0,
	beforeUrl: "",
	beforeAlt: "",
	afterId: 0,
	afterUrl: "",
	afterAlt: "",
};

const MediaUploadField = ({ label, value, onSelect, onRemove }) => (
	<BaseControl label={label} className="media-upload-field">
		<MediaUploadCheck>
			<MediaUpload
				onSelect={onSelect}
				allowedTypes={["image"]}
				value={value}
				render={({ open }) => (
					<div className="media-upload-container">
						{value ? (
							<div className="media-preview-wrapper">
								<div className="media-preview">
									<img
										src={value}
										alt="preview"
										className="media-preview-image"
									/>
									<div className="media-preview-actions">
										<Button isSecondary onClick={open}>
											{__("Replace")}
										</Button>
										<Button isDestructive onClick={onRemove}>
											{__("Remove")}
										</Button>
									</div>
								</div>
							</div>
						) : (
							<div className="media-upload-placeholder" onClick={open}>
								<div className="media-upload-placeholder-content">
									<span className="dashicons dashicons-format-image" />
									<span className="media-upload-text">
										{__("Add Image", "flip-blocks")}
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

const PairForm = ({ itemData, setItemData, onSave, onCancel, buttonText = "Save" }) => (
	<Fragment>
		<MediaUploadField
			label={__("Ảnh Trước", "flip-blocks")}
			value={itemData.beforeUrl}
			onSelect={(media) =>
				setItemData({
					...itemData,
					beforeId: media.id,
					beforeUrl: media.url,
					beforeAlt: media.alt || "",
				})
			}
			onRemove={() =>
				setItemData({ ...itemData, beforeId: 0, beforeUrl: "", beforeAlt: "" })
			}
		/>
		<MediaUploadField
			label={__("Ảnh Sau", "flip-blocks")}
			value={itemData.afterUrl}
			onSelect={(media) =>
				setItemData({
					...itemData,
					afterId: media.id,
					afterUrl: media.url,
					afterAlt: media.alt || "",
				})
			}
			onRemove={() =>
				setItemData({ ...itemData, afterId: 0, afterUrl: "", afterAlt: "" })
			}
		/>
		<div
			className="form-actions"
			style={{ display: "flex", gap: "8px", marginTop: "12px" }}
		>
			<Button isPrimary onClick={onSave}>
				{__(buttonText, "flip-blocks")}
			</Button>
			{onCancel && (
				<Button isSecondary onClick={onCancel}>
					{__("Cancel", "flip-blocks")}
				</Button>
			)}
		</div>
	</Fragment>
);

const SortablePairItem = ({ item, id, onEdit, onRemove }) => {
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({ id });

	const style = {
		border: "1px solid #ccc",
		padding: "10px",
		marginBottom: "10px",
		background: "#fff",
		borderRadius: "4px",
		transform: CSS.Transform.toString(transform),
		transition,
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
	};

	return (
		<div ref={setNodeRef} style={style} {...attributes}>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					gap: "8px",
					flex: 1,
					minWidth: 0,
				}}
			>
				{item.beforeUrl && (
					<img
						src={item.beforeUrl}
						alt={item.beforeAlt}
						style={{
							width: "36px",
							height: "36px",
							objectFit: "cover",
							borderRadius: "2px",
							flexShrink: 0,
						}}
					/>
				)}
				{item.afterUrl && (
					<img
						src={item.afterUrl}
						alt={item.afterAlt}
						style={{
							width: "36px",
							height: "36px",
							objectFit: "cover",
							borderRadius: "2px",
							flexShrink: 0,
						}}
					/>
				)}
				<span style={{ fontSize: "12px", color: "#555" }}>
					{__("Pair", "flip-blocks")} #{id + 1}
				</span>
			</div>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					gap: "6px",
					flexShrink: 0,
					marginLeft: "8px",
				}}
			>
				<Button isSecondary isSmall onClick={onEdit}>
					{__("Edit")}
				</Button>
				<Button isDestructive isSmall onClick={onRemove}>
					{__("Remove")}
				</Button>
				<div
					{...listeners}
					title={__("Drag to reorder")}
					style={{ cursor: "grab", padding: "4px 6px", color: "#888" }}
				>
					☰
				</div>
			</div>
		</div>
	);
};

const Inspector = ({ attributes, setAttributes }) => {
	const {
		items = [],
		beforeLabel,
		afterLabel,
		spaceBetween,
		rowGap,
		speed,
		autoplay,
		autoplayDelay,
	} = attributes;

	const [newItem, setNewItem] = useState({ ...DEFAULT_ITEM });
	const [editIndex, setEditIndex] = useState(null);
	const [editItem, setEditItem] = useState({ ...DEFAULT_ITEM });
	const editPanelRef = useRef(null);

	const handleAdd = () => {
		if (!newItem.beforeUrl || !newItem.afterUrl) {
			alert(__("Please select both a before and an after image.", "flip-blocks"));
			return;
		}
		setAttributes({ items: [...items, newItem] });
		setNewItem({ ...DEFAULT_ITEM });
	};

	const handleSaveEdit = () => {
		if (editIndex === null) return;
		const updated = [...items];
		updated[editIndex] = editItem;
		setAttributes({ items: updated });
		setEditIndex(null);
		setEditItem({ ...DEFAULT_ITEM });
	};

	const handleRemove = (index) => {
		if (confirm(__("Remove this pair?", "flip-blocks"))) {
			setAttributes({ items: items.filter((_, i) => i !== index) });
		}
	};

	const handleDragEnd = ({ active, over }) => {
		if (!over || active.id === over.id) return;
		const oldIndex = items.findIndex((_, i) => i.toString() === active.id);
		const newIndex = items.findIndex((_, i) => i.toString() === over.id);
		if (oldIndex === -1 || newIndex === -1) return;
		setAttributes({ items: arrayMove(items, oldIndex, newIndex) });
	};

	return (
		<InspectorControls>
			<PanelBody title={__("Before / After Pairs", "flip-blocks")} initialOpen={true}>
				{items.length > 0 ? (
					<Fragment>
						<p style={{ fontSize: "12px", color: "#666", marginBottom: "8px" }}>
							{__("Drag ☰ handle to reorder.", "flip-blocks")}
						</p>
						<DndContext
							collisionDetection={closestCenter}
							onDragEnd={handleDragEnd}
						>
							<SortableContext
								items={items.map((_, i) => i.toString())}
								strategy={verticalListSortingStrategy}
							>
								{items.map((item, index) => (
									<SortablePairItem
										key={index}
										id={index.toString()}
										item={item}
										onEdit={() => {
											setEditIndex(index);
											setEditItem({ ...item });
											setTimeout(() => {
												if (editPanelRef.current) {
													editPanelRef.current.scrollIntoView({
														behavior: "smooth",
														block: "start",
													});
												}
											}, 150);
										}}
										onRemove={() => handleRemove(index)}
									/>
								))}
							</SortableContext>
						</DndContext>
					</Fragment>
				) : (
					<p style={{ fontSize: "12px", color: "#999" }}>
						{__("No pairs added yet.", "flip-blocks")}
					</p>
				)}
			</PanelBody>

			{editIndex !== null && (
				<PanelBody
					title={__("Edit Pair", "flip-blocks")}
					initialOpen={true}
					ref={editPanelRef}
				>
					<PairForm
						itemData={editItem}
						setItemData={setEditItem}
						onSave={handleSaveEdit}
						onCancel={() => {
							setEditIndex(null);
							setEditItem({ ...DEFAULT_ITEM });
						}}
						buttonText="Update Pair"
					/>
				</PanelBody>
			)}

			<PanelBody title={__("Add Pair", "flip-blocks")} initialOpen={false}>
				<PairForm
					itemData={newItem}
					setItemData={setNewItem}
					onSave={handleAdd}
					buttonText="Add Pair"
				/>
			</PanelBody>

			<PanelBody title={__("Labels", "flip-blocks")} initialOpen={false}>
				<TextControl
					label={__("Nhãn Trước", "flip-blocks")}
					value={beforeLabel}
					onChange={(value) => setAttributes({ beforeLabel: value })}
				/>
				<TextControl
					label={__("Nhãn Sau", "flip-blocks")}
					value={afterLabel}
					onChange={(value) => setAttributes({ afterLabel: value })}
				/>
			</PanelBody>

			<PanelBody title={__("Carousel Settings", "flip-blocks")} initialOpen={false}>
				<RangeControl
					label={__("Space Between (px)", "flip-blocks")}
					value={spaceBetween}
					onChange={(value) => setAttributes({ spaceBetween: value })}
					min={0}
					max={80}
				/>
				<RangeControl
					label={__("Row Gap (px)", "flip-blocks")}
					value={rowGap}
					onChange={(value) => setAttributes({ rowGap: value })}
					min={0}
					max={60}
				/>
				<RangeControl
					label={__("Transition Speed (ms)", "flip-blocks")}
					value={speed}
					onChange={(value) => setAttributes({ speed: value })}
					min={100}
					max={2000}
				/>
				<ToggleControl
					label={__("Autoplay", "flip-blocks")}
					checked={autoplay}
					onChange={(value) => setAttributes({ autoplay: value })}
				/>
				{autoplay && (
					<RangeControl
						label={__("Autoplay Delay (ms)", "flip-blocks")}
						value={autoplayDelay}
						onChange={(value) => setAttributes({ autoplayDelay: value })}
						min={1000}
						max={10000}
					/>
				)}
			</PanelBody>
		</InspectorControls>
	);
};

export default Inspector;
