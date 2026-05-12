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
	CheckboxControl,
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
	id: 0,
	url: "",
	alt: "",
	brand: "",
	name: "",
	link: "",
	linkTarget: "_self",
};

const MediaUploadField = ({ value, onSelect, onRemove }) => (
	<BaseControl label={__("Image", "flip-blocks")} className="media-upload-field">
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

const ProductForm = ({
	itemData,
	setItemData,
	onSave,
	onCancel,
	buttonText = "Save",
}) => (
	<Fragment>
		<MediaUploadField
			value={itemData.url}
			onSelect={(media) =>
				setItemData({
					...itemData,
					id: media.id,
					url: media.url,
					alt: media.alt || "",
				})
			}
			onRemove={() => setItemData({ ...itemData, id: 0, url: "", alt: "" })}
		/>
		<TextControl
			label={__("Thương hiệu (Brand)", "flip-blocks")}
			value={itemData.brand}
			onChange={(value) => setItemData({ ...itemData, brand: value })}
			placeholder="LIVONE, RECV..."
		/>
		<TextControl
			label={__("Tên sản phẩm", "flip-blocks")}
			value={itemData.name}
			onChange={(value) => setItemData({ ...itemData, name: value })}
			placeholder={__("Tên đầy đủ của sản phẩm", "flip-blocks")}
		/>
		<TextControl
			label={__("Link URL", "flip-blocks")}
			value={itemData.link}
			onChange={(value) => setItemData({ ...itemData, link: value })}
			placeholder="https://"
		/>
		<CheckboxControl
			label={__("Open in new tab", "flip-blocks")}
			checked={itemData.linkTarget === "_blank"}
			onChange={(checked) =>
				setItemData({ ...itemData, linkTarget: checked ? "_blank" : "_self" })
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

const SortableProductItem = ({ item, id, onEdit, onRemove }) => {
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
					gap: "10px",
					flex: 1,
					minWidth: 0,
				}}
			>
				{item.url && (
					<img
						src={item.url}
						alt={item.alt}
						style={{
							width: "44px",
							height: "44px",
							objectFit: "cover",
							borderRadius: "2px",
							flexShrink: 0,
						}}
					/>
				)}
				<div
					style={{
						fontSize: "12px",
						color: "#555",
						flex: 1,
						minWidth: 0,
					}}
				>
					{item.name && (
						<strong
							style={{
								display: "block",
								overflow: "hidden",
								textOverflow: "ellipsis",
								whiteSpace: "nowrap",
								marginBottom: "2px",
								color: "#333",
							}}
						>
							{item.name}
						</strong>
					)}
					{item.link ? (
						<span
							style={{
								display: "block",
								overflow: "hidden",
								textOverflow: "ellipsis",
								whiteSpace: "nowrap",
							}}
						>
							{item.link}
						</span>
					) : (
						<em style={{ color: "#999" }}>{__("No link", "flip-blocks")}</em>
					)}
				</div>
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
		slidesPerView,
		spaceBetween,
		speed,
		loop,
		autoplay,
		autoplayDelay,
	} = attributes;

	const [newItem, setNewItem] = useState({ ...DEFAULT_ITEM });
	const [editIndex, setEditIndex] = useState(null);
	const [editItem, setEditItem] = useState({ ...DEFAULT_ITEM });
	const editPanelRef = useRef(null);

	const handleAdd = () => {
		if (!newItem.url) {
			alert(__("Please select an image.", "flip-blocks"));
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
		if (confirm(__("Remove this product?", "flip-blocks"))) {
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
			<PanelBody title={__("Products", "flip-blocks")} initialOpen={true}>
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
									<SortableProductItem
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
						{__("No products added yet.", "flip-blocks")}
					</p>
				)}
			</PanelBody>

			{editIndex !== null && (
				<PanelBody
					title={__("Edit Product", "flip-blocks")}
					initialOpen={true}
					ref={editPanelRef}
				>
					<ProductForm
						itemData={editItem}
						setItemData={setEditItem}
						onSave={handleSaveEdit}
						onCancel={() => {
							setEditIndex(null);
							setEditItem({ ...DEFAULT_ITEM });
						}}
						buttonText="Update Product"
					/>
				</PanelBody>
			)}

			<PanelBody
				title={__("Add Product", "flip-blocks")}
				initialOpen={false}
			>
				<ProductForm
					itemData={newItem}
					setItemData={setNewItem}
					onSave={handleAdd}
					buttonText="Add Product"
				/>
			</PanelBody>

			<PanelBody
				title={__("Carousel Settings", "flip-blocks")}
				initialOpen={false}
			>
				<RangeControl
					label={__("Slides Per View", "flip-blocks")}
					value={slidesPerView}
					onChange={(value) => setAttributes({ slidesPerView: value })}
					min={1}
					max={6}
				/>
				<RangeControl
					label={__("Space Between (px)", "flip-blocks")}
					value={spaceBetween}
					onChange={(value) => setAttributes({ spaceBetween: value })}
					min={0}
					max={100}
				/>
				<RangeControl
					label={__("Transition Speed (ms)", "flip-blocks")}
					value={speed}
					onChange={(value) => setAttributes({ speed: value })}
					min={100}
					max={2000}
				/>
				<ToggleControl
					label={__("Loop", "flip-blocks")}
					checked={loop}
					onChange={(value) => setAttributes({ loop: value })}
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
						min={500}
						max={10000}
					/>
				)}
			</PanelBody>
		</InspectorControls>
	);
};

export default Inspector;
