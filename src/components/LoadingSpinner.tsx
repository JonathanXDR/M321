import { Box, Spinner } from '@primer/react';

function LoadingSpinner() {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Spinner />
    </Box>
  );
}

export default LoadingSpinner;
