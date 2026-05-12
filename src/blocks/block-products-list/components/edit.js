import { useState, useEffect } from "@wordpress/element";
import { useBlockProps } from "@wordpress/block-editor";
import apiFetch from "@wordpress/api-fetch";
import { Spinner } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import Inspector from "./inspector";

const Edit = (props) => {
	const { attributes } = props;
	const { selectedIds = [], columns } = attributes;

	const [postsMap, setPostsMap] = useState({});
	const [loading, setLoading]   = useState(true);

	const blockProps = useBlockProps({
		className: "block-products-list",
		style: { "--product-cols": columns },
	});

	useEffect(() => {
		apiFetch({ path: "/wp/v2/sanpham?per_page=-1&status=publish&_embed=true" })
			.then((posts) => {
				const map = {};
				posts.forEach((p) => (map[p.id] = p));
				setPostsMap(map);
			})
			.catch(() => {})
			.finally(() => setLoading(false));
	}, []);

	const getThumb = (post) =>
		post?._embedded?.["wp:featuredmedia"]?.[0]?.media_details?.sizes?.medium
			?.source_url ||
		post?._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
		"";

	const displayPosts = selectedIds.length > 0
		? selectedIds.map((id) => postsMap[id]).filter(Boolean)
		: Object.values(postsMap);

	return (
		<div {...blockProps}>
			<Inspector {...props} />

			{loading ? (
				<div style={{ padding: 40, display: "flex", alignItems: "center", gap: 12 }}>
					<Spinner />
					<span style={{ color: "#888" }}>Đang tải sản phẩm...</span>
				</div>
			) : displayPosts.length === 0 ? (
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
					<div style={{ fontSize: 32, marginBottom: 8 }}>📦</div>
					<strong style={{ display: "block", marginBottom: 4 }}>
						{__("Chưa có sản phẩm nào", "flip-blocks")}
					</strong>
					<span>{__("Thêm sản phẩm trong mục Sản phẩm ở sidebar.", "flip-blocks")}</span>
				</div>
			) : (
				<div
					className="block-products-list__grid"
					style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
				>
					{displayPosts.map((post) => {
						const thumb = getThumb(post);
						return (
							<div
								key={post.id}
								className="product-card"
								style={{ cursor: "default", pointerEvents: "none" }}
							>
								<div className="product-card__image-wrap">
									{thumb ? (
										<img
											className="product-card__image"
											src={thumb}
											alt={post.title?.rendered || ""}
										/>
									) : (
										<div
											style={{
												width: "100%",
												height: "100%",
												background: "#f0ece4",
												display: "flex",
												alignItems: "center",
												justifyContent: "center",
												color: "#999",
												fontSize: 12,
											}}
										>
											{__("Chưa có ảnh", "flip-blocks")}
										</div>
									)}
								</div>
								<div className="product-card__info">
									{post.acf?.product_brand && (
										<span className="product-card__brand">{post.acf.product_brand}</span>
									)}
									<h3
										className="product-card__title"
										dangerouslySetInnerHTML={{ __html: post.title?.rendered || "" }}
									/>
									{post.acf?.product_subtitle && (
										<p className="product-card__subtitle">{post.acf.product_subtitle}</p>
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
