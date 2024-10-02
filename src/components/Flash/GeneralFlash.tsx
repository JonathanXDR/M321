import { Box, Flash, IconButton, StyledOcticon } from '@primer/react';
import { useGeneralContext } from '../../contexts/general.context';
import { AlertIcon, CheckIcon, XIcon } from '@primer/octicons-react';

const GeneralFlash = () => {
  const { flashVisible, setFlashVisible, flashVariant, flashMessage } =
    useGeneralContext();

  const renderFlashContent = () => {
    const iconMap = {
      default: null,
      success: CheckIcon,
      danger: XIcon,
      warning: AlertIcon,
    };

    const Icon = iconMap[flashVariant];

    return (
      <Box>
        {Icon && <StyledOcticon icon={Icon} />}
        {flashMessage}
      </Box>
    );
  };

  return (
    <>
      {flashVisible ? (
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
          {renderFlashContent()}
          <IconButton
            variant="invisible"
            aria-label="Close flash"
            icon={XIcon}
            onClick={() => setFlashVisible(false)}
          />
        </Flash>
      ) : null}
    </>
  );
};

export default GeneralFlash;
