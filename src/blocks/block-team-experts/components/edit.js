
import { Fragment, useEffect, useRef } from '@wordpress/element'
import Inspector from './inspector'
import { initTeamExpertsBlock } from '../../../../shared/team-experts-carousel'
const { serverSideRender: ServerSideRender } = wp;

const Edit = (props) => {
	const { attributes } = props;
	const previewRef = useRef();

	// ServerSideRender only paints markup; it doesn't run the frontend JS
	// that powers the category tabs + Swiper carousel. Re-run that same
	// logic here whenever the preview HTML (re)mounts so the editor
	// preview behaves like the live site.
	useEffect(() => {
		const container = previewRef.current;
		if (!container) return;

		const runInit = () => {
			const block = container.querySelector('.block-team-experts');
			if (block) initTeamExpertsBlock(block);
		};

		runInit();

		const observer = new MutationObserver(runInit);
		observer.observe(container, { childList: true, subtree: true });

		return () => observer.disconnect();
	}, []);

	return (
		<Fragment>
			<Inspector {...props} />
			<div ref={previewRef}>
				<ServerSideRender
					className='block-server-render'
					block="flip-blocks/block-team-experts"
					attributes={attributes}
				/>
			</div>
		</Fragment>
	)
}

export default Edit
