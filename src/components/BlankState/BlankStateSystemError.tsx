import { AlertIcon } from '@primer/octicons-react';
import {
  Box,
  Button,
  Heading,
  Link,
  Text,
  useDetails,
  Details,
} from '@primer/react';
import { MarkdownViewer } from '@primer/react/drafts';

interface BlankStateSystemErrorProps {
  httpError?: any;
}

function BlankStateSystemError({ httpError }: BlankStateSystemErrorProps) {
  const { getDetailsProps } = useDetails({ closeOnOutsideClick: true });
  return (
    <Box
      sx={{
        paddingX: ['0px', '10px', '20px', '40px'],
        paddingY: ['0px', '20px', '40px', '80px'],
      }}
    >
      <Box
        className="blankslate blankslate-large"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingY: '128px',
        }}
      >
        <AlertIcon size={64} className="blankslate-icon" />
        <Heading as="h3" className="blankslate-heading">
          There was an error.
        </Heading>
        <Text as="p">
          It seems like there was an error. Please check your internet
          connection and try again.
        </Text>
        <Box className="blankslate-action">
          <Button variant="primary" onClick={() => window.location.reload()}>
            Retry connection
          </Button>
        </Box>
        {httpError && (
          <Box
            className="blankslate-action"
            sx={{
              width: '100%',
            }}
          >
            <Details {...getDetailsProps()}>
              <Link as="summary">Learn more</Link>
              <Text as="pre" sx={{ marginTop: 2 }} color="danger.fg">
                {httpError.message}
              </Text>
            </Details>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default BlankStateSystemError;
