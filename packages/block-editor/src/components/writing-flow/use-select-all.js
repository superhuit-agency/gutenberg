/**
 * External dependencies
 */
import { first, last } from 'lodash';

/**
 * WordPress dependencies
 */
import { isEntirelySelected } from '@wordpress/dom';
import { isKeyboardEvent } from '@wordpress/keycodes';
import { useSelect, useDispatch } from '@wordpress/data';
import { useRefEffect } from '@wordpress/compose';

/**
 * Internal dependencies
 */
import { store as blockEditorStore } from '../../store';

export default function useSelectAll() {
	const {
		getBlockOrder,
		getSelectedBlockClientIds,
		getBlockRootClientId,
	} = useSelect( blockEditorStore );
	const { multiSelect } = useDispatch( blockEditorStore );

	return useRefEffect( ( node ) => {
		function onKeyDown( event ) {
			if (
				isKeyboardEvent.primary( event, 'a' ) &&
				isEntirelySelected( event.target )
			) {
				const selectedClientIds = getSelectedBlockClientIds();

				if ( ! selectedClientIds.length ) {
					return;
				}

				const [ firstClientId ] = selectedClientIds;
				const rootClientId = getBlockRootClientId( firstClientId );
				let blockClientIds = getBlockOrder( rootClientId );

				if ( selectedClientIds.length === blockClientIds.length ) {
					blockClientIds = getBlockOrder(
						getBlockRootClientId( rootClientId )
					);
				}

				multiSelect( first( blockClientIds ), last( blockClientIds ) );
				event.preventDefault();
			}
		}

		node.addEventListener( 'keydown', onKeyDown );
		return () => {
			node.removeEventListener( 'keydown', onKeyDown );
		};
	}, [] );
}
