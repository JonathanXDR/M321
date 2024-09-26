import {
  KebabHorizontalIcon,
  PencilIcon,
  ArchiveIcon,
  TrashIcon,
  UnlinkIcon,
  StarIcon,
} from '@primer/octicons-react';
import {
  ActionList,
  ActionMenu,
  Box,
  ConfirmationDialog,
  IconButton,
} from '@primer/react';
import { useNoteDialog } from '../../utils/note.util';
import NoteDialog from './NoteDialog';
function NoteActionMenu({ note }: any) {
  const { noteDialogIsOpen, noteDialogType, openNoteDialog, closeNoteDialog } =
    useNoteDialog();
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
              <ActionList.TrailingVisual>⌘E</ActionList.TrailingVisual>
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
              <ActionList.TrailingVisual>⌘D</ActionList.TrailingVisual>
            </ActionList.Item>
          </ActionList>
        </ActionMenu.Overlay>
      </ActionMenu>

      {noteDialogIsOpen && noteDialogType !== 'delete' && (
        <NoteDialog key={note.id} note={note} />
      )}

      {noteDialogIsOpen && noteDialogType === 'delete' && (
        <ConfirmationDialog
          title="Confirm action?"
          onClose={() => closeNoteDialog()}
          confirmButtonType="danger"
        >
          Are you sure you want to delete this note?
        </ConfirmationDialog>
      )}
    </>
  );
}

export default NoteActionMenu;
