import { AlertIcon } from '@primer/octicons-react';
import {
  Box,
  Button,
  Heading,
  Link,
  Text,
  TreeView,
  useDetails,
} from '@primer/react';

interface BlankStateSystemErrorProps {
  httpError?: any;
}

function truncateToken(token: string, maxLength: number) {
  if (token.length > maxLength) {
    return token.slice(0, maxLength) + '...';
  }
  return token;
}

function getValue(key: string, error: any) {
  const keys = key.split('.');
  let value = error;
  keys.forEach((k) => {
    value = value && value[k];
  });
  if (key === 'config.headers.Authorization' && value) {
    return truncateToken(value, 100);
  }
  return value;
}

function BlankStateSystemError({ httpError }: BlankStateSystemErrorProps) {
  const { open, setOpen } = useDetails({ closeOnOutsideClick: false });

  const errorList = [
    { label: 'Message', key: 'message' },
    { label: 'Code', key: 'code' },
    { label: 'Stack', key: 'stack' },
    { label: 'Method', key: 'config.method' },
    { label: 'Headers', key: 'config.headers' },
    { label: 'Base URL', key: 'config.baseURL' },
    { label: 'URL', key: 'config.url' },
  ];

  const renderErrorTree = () => {
    return (
      <TreeView>
        {errorList.map((errorItem) => {
          const value = getValue(errorItem.key, httpError);
          if (!value) return null;

          const isExpandable = typeof value === 'object' || value.length > 50;

          return (
            <TreeView.Item
              key={errorItem.key}
              id={errorItem.key}
              expanded={isExpandable}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                }}
              >
                <Text as="pre">{errorItem.label}: </Text>
                {isExpandable ? (
                  <TreeView.SubTree>
                    <TreeView.Item id={`${errorItem.key}-value`}>
                      <Text as="pre" color="danger.fg">
                        {value}
                      </Text>
                    </TreeView.Item>
                  </TreeView.SubTree>
                ) : (
                  <Text as="pre" color="danger.fg">
                    {value}
                  </Text>
                )}
              </Box>
            </TreeView.Item>
          );
        })}
      </TreeView>
    );
  };

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
          <Box className="blankslate-action">
            <Link
              onClick={() => setOpen(!open)}
              sx={{
                cursor: 'pointer',
              }}
            >
              Learn more
            </Link>
            {open && (
              <TreeView.ErrorDialog
                title="Error Details"
                onRetry={() => window.location.reload()}
                onDismiss={() => setOpen(false)}
              >
                {renderErrorTree()}
              </TreeView.ErrorDialog>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default BlankStateSystemError;
