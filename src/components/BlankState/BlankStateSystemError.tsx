import { AlertIcon, CheckIcon, CopyIcon } from '@primer/octicons-react';
import {
  Box,
  Button,
  Heading,
  IconButton,
  Link,
  Text,
  Tooltip,
  TreeView,
  useDetails,
} from '@primer/react';
import { useState } from 'react';

interface BlankStateSystemErrorProps {
  httpError?: any;
}

function BlankStateSystemError({ httpError }: BlankStateSystemErrorProps) {
  const { open, setOpen } = useDetails({ closeOnOutsideClick: false });
  const [copied, setCopied] = useState<string | null>(null);
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>(
    {}
  );

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(id);
      setTimeout(() => {
        setCopied(null);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleExpansionChange = (id: string, expanded: boolean) => {
    setExpandedItems((prevExpandedItems) => ({
      ...prevExpandedItems,
      [id]: expanded,
    }));
  };

  const renderErrorTree = (key: string, value: any, idPrefix: string = '') => {
    const itemId = `error-${idPrefix}`;

    const renderItem = () => (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          <Text as="pre">{key}: </Text>
          <Text
            as="pre"
            color="danger.fg"
            sx={{
              whiteSpace: 'initial',
              overflowWrap: 'anywhere',
            }}
          >
            {String(value)}
          </Text>
        </Box>
            <Tooltip
              aria-label={copied === idPrefix ? 'Copied!' : 'Copy'}
              direction="w"
              sx={{
                margin: '3px',
                display: 'none',
                alignSelf: 'flex-start',
                animation: 'fade-in 200ms both;',
              }}
            >
          <IconButton
            aria-label="Copy"
            icon={copied === idPrefix ? CheckIcon : CopyIcon}
            onClick={() => copyToClipboard(String(value), idPrefix)}
            sx={{
                  transition: '80ms cubic-bezier(0.33, 1, 0.68, 1)',
                  transitionProperty:
                    'color,background-color,box-shadow,border-color',
                  color: copied === idPrefix ? 'success.fg' : '',
                  borderColor: copied === idPrefix ? 'success.emphasis' : '',
                  boxShadow:
                    copied === idPrefix
                      ? '0 0 0 0.2em rgba(52,208,88,.4)'
                      : 'none',

                  '&:hover': {
                    color: copied === idPrefix ? 'success.fg' : '',
                    borderColor: copied === idPrefix ? 'success.emphasis' : '',

                    '& svg': {
                      fill: copied === idPrefix ? 'success.fg' : '',
                    },
                  },
                }}
              />
        </Tooltip>
      </Box>
    );

    if (typeof value === 'object' && value !== null) {
      return (
        <TreeView.Item
          key={idPrefix}
          id={itemId}
          expanded={expandedItems[itemId] ?? false}
          onExpandedChange={(expanded) =>
            handleExpansionChange(itemId, expanded)
          }
        >
          <Text as="pre">{key}: </Text>
          <TreeView.SubTree>
            {Object.entries(value).map(([subKey, subValue], index) => {
              const newIdPrefix = idPrefix
                ? `${idPrefix}-${index}`
                : `${index}`;
              return renderErrorTree(subKey, subValue, newIdPrefix);
            })}
          </TreeView.SubTree>
        </TreeView.Item>
      );
    } else {
      return (
        <TreeView.Item
          key={idPrefix}
          id={itemId}
          expanded={expandedItems[itemId] ?? false}
          onExpandedChange={(expanded) =>
            handleExpansionChange(itemId, expanded)
          }
        >
          {renderItem()}
        </TreeView.Item>
      );
    }
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
                <Box
                  sx={{
                    maxHeight: '50vh',
                    overflow: 'auto',
                    msOverflowStyle: 'none',
                    scrollbarWidth: 'none',
                    '::-webkit-scrollbar': {
                      display: 'none',
                    },
                  }}
                >
                  <TreeView>{renderErrorTree('Error', httpError)}</TreeView>
                </Box>
              </TreeView.ErrorDialog>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default BlankStateSystemError;
