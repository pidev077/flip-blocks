import {
	InspectorControls,
	__experimentalLinkControl as LinkControl,
} from "@wordpress/block-editor";
import { QueryControls, PanelBody, ToggleControl } from "@wordpress/components";

const Inspector = (props) => {
	const { attributes, setAttributes } = props;
	const { posts_per_page, order, orderBy, link, showProject } = attributes;

	return (
		<InspectorControls>
			<PanelBody title="General">
				<ToggleControl
					label="Show Project Text"
					checked={showProject}
					onChange={(vl) => setAttributes({ showProject: vl })}
				/>

				<label
					className="components-base-control__label"
					style={{ marginBottom: "5px", display: "inline-block" }}
				>
					Button Link
				</label>
				<LinkControl
					searchInputPlaceholder="Search here..."
					value={link}
					settings={[]}
					onChange={(value) => setAttributes({ link: value })}
					withCreateSuggestion={true}
					createSuggestion={(inputValue) =>
						setAttributes({
							link: {
								...link,
								title: inputValue,
								type: "custom-url",
								id: Date.now(),
								url: inputValue,
							},
						})
					}
					createSuggestionButtonText={(newValue) => `New: ${newValue}`}
				></LinkControl>
			</PanelBody>

			<PanelBody title="Query">
				<QueryControls
					{...{ orderBy, order, posts_per_page }}
					onOrderByChange={(newOrderBy) =>
						setAttributes({ orderBy: newOrderBy })
					}
					onOrderChange={(newOrder) => setAttributes({ order: newOrder })}
					onNumberOfItemsChange={(newNumberOfItems) =>
						setAttributes({ posts_per_page: newNumberOfItems })
					}
				/>
			</PanelBody>
		</InspectorControls>
	);
};

export default Inspector;
