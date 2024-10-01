import { Box, Button, ButtonGroup, Text } from '@primer/react';
import { PencilIcon, TrashIcon } from '@primer/octicons-react';
import { Hidden } from '@primer/react/drafts';
import { NoteCollectionItemProps } from '../../types/NoteCollection/noteCollectionItemProps.interface';

import NoteCollectionActionMenu from './NoteCollectionActionMenu';
import { useNoteCollectionContext } from '../../contexts/noteCollection.context';

const NoteCollectionItem = ({ noteCollection }: NoteCollectionItemProps) => {
  const { openNoteCollectionDialog } = useNoteCollectionContext();

  const textStyle = {
    width: ['150px', '300px', '450px', '600px'],
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  };

  const boxStyle = {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBlock: 8,
    paddingInline: 12,
  };

  return (
    <Box sx={boxStyle}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Text fontWeight="bold" sx={textStyle}>
          {noteCollection.title}
        </Text>
        <Text color="fg.subtle" sx={textStyle}>
          {noteCollection.notes.map((note) => note.title).join(', ')}
        </Text>
      </Box>
      <Box onClick={(e) => e.stopPropagation()}>
        <Hidden when={['narrow']}>
          <ButtonGroup>
            <Button
              leadingIcon={PencilIcon}
              variant="outline"
              onClick={() => openNoteCollectionDialog('update')}
            >
              Edit
            </Button>
            <Button
              leadingIcon={TrashIcon}
              variant="danger"
              onClick={() => openNoteCollectionDialog('delete')}
            >
              Delete
            </Button>
          </ButtonGroup>
        </Hidden>

        <Hidden when={['regular', 'wide']}>
          <NoteCollectionActionMenu key={noteCollection.id} />
        </Hidden>
      </Box>
    </Box>
  );
};

export default NoteCollectionItem;
