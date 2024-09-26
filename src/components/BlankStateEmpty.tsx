import { Box, Button, Heading, Link, Text } from '@primer/react';

function BlankStateEmpty() {
  return (
    <Box
      className="blankslate blankslate-large blankslate-spacious"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <img
        src="https://ghicons.github.com/assets/images/blue/svg/Collection.svg"
        alt=""
        className="blankslate-image"
      />
      <Heading as="h3" className="blankslate-heading">
        It looks like your library is empty.
      </Heading>
      <Text as="p">
        Notes and NoteCollections are a great way to organize your thoughts,
        ideas, and important information. Start creating and managing your
        library today!
      </Text>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-end',
          flexWrap: 'wrap',
        }}
      >
        <Box className="blankslate-action">
          <Button
            variant="primary"
            sx={{
              marginRight: 3,
            }}
          >
            Create a new note
          </Button>
        </Box>
        <Box
          className="blankslate-action"
          sx={{
            marginBottom: '0 !important',
          }}
        >
          <Button variant="default">Create a new NoteCollection</Button>
        </Box>
      </Box>
    </Box>
  );
}

export default BlankStateEmpty;
