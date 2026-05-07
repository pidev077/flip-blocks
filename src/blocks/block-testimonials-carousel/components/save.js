import { __ } from "@wordpress/i18n";
import { RichText, useBlockProps } from "@wordpress/block-editor";
import Testimonials from "./testimonials";
const Save = (props) => {
	const { attributes, className } = props;
	const { heading, headingColor } = attributes;

	const blockProps = useBlockProps.save({
		className: ["block-testimonials-carousel", className].join(" "),
	});

	return (
		<div {...blockProps}>
			<div className="block-testimonials-carousel__header">
				<RichText.Content
					value={heading}
					tagName="h2"
					className="wp-block-heading-stagger-random"
					style={{ color: headingColor }}
				/>
				<div className="block-testimonials-carousel__nav">
					<div className="swiper-button-prev">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="32"
							height="32"
							viewBox="0 0 32 32"
							fill="none"
						>
							<path
								d="M12 7.99967C12 6.86367 13.3147 6.27033 14.164 6.95567L14.276 7.057L22.276 15.057C22.5056 15.2866 22.6435 15.5921 22.6639 15.9161C22.6842 16.2401 22.5857 16.5605 22.3867 16.817L22.276 16.9423L14.276 24.9423L14.1507 25.053L14.048 25.125L13.92 25.197L13.872 25.2197L13.7827 25.2557L13.6387 25.2983L13.568 25.3117L13.488 25.325L13.412 25.3303L13.3333 25.333L13.2547 25.3303L13.1773 25.3237L13.0973 25.3117L13.028 25.2983L12.884 25.2557L12.7947 25.2197L12.6187 25.1263L12.4987 25.0397L12.3907 24.9423L12.28 24.817L12.208 24.7143L12.136 24.5863L12.1133 24.5383L12.0773 24.449L12.0347 24.305L12.0213 24.2343L12.008 24.1543L12.0027 24.0783L12 7.99967Z"
								fill="#120A00"
							/>
						</svg>
					</div>

					<div className="swiper-button-next">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="32"
							height="32"
							viewBox="0 0 32 32"
							fill="none"
						>
							<path
								d="M12 7.99967C12 6.86367 13.3147 6.27033 14.164 6.95567L14.276 7.057L22.276 15.057C22.5056 15.2866 22.6435 15.5921 22.6639 15.9161C22.6842 16.2401 22.5857 16.5605 22.3867 16.817L22.276 16.9423L14.276 24.9423L14.1507 25.053L14.048 25.125L13.92 25.197L13.872 25.2197L13.7827 25.2557L13.6387 25.2983L13.568 25.3117L13.488 25.325L13.412 25.3303L13.3333 25.333L13.2547 25.3303L13.1773 25.3237L13.0973 25.3117L13.028 25.2983L12.884 25.2557L12.7947 25.2197L12.6187 25.1263L12.4987 25.0397L12.3907 24.9423L12.28 24.817L12.208 24.7143L12.136 24.5863L12.1133 24.5383L12.0773 24.449L12.0347 24.305L12.0213 24.2343L12.008 24.1543L12.0027 24.0783L12 7.99967Z"
								fill="#120A00"
							/>
						</svg>
					</div>
				</div>
			</div>

			<Testimonials {...props} />
		</div>
	);
};

export default Save;
