import { __ } from "@wordpress/i18n";
const Testimonials = (props) => {
	const { attributes } = props;
	const {
		testimonials,
		slidesToShow,
		arrows,
		dots,
		autoplay,
		infinite,
		speed,
		autoplaySpeed,
		bgColor,
		contentColor,
	} = attributes;
	let data_carousel = {
		slidesToShow: slidesToShow,
		arrows: arrows,
		dots: dots,
		autoplay: autoplay,
		infinite: infinite,
		speed: speed,
		autoplaySpeed: autoplaySpeed,
	};

	return (
		<div className="block-testimonials-carousel-warp">
			<div
				className="testimonials-carousel"
				data-carousel={JSON.stringify(data_carousel)}
			>
				<div className="swiper-wrapper">
					{testimonials.map((testimonial, index) => (
						<div
							key={index}
							className="swiper-slide testimonial-item"
							style={{
								background: bgColor,
								"--text-color": contentColor,
							}}
						>
							{testimonial.logo ? (
								<img
									src={testimonial.logo}
									alt={`logo for testimonial ${testimonial.name}`}
									className="testimonial-item__logo"
								/>
							) : (
								<span className="dashicon dashicons dashicons-format-image"></span>
							)}

							<div className="testimonial-item__quote">
								“{testimonial.quote}“
							</div>

							<div className="testimonial-item__author">
								{testimonial.avatar ? (
									<img
										src={testimonial.avatar}
										alt={`avatar for testimonial ${testimonial.name}`}
										className="author-avatar"
									/>
								) : (
									<span className="dashicon dashicons dashicons-format-image"></span>
								)}

								<div className="author-info">
									<h3 className="author-info__name">
										{" "}
										{testimonial.name}{" "}
									</h3>
									<p> {testimonial.position} </p>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
export default Testimonials;
