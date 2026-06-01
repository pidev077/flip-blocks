import { InnerBlocks, useBlockProps } from "@wordpress/block-editor";
import Inspector from "./inspector";

const TEMPLATE = [
	[
		"core/columns",
		{ className: "at-columns" },
		[
			[
				"core/column",
				{ width: "65%", className: "at-col-left" },
				[
					[
						"core/paragraph",
						{
							placeholder: "Heading nhỏ (VD: TAMYA RA ĐỜI VỚI MỘT MỤC ĐÍCH RÕ RÀNG:)",
							className: "at-left-heading",
						},
					],
					[
						"core/paragraph",
						{
							placeholder: "Text đậm lớn...",
							className: "at-left-subtext",
						},
					],
				],
			],
			[
				"core/column",
				{ width: "35%", className: "at-col-right" },
				[
					[
						"core/paragraph",
						{
							placeholder: "Đoạn mô tả bên phải...",
							className: "at-right-text",
						},
					],
				],
			],
		],
	],
];

export default function Edit({ attributes, setAttributes }) {
	const { titleImageUrl, watermarkImageUrl, heroImageUrl } = attributes;

	const blockProps = useBlockProps({
		className: "about-tamya-block",
	});

	return (
		<>
			<Inspector attributes={attributes} setAttributes={setAttributes} />

			<div {...blockProps}>
				{/* TITLE + TEXT — inside container */}
				<div className="at-upper-section">
					<div className="container">
						{titleImageUrl ? (
							<div className="at-title-wrap">
								<img src={titleImageUrl} className="at-title-img" alt="" />
							</div>
						) : (
							<div className="at-placeholder">
								Chưa có ảnh tiêu đề — upload tại sidebar →
							</div>
						)}

						<div className="at-innerblocks-wrap">
							<InnerBlocks template={TEMPLATE} templateLock={false} />
						</div>
					</div>

					{/* WATERMARK — absolute, bắc cầu sang hero */}
					{watermarkImageUrl ? (
						<div className="at-watermark-wrap">
							<img src={watermarkImageUrl} className="at-watermark-img" alt="" />
						</div>
					) : (
						<div className="at-placeholder at-watermark-placeholder">
							Chưa có logo watermark — upload tại sidebar →
						</div>
					)}
				</div>

				{/* HERO IMAGE */}
				{heroImageUrl ? (
					<div className="at-hero-wrap">
						<img src={heroImageUrl} className="at-hero-img" alt="" />
					</div>
				) : (
					<div className="at-placeholder at-hero-placeholder">
						Chưa có ảnh hero — upload tại sidebar →
					</div>
				)}
			</div>
		</>
	);
}
