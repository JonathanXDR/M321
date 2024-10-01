import {
  Box,
  Flash,
  IconButton,
  Link,
  PageLayout,
  StyledOcticon,
} from '@primer/react';
import { useGeneralContext } from '../../contexts/general.context';
import { XIcon } from '@primer/octicons-react';

const GeneralFlash = () => {
  const {
    notesData,
    noteCollectionsData,
    fetchAllData,
    flashVisible,
    flashIcon,
    flashVariant,
    flashMessage,
    handleFlash,
  } = useGeneralContext();

  return (
    <>
      {flashVisible && (
        <Flash
          variant={flashVariant}
          full
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingY: '20px',
            paddingX: '16px',
          }}
        >
          {flashIcon ? (
            <Box>
              <StyledOcticon icon={flashIcon} />
              {flashMessage}
            </Box>
          ) : (
            flashMessage
          )}
          <IconButton
            variant="invisible"
            aria-label="Close flash"
            icon={XIcon}
            // onClick={() => setError(false)}
          />
        </Flash>
      )}
    </>
  );
};

export default GeneralFlash;
