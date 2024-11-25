import {
  KebabHorizontalIcon,
  PencilIcon,
  TrashIcon,
} from '@primer/octicons-react';
import { ActionList, ActionMenu, IconButton } from '@primer/react';
import { useNoteCollectionContext } from '../../contexts/noteCollection.context';

function NoteCollectionActionMenu({ noteCollection }: any) {
  const {
    openNoteCollectionDialog,
    setSelectedNoteCollection,
    confirmDeleteNoteCollection,
  } = useNoteCollectionContext();
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
            <ActionList.Item
              onSelect={() => {
                setSelectedNoteCollection(noteCollection);
                openNoteCollectionDialog('update');
              }}
            >
              <ActionList.LeadingVisual>
                <PencilIcon />
              </ActionList.LeadingVisual>
              Edit
            </ActionList.Item>
            <ActionList.Item
              variant="danger"
              onSelect={() => {
                setSelectedNoteCollection(noteCollection);
                confirmDeleteNoteCollection(noteCollection);
              }}
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

export default NoteCollectionActionMenu;
