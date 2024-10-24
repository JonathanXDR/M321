import {
  ChevronDownIcon,
  ChevronRightIcon,
  FileDirectoryIcon,
  NoteIcon,
} from '@primer/octicons-react';
import { Box, Button, ButtonGroup, PageLayout, TreeView } from '@primer/react';
import React, { useEffect, useState } from 'react';
import BlankStateEmpty from '../../components/BlankState/BlankStateEmpty';
import BlankStateSystemError from '../../components/BlankState/BlankStateSystemError';
import GeneralFlash from '../../components/Flash/GeneralFlash';
import LoadingSpinner from '../../components/LoadingSpinner';
import MainNavbar from '../../components/Navbar/MainNavbar';
import NoteDialog from '../../components/Note/NoteDialog';
import NoteItem from '../../components/Note/NoteItem';
import NoteCollectionDialog from '../../components/NoteCollection/NoteCollectionDialog';
import NoteCollectionItem from '../../components/NoteCollection/NoteCollectionItem';
import { useGeneralContext } from '../../contexts/general.context';
import { useNoteContext } from '../../contexts/note.context';
import { useNoteCollectionContext } from '../../contexts/noteCollection.context';
import { Note } from '../../types/note.interface';
import { NoteCollection } from '../../types/noteCollection.interface';
import './HomePage.module.css';

const HomePage: React.FC = () => {
  const { loading, setLoading } = useGeneralContext();
  const [expanded, setExpanded] = React.useState<string[]>([]);
  const { notesData, noteCollectionsData } = useGeneralContext();
  const { fetchNotesData, noteDialogIsOpen, openNoteDialog } = useNoteContext();
  const [httpError, setHttpError] = useState(null);

  const {
    fetchNoteCollectionsData,
    noteCollectionDialogIsOpen,
    openNoteCollectionDialog,
  } = useNoteCollectionContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchNotesData();
        await fetchNoteCollectionsData();
        setLoading(false);
      } catch (error) {
        <BlankStateSystemError httpError={error} />;
      }
    };

    fetchData();
  }, []);

  const renderFilteredNoteItems = () =>
    notesData
      .filter((note: Note) => !note.noteCollectionId)
      .map((note: Note) => (
        <TreeView.Item id={note.id} key={note.id}>
          <TreeView.LeadingVisual>
            <NoteIcon size={16} />
          </TreeView.LeadingVisual>
          <NoteItem note={note} />
        </TreeView.Item>
      ));

  const renderFilteredNoteItemTrees = (filteredNotes: Note[]) =>
    filteredNotes.map((note) => (
      <Box
        key={note.id}
        sx={{
          paddingLeft: 3,
          paddingRight: -3,
        }}
      >
        <TreeView.Item id={note.id}>
          <TreeView.LeadingVisual>
            <NoteIcon size={16} />
          </TreeView.LeadingVisual>
          <NoteItem note={note} />
        </TreeView.Item>
      </Box>
    ));

  const renderNoteCollections = () =>
    noteCollectionsData.map((noteCollection: NoteCollection) => {
      const filteredNotes = notesData.filter(
        (note: Note) => note.noteCollectionId === noteCollection.id
      );

      return (
        <TreeView.Item
          id={noteCollection.id}
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
    <>
      {noteDialogIsOpen && <NoteDialog />}
      {noteCollectionDialogIsOpen && <NoteCollectionDialog />}
      <PageLayout containerWidth="full" padding="none">
        <PageLayout.Header>
          <MainNavbar />
          <GeneralFlash />
        </PageLayout.Header>
        <PageLayout.Content padding="normal" width="xlarge">
          {!notesData.length && !noteCollectionsData.length && !loading ? (
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
                          trailingVisual={
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
                          leadingVisual={NoteIcon}
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
                          leadingVisual={FileDirectoryIcon}
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
    </>
  );
};

export default HomePage;
