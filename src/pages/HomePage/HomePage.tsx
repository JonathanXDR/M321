import React, { useState, useEffect } from 'react';
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

import { Note } from '../../types/Note/note.interface';
import { NoteProvider, useNoteContext } from '../../contexts/note.context';
import {
  NoteCollectionProvider,
  useNoteCollectionContext,
} from '../../contexts/noteCollection.context';
import NoteDialog from '../../components/Note/NoteDialog';
import NoteItem from '../../components/Note/NoteItem';
import NoteCollectionItem from '../../components/NoteCollection/NoteCollectionItem';
import LoadingSpinner from '../../components/LoadingSpinner';
import AccountActionMenu from '../../components/AccountActionMenu';
import NoteCollectionDialog from '../../components/NoteCollection/NoteCollectionDialog';
import BlankStateEmpty from '../../components/BlankState/BlankStateEmpty';
import UnderlineNavItem from '../../components/UnderlineNavItem';
import './HomePage.module.css';
import MainNavbar from '../../components/Navbar/MainNavbar';
import { NoteCollection } from '../../types/NoteCollection/noteCollection.interface';
import { useGeneralContext } from '../../contexts/general.context';

const HomePage: React.FC = () => {
  const [expanded, setExpanded] = React.useState<string[]>([]);

  const {
    notesData,
    noteCollectionsData,
    loading,
    fetchAllData,
    flashVisible,
    flashMessage,
    handleFlash,
  } = useGeneralContext();

  const {
    setNotesData,
    newNote,
    setNewNote,
    noteDialogIsOpen,
    setNoteDialogIsOpen,
    noteDialogType,
    setNoteDialogType,
    openNoteDialog,
    closeNoteDialog,
    handleCreateNote,
    handleUpdateNote,
    handleDeleteNote,
  } = useNoteContext();

  const {
    setNoteCollectionsData,
    newNoteCollection,
    setNewNoteCollection,
    noteCollectionDialogIsOpen,
    setNoteCollectionDialogIsOpen,
    noteCollectionDialogType,
    setNoteCollectionDialogType,
    openNoteCollectionDialog,
    closeNoteCollectionDialog,
    handleCreateNoteCollection,
    handleUpdateNoteCollection,
    handleDeleteNoteCollection,
  } = useNoteCollectionContext();

  useEffect(() => {
    fetchAllData();
  }, []);

  const renderFilteredNoteItems = () =>
    notesData
      .filter((note: Note) => !note.noteCollectionId)
      .map((note: Note) => <NoteItem key={note.id} note={note} />);

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
    noteCollectionsData.map((noteCollection: NoteCollection) => {
      const filteredNotes = notesData.filter(
        (note: Note) => note.noteCollectionId === noteCollection.id
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
        <MainNavbar />
      </PageLayout.Header>
      <PageLayout.Content padding="normal" width="xlarge">
        {flashVisible && (
          <Flash variant="success" sx={{ marginBottom: '4' }}>
            <StyledOcticon icon={CheckIcon} />
            {flashMessage}
          </Flash>
        )}

        {!notesData.length && !noteCollectionsData.length ? (
          <BlankStateEmpty />
        ) : (
          <>
            {/* <UnderlineNavItem /> */}
            <TreeView aria-label="Files">
              <Box sx={{ marginTop: 5 }}>
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
                      alignItems: 'flex-start',
                      flexWrap: 'wrap-reverse',
                    }}
                  >
                    <ButtonGroup
                      sx={{
                        marginRight: '3',
                        marginBottom: '3',
                      }}
                    >
                      <Button
                        trailingIcon={
                          expanded.length > 0
                            ? ChevronDownIcon
                            : ChevronRightIcon
                        }
                        onClick={() =>
                          setExpanded(
                            expanded.length > 0
                              ? []
                              : noteCollectionsData.map(
                                  (noteCollection: NoteCollection) =>
                                    noteCollection.id
                                )
                          )
                        }
                      >
                        {expanded.length > 0 ? 'Collapse' : 'Expand'} All
                      </Button>
                    </ButtonGroup>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        flexWrap: 'wrap',
                      }}
                    >
                      <Button
                        leadingIcon={NoteIcon}
                        variant="primary"
                        onClick={() => openNoteDialog('create')}
                        sx={{
                          marginRight: '3',
                          marginBottom: '3',
                        }}
                      >
                        Create Note
                      </Button>
                      <Button
                        leadingIcon={FileDirectoryIcon}
                        variant="default"
                        onClick={() => openNoteCollectionDialog('create')}
                        sx={{
                          marginBottom: '3',
                        }}
                      >
                        Create NoteCollection
                      </Button>
                    </Box>
                  </Box>
                  {renderNoteCollections()}
                  {renderFilteredNoteItems()}
                </Box>
              </Box>
            </TreeView>
          </>
        )}
      </PageLayout.Content>
    </PageLayout>
  );
};

export default HomePage;
