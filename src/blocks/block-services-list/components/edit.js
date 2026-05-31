import { useState, useEffect } from "@wordpress/element";
import { useBlockProps } from "@wordpress/block-editor";
import apiFetch from "@wordpress/api-fetch";
import { Spinner } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import Inspector from "./inspector";

const Edit = (props) => {
	const { attributes } = props;
	const {
		selectedIds = [],
		columns = 1,
		gap = 16,
		cardHeight = 420,
		textPosition = "bottom-left",
		textColor = "#ffffff",
		titleFontSize = 24,
	} = attributes;

	const [postsMap, setPostsMap] = useState({});
	const [loading, setLoading]   = useState(true);

	const blockProps = useBlockProps({
		className: "block-services-list",
		"data-text-pos": textPosition,
		style: {
			"--service-cols": columns,
			"--service-gap": `${gap}px`,
			"--card-height": `${cardHeight}px`,
		},
	});

	useEffect(() => {
		apiFetch({ path: "/wp/v2/dichvu?per_page=-1&status=publish&_embed=true" })
			.then((posts) => {
				const map = {};
				posts.forEach((p) => (map[p.id] = p));
				setPostsMap(map);
			})
			.catch(() => {})
			.finally(() => setLoading(false));
	}, []);

	const getThumb = (post) =>
		post?._embedded?.["wp:featuredmedia"]?.[0]?.media_details?.sizes?.large?.source_url ||
		post?._embedded?.["wp:featuredmedia"]?.[0]?.media_details?.sizes?.medium?.source_url ||
		post?._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
		"";

	const selectedPosts = selectedIds.map((id) => postsMap[id]).filter(Boolean);

	// Inline styles applied directly so color/size/font work without CSS variable cascading issues in the editor
	const titleStyle = { color: textColor, fontSize: titleFontSize + "px" };
	const labelStyle = { color: textColor };

	return (
		<div {...blockProps}>
			<Inspector {...props} />

			{loading ? (
				<div style={{ padding: 40, display: "flex", alignItems: "center", gap: 12 }}>
					<Spinner />
					<span style={{ color: "#888" }}>Đang tải dịch vụ...</span>
				</div>
			) : selectedPosts.length === 0 ? (
				<div
					style={{
						padding: 40,
						border: "2px dashed #ddd",
						borderRadius: 12,
						textAlign: "center",
						color: "#aaa",
						fontSize: 14,
					}}
				>
					<div style={{ fontSize: 32, marginBottom: 8 }}>🏥</div>
					<strong style={{ display: "block", marginBottom: 4 }}>
						{__("Chưa có dịch vụ nào được chọn", "flip-blocks")}
					</strong>
					<span>{__("Mở sidebar → Thêm dịch vụ để bắt đầu.", "flip-blocks")}</span>
				</div>
			) : (
				<div className="block-services-list__grid">
					{selectedPosts.map((post) => {
						const thumb = getThumb(post);
						const cardLabel = post.service_card_label || "";
						return (
							<div
								key={post.id}
								className="service-card"
								style={{ cursor: "default", pointerEvents: "none" }}
							>
								{thumb ? (
									<img
										className="service-card__image"
										src={thumb}
										alt={post.title?.rendered || ""}
									/>
								) : (
									<div
										style={{
											position: "absolute",
											inset: 0,
											background: "#2a2018",
											display: "flex",
											alignItems: "center",
											justifyContent: "center",
											color: "#666",
											fontSize: 12,
										}}
									>
										{__("Chưa có ảnh", "flip-blocks")}
									</div>
								)}
								<div className="service-card__overlay" />
								<div className="service-card__content">
									<h3
										className="service-card__title"
										style={titleStyle}
										dangerouslySetInnerHTML={{ __html: post.title?.rendered || "" }}
									/>
									{cardLabel && (
										<span className="service-card__label" style={labelStyle}>
											{cardLabel}
										</span>
									)}
								</div>
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
};

export default Edit;
