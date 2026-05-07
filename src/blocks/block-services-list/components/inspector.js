import { __ } from "@wordpress/i18n";
import { useState, useEffect } from "@wordpress/element";
import { InspectorControls } from "@wordpress/block-editor";
import { PanelBody, RangeControl, Spinner, TextControl } from "@wordpress/components";
import apiFetch from "@wordpress/api-fetch";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
	SortableContext,
	verticalListSortingStrategy,
	arrayMove,
	useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

/* ── Sortable selected item ─────────────────────────────────── */
const SortableServiceItem = ({ post, id, onRemove }) => {
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({ id });

	const thumbUrl =
		post._embedded?.["wp:featuredmedia"]?.[0]?.media_details?.sizes?.thumbnail
			?.source_url ||
		post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
		"";

	return (
		<div
			ref={setNodeRef}
			style={{
				transform: CSS.Transform.toString(transform),
				transition,
				display: "flex",
				alignItems: "center",
				gap: 8,
				padding: "8px 10px",
				marginBottom: 6,
				background: "#fff",
				border: "1px solid #e0e0e0",
				borderRadius: 6,
			}}
		>
			{thumbUrl && (
				<img
					src={thumbUrl}
					alt=""
					style={{ width: 44, height: 44, objectFit: "cover", borderRadius: 4, flexShrink: 0 }}
				/>
			)}
			<span style={{ flex: 1, fontSize: 12, fontWeight: 600, color: "#1e1e1e", lineHeight: 1.4 }}>
				{post.title?.rendered || "—"}
			</span>
			<button
				onClick={() => onRemove(post.id)}
				title={__("Bỏ chọn", "flip-blocks")}
				style={{
					background: "none",
					border: "none",
					cursor: "pointer",
					color: "#cc1818",
					fontSize: 16,
					lineHeight: 1,
					padding: "0 4px",
					flexShrink: 0,
				}}
			>
				×
			</button>
			<div
				{...listeners}
				{...attributes}
				title={__("Kéo để sắp xếp", "flip-blocks")}
				style={{ cursor: "grab", color: "#aaa", padding: "0 4px", flexShrink: 0 }}
			>
				⠿
			</div>
		</div>
	);
};

/* ── Main Inspector ─────────────────────────────────────────── */
const Inspector = ({ attributes, setAttributes }) => {
	const { selectedIds = [], columns } = attributes;
	const [allPosts, setAllPosts]   = useState(null);
	const [search, setSearch]       = useState("");

	/* fetch all dichvu posts once */
	useEffect(() => {
		apiFetch({ path: "/wp/v2/dichvu?per_page=-1&status=publish&_embed=true" })
			.then((posts) => setAllPosts(posts))
			.catch(() => setAllPosts([]));
	}, []);

	/* helpers */
	const getPost   = (id) => allPosts?.find((p) => p.id === id);
	const selectedPosts = selectedIds.map(getPost).filter(Boolean);
	const unselectedPosts = (allPosts || []).filter(
		(p) => !selectedIds.includes(p.id)
	);
	const filteredUnselected = search.trim()
		? unselectedPosts.filter((p) =>
				p.title?.rendered?.toLowerCase().includes(search.toLowerCase())
		  )
		: unselectedPosts;

	const addService    = (id) => setAttributes({ selectedIds: [...selectedIds, id] });
	const removeService = (id) => setAttributes({ selectedIds: selectedIds.filter((i) => i !== id) });

	const handleDragEnd = ({ active, over }) => {
		if (!over || active.id === over.id) return;
		const oldIdx = selectedIds.indexOf(Number(active.id));
		const newIdx = selectedIds.indexOf(Number(over.id));
		if (oldIdx === -1 || newIdx === -1) return;
		setAttributes({ selectedIds: arrayMove(selectedIds, oldIdx, newIdx) });
	};

	const getThumbnail = (post) =>
		post._embedded?.["wp:featuredmedia"]?.[0]?.media_details?.sizes?.thumbnail
			?.source_url ||
		post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
		"";

	return (
		<InspectorControls>

			{/* ── Dịch vụ đã chọn ─────────────────────── */}
			<PanelBody title={__("Dịch vụ đã chọn", "flip-blocks")} initialOpen={true}>
				{allPosts === null ? (
					<div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 0" }}>
						<Spinner />
						<span style={{ fontSize: 12, color: "#888" }}>Đang tải...</span>
					</div>
				) : selectedPosts.length === 0 ? (
					<p style={{ fontSize: 12, color: "#999", margin: 0 }}>
						{__("Chưa chọn dịch vụ nào.", "flip-blocks")}
					</p>
				) : (
					<>
						<p style={{ fontSize: 11, color: "#888", marginBottom: 8 }}>
							{__("Kéo ⠿ để sắp xếp lại.", "flip-blocks")}
						</p>
						<DndContext
							collisionDetection={closestCenter}
							onDragEnd={handleDragEnd}
						>
							<SortableContext
								items={selectedIds.map(String)}
								strategy={verticalListSortingStrategy}
							>
								{selectedPosts.map((post) => (
									<SortableServiceItem
										key={post.id}
										id={String(post.id)}
										post={post}
										onRemove={removeService}
									/>
								))}
							</SortableContext>
						</DndContext>
					</>
				)}
			</PanelBody>

			{/* ── Thêm dịch vụ ────────────────────────── */}
			<PanelBody title={__("Thêm dịch vụ", "flip-blocks")} initialOpen={false}>
				{allPosts === null ? (
					<Spinner />
				) : (
					<>
						<TextControl
							placeholder={__("Tìm kiếm...", "flip-blocks")}
							value={search}
							onChange={setSearch}
						/>
						{filteredUnselected.length === 0 ? (
							<p style={{ fontSize: 12, color: "#999", margin: 0 }}>
								{allPosts.length === selectedIds.length
									? __("Đã chọn tất cả dịch vụ.", "flip-blocks")
									: __("Không tìm thấy.", "flip-blocks")}
							</p>
						) : (
							filteredUnselected.map((post) => {
								const thumb = getThumbnail(post);
								return (
									<div
										key={post.id}
										style={{
											display: "flex",
											alignItems: "center",
											gap: 8,
											padding: "8px 0",
											borderBottom: "1px solid #f0f0f0",
										}}
									>
										{thumb && (
											<img
												src={thumb}
												alt=""
												style={{ width: 40, height: 40, objectFit: "cover", borderRadius: 4, flexShrink: 0 }}
											/>
										)}
										<span style={{ flex: 1, fontSize: 12, color: "#1e1e1e" }}>
											{post.title?.rendered || "—"}
										</span>
										<button
											onClick={() => addService(post.id)}
											title={__("Thêm", "flip-blocks")}
											style={{
												background: "#0073aa",
												color: "#fff",
												border: "none",
												borderRadius: 4,
												padding: "4px 10px",
												cursor: "pointer",
												fontSize: 12,
												flexShrink: 0,
											}}
										>
											+
										</button>
									</div>
								);
							})
						)}
					</>
				)}
			</PanelBody>

			{/* ── Cài đặt ─────────────────────────────── */}
			<PanelBody title={__("Cài đặt hiển thị", "flip-blocks")} initialOpen={false}>
				<RangeControl
					label={__("Số cột (desktop)", "flip-blocks")}
					value={columns}
					onChange={(v) => setAttributes({ columns: v })}
					min={1}
					max={4}
				/>
			</PanelBody>

		</InspectorControls>
	);
};

export default Inspector;
