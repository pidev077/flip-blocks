/**
 * Internal dependencies
 */
import { camelToKebabCase } from '../utils';
const { Fragment } = wp.element;
export const ResponsiveSettingStyle = ( {
	clientId,
	device,
	selectedDevice,
	settingName,
	settingValue,
} ) => (
	<Fragment>
		{ !! settingValue
			? `@media only screen and (max-width: ${ device }) {
				#block-${ clientId } {
					${ camelToKebabCase( settingName ) }: ${ settingValue } !important
				}
			}`
			: null
		}
		{ selectedDevice === device && !! settingValue
			? `#block-${ clientId } {
				${ camelToKebabCase( settingName ) }: ${ settingValue } !important
			}`
			: null
		}
	</Fragment>
);
