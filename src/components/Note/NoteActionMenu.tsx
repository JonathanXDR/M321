import {
  KebabHorizontalIcon,
  PencilIcon,
  TrashIcon,
} from '@primer/octicons-react';
import { ActionList, ActionMenu, Box, IconButton } from '@primer/react';
import { useNoteContext } from '../../contexts/note.context';

function NoteActionMenu() {
  const { openNoteDialog } = useNoteContext();
  return (
    <>
      <ActionMenu>
        <ActionMenu.Anchor>
          <IconButton
            icon={KebabHorizontalIcon}
            variant="invisible"
            aria-label="Open column options"
          />
        </ActionMenu.Anchor>

        <ActionMenu.Overlay>
          <ActionList>
            <ActionList.Item onSelect={() => openNoteDialog('update')}>
              <ActionList.LeadingVisual>
                <PencilIcon />
              </ActionList.LeadingVisual>
              Edit
              {/* <ActionList.TrailingVisual>⌘E</ActionList.TrailingVisual> */}
            </ActionList.Item>
            {/* <ActionList.Item onSelect={() => alert('Star clicked')}>
            <ActionList.LeadingVisual>
              <StarIcon />
            </ActionList.LeadingVisual>
            Star
            <ActionList.TrailingVisual>⌘S</ActionList.TrailingVisual>
          </ActionList.Item> */}
            {/* <ActionList.Divider /> */}
            <ActionList.Item
              variant="danger"
              onSelect={() => openNoteDialog('delete')}
            >
              <ActionList.LeadingVisual>
                <TrashIcon />
              </ActionList.LeadingVisual>
              Delete
              {/* <ActionList.TrailingVisual>⌘D</ActionList.TrailingVisual> */}
            </ActionList.Item>
          </ActionList>
        </ActionMenu.Overlay>
      </ActionMenu>
    </>
  );
}

export default NoteActionMenu;
