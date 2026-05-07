import {
	RichText,
	MediaUpload,
	MediaUploadCheck,
} from "@wordpress/block-editor";
import { Button } from "@wordpress/components";

export default function Item({ item, onChange, isActive, onClick }) {
	return (
		<div
			className={`content-item ${isActive ? "is-active" : ""}`}
			onClick={onClick}
		>
			<RichText
				tagName="h4"
				value={item.title}
				onChange={(v) => onChange({ ...item, title: v })}
				placeholder="Title"
				allowedFormats={[]}
			/>

			<RichText
				tagName="p"
				value={item.text}
				onChange={(v) => onChange({ ...item, text: v })}
				placeholder="Description"
			/>

			<MediaUploadCheck>
				<MediaUpload
					allowedTypes={["image", "video"]}
					onSelect={(media) => {
						onChange({
							...item,
							mediaUrl: media.url,
							mediaType: media.media_type,
						});
					}}
					render={({ open }) => (
						<Button onClick={open} variant="secondary">
							{item.mediaUrl ? "Change media" : "Select media"}
						</Button>
					)}
				/>
			</MediaUploadCheck>
		</div>
	);
}
