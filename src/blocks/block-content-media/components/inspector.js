import { useState } from "@wordpress/element";
import {
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
} from "@wordpress/block-editor";

import { PanelBody, Button } from "@wordpress/components";

export default function Inspector({ items, setAttributes }) {
	const [dragIndex, setDragIndex] = useState(null);

	const updateItem = (index, value) => {
		const newItems = [...items];
		newItems[index] = value;
		setAttributes({ items: newItems });
	};

	const addItem = () => {
		setAttributes({
			items: [
				...items,
				{
					id: Date.now(),
					mediaUrl: "",
				},
			],
		});
	};

	const removeItem = (index) => {
		const newItems = items.filter((_, i) => i !== index);
		setAttributes({ items: newItems });
	};

	const moveItem = (from, to) => {
		if (from === to || from == null || to == null) return;

		const newItems = [...items];
		const [moved] = newItems.splice(from, 1);
		newItems.splice(to, 0, moved);

		setAttributes({ items: newItems });
	};

	return (
		<InspectorControls>
			<PanelBody title="Content items" initialOpen={true}>
				{items.map((item, index) => (
					<div
						key={item.id}
						draggable
						onDragStart={() => setDragIndex(index)}
						onDragOver={(e) => e.preventDefault()}
						onDrop={() => {
							moveItem(dragIndex, index);
							setDragIndex(null);
						}}
					>
						<PanelBody title={`☰ Item ${index + 1}`} initialOpen={false}>
							<MediaUploadCheck>
								<MediaUpload
									allowedTypes={["image"]}
									onSelect={(media) =>
										updateItem(index, {
											...item,
											mediaUrl: media.url,
										})
									}
									render={({ open }) => (
										<Button variant="secondary" onClick={open}>
											{item.mediaUrl
												? "Change image"
												: "Select image"}
										</Button>
									)}
								/>
							</MediaUploadCheck>

							{item.mediaUrl && (
								<img
									src={item.mediaUrl}
									style={{ width: "100%", marginTop: 10 }}
								/>
							)}

							<Button
								variant="link"
								isDestructive
								onClick={() => removeItem(index)}
							>
								Remove item
							</Button>
						</PanelBody>
					</div>
				))}

				<Button
					variant="primary"
					onClick={addItem}
					style={{ marginTop: 12 }}
				>
					+ Add item
				</Button>
			</PanelBody>
		</InspectorControls>
	);
}
