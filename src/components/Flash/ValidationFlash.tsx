import { StopIcon } from '@primer/octicons-react';
import { Box, Flash, Link, Text } from '@primer/react';
import React from 'react';

export interface ValidationField {
  key: string;
  title: string;
  ref: React.RefObject<HTMLInputElement>;
}

interface ValidationFlashProps {
  fields: ValidationField[];
}

const ValidationFlash: React.FC<ValidationFlashProps> = ({ fields }) => {
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
            {fields.map((field, index) => (
              <React.Fragment key={field.key}>
                <Link
                  onClick={() => handleClick(field.ref)}
                  sx={{
                    cursor: 'pointer',
                    color: 'fg.default',
                    textDecoration: 'underline',
                  }}
                >
                  {field.title}
                </Link>
                {index < fields.length - 1 && ', '}
              </React.Fragment>
            ))}
          </Box>
        </Box>
      </Box>
    </Flash>
  );
};

export default ValidationFlash;
