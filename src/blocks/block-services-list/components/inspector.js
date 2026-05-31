import { __ } from "@wordpress/i18n";
import { useState, useEffect } from "@wordpress/element";
import { InspectorControls } from "@wordpress/block-editor";
import {
	PanelBody,
	RangeControl,
	Spinner,
	TextControl,
	BaseControl,
} from "@wordpress/components";
import apiFetch from "@wordpress/api-fetch";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
	SortableContext,
	verticalListSortingStrategy,
	arrayMove,
	useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

/* ── Text position options ──────────────────────────────────── */
const POSITIONS = [
	{ value: "top-left",      label: "↖",  title: "Trên · Trái"  },
	{ value: "top-center",    label: "↑",  title: "Trên · Giữa"  },
	{ value: "top-right",     label: "↗",  title: "Trên · Phải"  },
	{ value: "center-left",   label: "←",  title: "Giữa · Trái"  },
	{ value: "center-right",  label: "→",  title: "Giữa · Phải"  },
	{ value: "bottom-left",   label: "↙",  title: "Dưới · Trái"  },
	{ value: "bottom-center", label: "↓",  title: "Dưới · Giữa"  },
	{ value: "bottom-right",  label: "↘",  title: "Dưới · Phải"  },
];

/* ── Preset text colors ─────────────────────────────────────── */
const COLOR_PRESETS = ["#ffffff", "#f5ede3", "#d4c5a9", "#1a1a1a", "#000000"];


/* ── Sortable selected item ─────────────────────────────────── */
const SortableServiceItem = ({ post, id, onRemove }) => {
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({ id });

	const thumbUrl =
		post._embedded?.["wp:featuredmedia"]?.[0]?.media_details?.sizes?.thumbnail?.source_url ||
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
				<img src={thumbUrl} alt="" style={{ width: 44, height: 44, objectFit: "cover", borderRadius: 4, flexShrink: 0 }} />
			)}
			<span style={{ flex: 1, fontSize: 12, fontWeight: 600, color: "#1e1e1e", lineHeight: 1.4 }}>
				{post.title?.rendered || "—"}
			</span>
			<button
				onClick={() => onRemove(post.id)}
				title={__("Bỏ chọn", "flip-blocks")}
				style={{ background: "none", border: "none", cursor: "pointer", color: "#cc1818", fontSize: 16, lineHeight: 1, padding: "0 4px", flexShrink: 0 }}
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
	const {
		selectedIds = [],
		columns = 1,
		gap = 16,
		cardHeight = 420,
		textPosition = "bottom-left",
		textColor = "#ffffff",
		titleFontSize = 24,
	} = attributes;

	const [allPosts, setAllPosts] = useState(null);
	const [search, setSearch]     = useState("");

	useEffect(() => {
		apiFetch({ path: "/wp/v2/dichvu?per_page=-1&status=publish&_embed=true" })
			.then((posts) => setAllPosts(posts))
			.catch(() => setAllPosts([]));
	}, []);

	const getPost             = (id) => allPosts?.find((p) => p.id === id);
	const selectedPosts       = selectedIds.map(getPost).filter(Boolean);
	const unselectedPosts     = (allPosts || []).filter((p) => !selectedIds.includes(p.id));
	const filteredUnselected  = search.trim()
		? unselectedPosts.filter((p) => p.title?.rendered?.toLowerCase().includes(search.toLowerCase()))
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
		post._embedded?.["wp:featuredmedia"]?.[0]?.media_details?.sizes?.thumbnail?.source_url ||
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
						<DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
							<SortableContext items={selectedIds.map(String)} strategy={verticalListSortingStrategy}>
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
										style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 0", borderBottom: "1px solid #f0f0f0" }}
									>
										{thumb && (
											<img src={thumb} alt="" style={{ width: 40, height: 40, objectFit: "cover", borderRadius: 4, flexShrink: 0 }} />
										)}
										<span style={{ flex: 1, fontSize: 12, color: "#1e1e1e" }}>
											{post.title?.rendered || "—"}
										</span>
										<button
											onClick={() => addService(post.id)}
											title={__("Thêm", "flip-blocks")}
											style={{ background: "#0073aa", color: "#fff", border: "none", borderRadius: 4, padding: "4px 10px", cursor: "pointer", fontSize: 12, flexShrink: 0 }}
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

			{/* ── Thiết kế card ───────────────────────── */}
			<PanelBody title={__("Thiết kế card", "flip-blocks")} initialOpen={true}>

				{/* Text position */}
				<BaseControl label={__("Vị trí chữ", "flip-blocks")} __nextHasNoMarginBottom>
					<div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, marginTop: 6 }}>
						{POSITIONS.map(({ value, label, title }) => (
							<button
								key={value}
								title={title}
								onClick={() => setAttributes({ textPosition: value })}
								style={{
									height: 34,
									border: textPosition === value ? "2px solid #007cba" : "1px solid #ccc",
									borderRadius: 4,
									background: textPosition === value ? "#e8f0fe" : "#fff",
									cursor: "pointer",
									fontSize: 16,
									lineHeight: 1,
									color: textPosition === value ? "#007cba" : "#555",
									fontWeight: textPosition === value ? "bold" : "normal",
								}}
							>
								{label}
							</button>
						))}
					</div>
					<p style={{ fontSize: 11, color: "#888", margin: "4px 0 0" }}>
						{POSITIONS.find((p) => p.value === textPosition)?.title}
					</p>
				</BaseControl>

				{/* Text color */}
				<BaseControl label={__("Màu chữ", "flip-blocks")} __nextHasNoMarginBottom style={{ marginTop: 12 }}>
					<div style={{ display: "flex", gap: 6, marginTop: 6, alignItems: "center" }}>
						{COLOR_PRESETS.map((c) => (
							<button
								key={c}
								title={c}
								onClick={() => setAttributes({ textColor: c })}
								style={{
									width: 28,
									height: 28,
									borderRadius: "50%",
									border: textColor === c ? "3px solid #007cba" : "2px solid #ccc",
									background: c,
									cursor: "pointer",
									padding: 0,
									flexShrink: 0,
								}}
							/>
						))}
						<input
							type="color"
							value={textColor}
							onChange={(e) => setAttributes({ textColor: e.target.value })}
							title={__("Màu tùy chỉnh", "flip-blocks")}
							style={{ width: 28, height: 28, border: "2px solid #ccc", borderRadius: "50%", padding: 0, cursor: "pointer", flexShrink: 0 }}
						/>
					</div>
				</BaseControl>

				{/* Card height */}
				<RangeControl
					label={__("Chiều cao card (px)", "flip-blocks")}
					value={cardHeight}
					onChange={(v) => setAttributes({ cardHeight: v })}
					min={150}
					max={700}
					step={10}
					style={{ marginTop: 12 }}
				/>

				{/* Title font size */}
				<RangeControl
					label={__("Cỡ chữ tiêu đề (px)", "flip-blocks")}
					value={titleFontSize}
					onChange={(v) => setAttributes({ titleFontSize: v })}
					min={10}
					max={80}
					step={1}
					style={{ marginTop: 4 }}
				/>

			</PanelBody>

			{/* ── Layout grid ─────────────────────────── */}
			<PanelBody title={__("Layout grid", "flip-blocks")} initialOpen={false}>
				<RangeControl
					label={__("Số cột (desktop)", "flip-blocks")}
					value={columns}
					onChange={(v) => setAttributes({ columns: v })}
					min={1}
					max={4}
				/>
				<RangeControl
					label={__("Khoảng cách (gap)", "flip-blocks")}
					value={gap}
					onChange={(v) => setAttributes({ gap: v })}
					min={0}
					max={60}
					step={4}
				/>
			</PanelBody>

		</InspectorControls>
	);
};

export default Inspector;
