import { StopIcon } from '@primer/octicons-react';
import { Box, Flash, Link, Text } from '@primer/react';
import React from 'react';

export interface ValidationError {
  key: string;
  title: string;
  ref: React.RefObject<HTMLInputElement>;
}

interface ValidationFlashProps {
  errors: ValidationError[];
}

const ValidationFlash: React.FC<ValidationFlashProps> = ({ errors }) => {
  const handleClick = (inputRef: React.RefObject<HTMLInputElement>) => {
    inputRef.current?.focus();
  };

  return (
    <Flash variant="danger">
      <Box
        sx={{
          display: 'flex',
          alignItems: 'baseline',
          paddingX: 2,
        }}
      >
        <Text
          sx={{
            marginRight: 3,
          }}
        >
          <StopIcon />
        </Text>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
          }}
        >
          <Text
            sx={{
              fontWeight: 'bold',
            }}
          >
            The following inputs have errors:
          </Text>
          <Box>
            {errors.map((error, index) => (
              <React.Fragment key={error.key}>
                <Link
                  onClick={() => handleClick(error.ref)}
                  sx={{
                    cursor: 'pointer',
                    color: 'fg.default',
                    textDecoration: 'underline',
                  }}
                >
                  {error.title}
                </Link>
                {index < errors.length - 1 && ', '}
              </React.Fragment>
            ))}
          </Box>
        </Box>
      </Box>
    </Flash>
  );
};

export default ValidationFlash;
