/**
 * WordPress dependencies
 */
import { __, _x } from '@wordpress/i18n';
import { list as icon } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import edit from './edit';
import metadata from './block.json';
import save from './save';
import transforms from './transforms';

const { name } = metadata;

export { metadata, name };

export const settings = {
	title: _x( 'List', 'block title' ),
	description: __( 'Create a bulleted or numbered list.' ),
	icon,
	keywords: [
		__( 'bullet list' ),
		__( 'ordered list' ),
		__( 'numbered list' ),
	],
	example: {
		attributes: {
			values:
				'<li>Alice.</li><li>The White Rabbit.</li><li>The Cheshire Cat.</li><li>The Mad Hatter.</li><li>The Queen of Hearts.</li>',
		},
	},
	transforms,
	merge( attributes, attributesToMerge ) {
		const { values } = attributesToMerge;

		if ( ! values || values === '<li></li>' ) {
			return attributes;
		}

		return {
			...attributes,
			values: attributes.values + values,
		};
	},
	edit,
	save,
};
