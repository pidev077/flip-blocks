import {
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
} from "@wordpress/block-editor";
import { PanelBody, Button } from "@wordpress/components";
import { __ } from "@wordpress/i18n";

export default function Inspector({ attributes, setAttributes }) {
	const { titleImageUrl, watermarkImageUrl, heroImageUrl } = attributes;

	return (
		<InspectorControls>
			<PanelBody title={__("Ảnh tiêu đề")} initialOpen={true}>
				<MediaUploadCheck>
					<MediaUpload
						allowedTypes={["image"]}
						value={titleImageUrl}
						onSelect={(media) => setAttributes({ titleImageUrl: media.url })}
						render={({ open }) => (
							<>
								{titleImageUrl && (
									<img
										src={titleImageUrl}
										alt=""
										style={{ width: "100%", marginBottom: 8, borderRadius: 4 }}
									/>
								)}
								<Button variant="secondary" onClick={open} style={{ width: "100%" }}>
									{titleImageUrl ? __("Đổi ảnh tiêu đề") : __("+ Upload ảnh tiêu đề")}
								</Button>
								{titleImageUrl && (
									<Button
										isDestructive
										variant="tertiary"
										onClick={() => setAttributes({ titleImageUrl: "" })}
										style={{ width: "100%", marginTop: 4 }}
									>
										{__("Xóa ảnh")}
									</Button>
								)}
							</>
						)}
					/>
				</MediaUploadCheck>
			</PanelBody>

			<PanelBody title={__("Logo watermark (mờ)")} initialOpen={false}>
				<MediaUploadCheck>
					<MediaUpload
						allowedTypes={["image"]}
						value={watermarkImageUrl}
						onSelect={(media) => setAttributes({ watermarkImageUrl: media.url })}
						render={({ open }) => (
							<>
								{watermarkImageUrl && (
									<img
										src={watermarkImageUrl}
										alt=""
										style={{ width: "100%", marginBottom: 8, borderRadius: 4, opacity: 0.4 }}
									/>
								)}
								<Button variant="secondary" onClick={open} style={{ width: "100%" }}>
									{watermarkImageUrl ? __("Đổi logo watermark") : __("+ Upload logo watermark")}
								</Button>
								{watermarkImageUrl && (
									<Button
										isDestructive
										variant="tertiary"
										onClick={() => setAttributes({ watermarkImageUrl: "" })}
										style={{ width: "100%", marginTop: 4 }}
									>
										{__("Xóa ảnh")}
									</Button>
								)}
							</>
						)}
					/>
				</MediaUploadCheck>
			</PanelBody>

			<PanelBody title={__("Ảnh hero (dưới cùng)")} initialOpen={false}>
				<MediaUploadCheck>
					<MediaUpload
						allowedTypes={["image"]}
						value={heroImageUrl}
						onSelect={(media) => setAttributes({ heroImageUrl: media.url })}
						render={({ open }) => (
							<>
								{heroImageUrl && (
									<img
										src={heroImageUrl}
										alt=""
										style={{ width: "100%", marginBottom: 8, borderRadius: 4 }}
									/>
								)}
								<Button variant="secondary" onClick={open} style={{ width: "100%" }}>
									{heroImageUrl ? __("Đổi ảnh hero") : __("+ Upload ảnh hero")}
								</Button>
								{heroImageUrl && (
									<Button
										isDestructive
										variant="tertiary"
										onClick={() => setAttributes({ heroImageUrl: "" })}
										style={{ width: "100%", marginTop: 4 }}
									>
										{__("Xóa ảnh")}
									</Button>
								)}
							</>
						)}
					/>
				</MediaUploadCheck>
			</PanelBody>
		</InspectorControls>
	);
}
