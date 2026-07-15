const Background = ({ slide = {} }) => {
	const {
		imgUrl,
		imgAlt,
		typeHero,
		videoURL,
		focalPoint,
		videoFormat,
		posterUrl,
	} = slide;

	const objectPosition = focalPoint
		? `${focalPoint.x * 100}% ${focalPoint.y * 100}%`
		: "50% 50%";

	return (
		<div className="hero-block__bg">
			{typeHero === "image" && imgUrl?.length > 0 && (
				<img
					src={imgUrl}
					alt={imgAlt}
					style={{ objectPosition: objectPosition }}
				/>
			)}

			{typeHero === "video" && videoURL?.length > 0 && (
				<video
					autoPlay
					muted
					loop
					playsInline
					poster={posterUrl ? posterUrl : undefined}
				>
					<source src={videoURL} type={videoFormat} />
					Your browser does not support HTML5 video.
				</video>
			)}
		</div>
	);
};

export default Background;
