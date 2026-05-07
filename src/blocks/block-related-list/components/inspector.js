import {
	PanelBody,
	QueryControls,
	SelectControl,
	Spinner,
	ToggleControl,
} from "@wordpress/components";
import { InspectorControls } from "@wordpress/block-editor";
import { useSelect } from "@wordpress/data";
import { __ } from "@wordpress/i18n";
import { useEffect } from "@wordpress/element";

const POST_TYPE = "case-study";

const Inspector = ({ attributes, setAttributes }) => {
	const {
		taxonomy,
		termId,
		posts_per_page,
		order,
		orderBy,
		showTaxonomyButtons,
	} = attributes;

	const taxonomies = useSelect(
		(select) => select("core").getTaxonomies({ per_page: -1 }),
		[]
	);

	const filteredTaxonomies = taxonomies
		? taxonomies.filter((tax) => tax.types?.includes(POST_TYPE))
		: null;

	useEffect(() => {
		if (!taxonomy && filteredTaxonomies?.length) {
			setAttributes({
				taxonomy: filteredTaxonomies[0].slug,
				termId: 0,
			});
		}
	}, [filteredTaxonomies]);

	const terms = useSelect(
		(select) => {
			if (!taxonomy) return null;
			return select("core").getEntityRecords("taxonomy", taxonomy, {
				per_page: -1,
			});
		},
		[taxonomy]
	);

	const taxonomyOptions =
		filteredTaxonomies?.map((tax) => ({
			label: tax.name,
			value: tax.slug,
		})) || [];

	const termOptions =
		terms?.map((term) => ({
			label: term.name,
			value: term.id,
		})) || [];

	return (
		<InspectorControls>
			<PanelBody title={__("Block Settings", "flip-blocks")} initialOpen>
				{!filteredTaxonomies && <Spinner />}
				{filteredTaxonomies && (
					<SelectControl
						label={__("Select taxonomy", "flip-blocks")}
						value={taxonomy}
						options={taxonomyOptions}
						onChange={(value) =>
							setAttributes({ taxonomy: value, termId: 0 })
						}
					/>
				)}

				{taxonomy && !terms && <Spinner />}
				{taxonomy && terms && (
					<SelectControl
						label={__("Select term", "flip-blocks")}
						value={termId}
						options={[
							{ label: __("Select term", "flip-blocks"), value: 0 },
							...termOptions,
						]}
						onChange={(value) => setAttributes({ termId: Number(value) })}
					/>
				)}
				<ToggleControl
					label={__("Show taxonomy buttons", "flip-blocks")}
					checked={showTaxonomyButtons}
					onChange={(value) =>
						setAttributes({ showTaxonomyButtons: value })
					}
				/>

				<QueryControls
					orderBy={orderBy}
					order={order}
					numberOfItems={posts_per_page}
					onOrderByChange={(newOrderBy) =>
						setAttributes({ orderBy: newOrderBy })
					}
					onOrderChange={(newOrder) => setAttributes({ order: newOrder })}
					onNumberOfItemsChange={(value) =>
						setAttributes({
							posts_per_page: Math.max(1, Number(value) || 1),
						})
					}
				/>
			</PanelBody>
		</InspectorControls>
	);
};

export default Inspector;
