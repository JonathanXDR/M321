import {
  CheckIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  FileDirectoryIcon,
  MarkGithubIcon,
  NoteIcon,
} from '@primer/octicons-react';
import {
  Box,
  Button,
  ButtonGroup,
  Flash,
  Header,
  PageLayout,
  StyledOcticon,
  TreeView,
  Text,
} from '@primer/react';
import React, { useState, useEffect } from 'react';
import NoteDialog from '../../components/Note/NoteDialog';
import NoteItem from '../../components/Note/NoteItem';
import NoteCollectionItem from '../../components/NoteCollection/NoteCollectionItem';
import { notes, noteCollections } from '../../services/http.service';
import LoadingSpinner from '../../components/LoadingSpinner';
import AccountActionMenu from '../../components/AccountActionMenu';

import { useHandleFlash } from '../../utils/general.util';

import { useNoteState, useNoteDialog } from '../../utils/note.util';

import {
  useNoteCollectionState,
  useNoteCollectionDialog,
} from '../../utils/noteCollection.util';
import NoteCollectionDialog from '../../components/NoteCollection/NoteCollectionDialog';
import { Note } from '../../types/Note/note.interface';
import BlankState from '../../components/BlankStateEmpty';
import BlankStateEmpty from '../../components/BlankStateEmpty';
import BlankStateConnectionError from '../../components/BlankStateConnectionError';

const HomePage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = React.useState<string[]>([]);

  const { flashVisible, flashMessage } = useHandleFlash();

  const { noteDialogIsOpen, openNoteDialog, closeNoteDialog } = useNoteDialog();
  const { notesData, setNotesData } = useNoteState();

  const {
    noteCollectionDialogIsOpen,
    openNoteCollectionDialog,
    closeNoteCollectionDialog,
  } = useNoteCollectionDialog();
  const { noteCollectionsData, setNoteCollectionsData } =
    useNoteCollectionState();

  useEffect(() => {
    const fetchAllData = async () => {
      const allNotesResponse = await notes.getAll();
      setNotesData(allNotesResponse.data);

      const allNoteCollectionsResponse = await noteCollections.getAll();
      setNoteCollectionsData(allNoteCollectionsResponse.data);

      setLoading(false);
    };

    fetchAllData();
  }, []);

  const renderFilteredNoteItems = () =>
    notesData
      .filter((note) => !note.noteCollectionId)
      .map((note) => <NoteItem key={note.id} note={note} />);

  const renderFilteredNoteItemTrees = (filteredNotes: Note[]) =>
    filteredNotes.map((note) => (
      <TreeView.Item id="note" key={note.id}>
        <TreeView.LeadingVisual>
          <NoteIcon size={16} />
        </TreeView.LeadingVisual>
        <NoteItem note={note} />
        {noteDialogIsOpen && <NoteDialog note={note} />}
      </TreeView.Item>
    ));

  const renderNoteCollections = () =>
    noteCollectionsData.map((noteCollection) => {
      const filteredNotes = notesData.filter(
        (note) => note.noteCollectionId === noteCollection.id
      );

      return (
        <TreeView.Item
          id="noteCollection"
          key={noteCollection.id}
          expanded={expanded.includes(noteCollection.id)}
          onExpandedChange={(isExpanded: boolean) => {
            if (isExpanded) {
              setExpanded((prevExpanded) => [
                ...prevExpanded,
                noteCollection.id,
              ]);
            } else {
              setExpanded((prevExpanded) =>
                prevExpanded.filter((id) => id !== noteCollection.id)
              );
            }
          }}
        >
          <TreeView.LeadingVisual>
            <TreeView.DirectoryIcon />
          </TreeView.LeadingVisual>
          <NoteCollectionItem noteCollection={noteCollection} />
          {noteCollectionDialogIsOpen && (
            <NoteCollectionDialog noteCollection={noteCollection} />
          )}
          <TreeView.SubTree>
            {renderFilteredNoteItemTrees(filteredNotes)}
          </TreeView.SubTree>
        </TreeView.Item>
      );
    });

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <PageLayout containerWidth="full" padding="none">
      <PageLayout.Header>
        <Header>
          <Header.Item full>
            <Header.Link href="#">
              <StyledOcticon icon={MarkGithubIcon} size={32} sx={{ mr: 2 }} />
              <Text>GitHub</Text>
            </Header.Link>
          </Header.Item>
          <Header.Item>
            <AccountActionMenu />
          </Header.Item>
        </Header>
      </PageLayout.Header>
      <PageLayout.Content padding="normal" width="xlarge">
        {flashVisible && (
          <Flash variant="success" sx={{ marginBottom: '4' }}>
            <StyledOcticon icon={CheckIcon} />
            {flashMessage}
          </Flash>
        )}

        {/* PageHeader and other components */}
        {/* if there is at least one item show the TreeView else show the BlankState */}
        {noteCollectionsData.length > 0 ? (
          <TreeView aria-label="Files">
            <Box sx={{ marginTop: 4 }}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                  }}
                >
                  <ButtonGroup sx={{ marginBottom: '3' }}>
                    <Button
                      trailingIcon={
                        expanded.length > 0 ? ChevronDownIcon : ChevronRightIcon
                      }
                      onClick={() =>
                        setExpanded(
                          expanded.length > 0
                            ? []
                            : noteCollectionsData.map((nc) => nc.id)
                        )
                      }
                    >
                      {expanded.length > 0 ? 'Collapse' : 'Expand'} All
                    </Button>
                  </ButtonGroup>
                  <ButtonGroup sx={{ marginBottom: '3' }}>
                    <Button
                      leadingIcon={FileDirectoryIcon}
                      variant="primary"
                      onClick={() => openNoteCollectionDialog('create')}
                    >
                      Create NoteCollection
                    </Button>
                    <Button
                      leadingIcon={NoteIcon}
                      variant="primary"
                      onClick={() => openNoteDialog('create')}
                    >
                      Create Note
                    </Button>
                  </ButtonGroup>
                </Box>
                {renderNoteCollections()}
                {renderFilteredNoteItems()}
              </Box>
            </Box>
          </TreeView>
        ) : (
          // <BlankStateEmpty />
          <BlankStateConnectionError />
        )}
      </PageLayout.Content>
    </PageLayout>
  );
};

export default HomePage;
