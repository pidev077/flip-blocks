

/**
 * EDITOR: Featured Image with Focal Point
 */

const { FocalPointPicker } = wp.components;
const { compose } = wp.compose;
const { withDispatch, withSelect } = wp.data;
const { Fragment } = wp.element;
const { addFilter } = wp.hooks;
const { __ } = wp.i18n;

function wrapPostFeaturedImage(PostFeaturedImage) {
    return compose(
        applyWithSelect,
        applyWithDispatch,
    )((props) => {
        const {
            media,
            featuredImageFocalPoint,
            setFeaturedImageFocalPoint,
            featuredImageFocalPointMobile,
            setFeaturedImageFocalPointMobile,
        } = props;

        if (media && media.source_url) {
            const url = media.source_url;
            const { width, height } = media;

            return (
                <Fragment>
                    <PostFeaturedImage {...props} />
                    <hr />
                    <FocalPointPicker
                        label={__('Focal point picker')}
                        url={url}
                        dimensions={{ width, height }}
                        value={featuredImageFocalPoint}
                        onChange={(newFocalPoint) =>
                            setFeaturedImageFocalPoint(newFocalPoint)
                        }
                    />
                    <hr />
                    <FocalPointPicker
                        label={__('Focal point picker (Mobile)')}
                        url={url}
                        dimensions={{ width, height }}
                        value={featuredImageFocalPointMobile}
                        onChange={(newFocalPointMobile) =>
                            setFeaturedImageFocalPointMobile(newFocalPointMobile)
                        }
                    />
                </Fragment>
            );
        }

        return (
            <PostFeaturedImage {...props} />
        );
    });
}

const applyWithSelect = withSelect((select) => {
    const { getEditedPostAttribute } = select('core/editor');
    const featuredImageFocalPoint = getEditedPostAttribute('meta')['featured_image_focal_point'];
    const featuredImageFocalPointMobile = getEditedPostAttribute('meta')['featured_image_focal_point_mobile'];

    return {
        featuredImageFocalPoint,
        featuredImageFocalPointMobile,
    };
});

const applyWithDispatch = withDispatch((dispatch) => {
    const { editPost } = dispatch('core/editor');

    return {
        setFeaturedImageFocalPoint(focalPoint) {
            editPost({ meta: { featured_image_focal_point: focalPoint } });
        },
        setFeaturedImageFocalPointMobile(focalPointMobile) {
            editPost({ meta: { featured_image_focal_point_mobile: focalPointMobile } });
        },
    };
});

addFilter(
    'editor.PostFeaturedImage',
    'centralex/wrap-post-featured-image',
    wrapPostFeaturedImage
);