import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Avatar,
  Box,
  Button,
  Dialog,
  Flash,
  FormControl,
  Header,
  Heading,
  IconButton,
  Link,
  PageLayout,
  Pagehead,
  StyledOcticon,
  Text,
  TextInput,
} from '@primer/react';
import { AlertIcon, MarkGithubIcon, XIcon } from '@primer/octicons-react';
import { User } from '../../types/user.interface';
import { handleLoginSubmit, handleCheckToken } from '../../utils/auth.util';
import { users } from '../../services/http.service';
import LoadingSpinner from '../../components/LoadingSpinner';
import AccountActionMenu from '../../components/AccountActionMenu';
import './SettingsPage.module.css';
import MainNavbar from '../../components/Navbar/MainNavbar';

const SettingsPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await users.getCurrent();
        setCurrentUser(response.data);
      } catch (error) {
        console.log('Error fetching current user:', error);
      }
    };

    fetchCurrentUser();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await handleLoginSubmit(username, password, navigate);
    setError(result.error);
  };

  if (loading && !currentUser) {
    return <LoadingSpinner />;
  }

  return (
    <PageLayout containerWidth="full" padding="none">
      <PageLayout.Header
        sx={{
          padding: '0 !important',
          margin: '0 !important',
        }}
      >
        <MainNavbar />
        <Flash
          full
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingY: '20px',
            paddingX: '16px',
          }}
        >
          Password changed successfully.
          <IconButton
            variant="invisible"
            aria-label="Close flash"
            icon={XIcon}
            onClick={() => setError(false)}
          />
        </Flash>
      </PageLayout.Header>
      <PageLayout.Content padding="normal" width="xlarge">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 1,
            marginBottom: 4,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: [2, 0],
            }}
          >
            <Avatar
              src="https://github.com/octocat.png"
              alt="@octocat"
              size={48}
              sx={{
                marginRight: 3,
              }}
            />
            <Box
              sx={{
                flex: 'auto',
              }}
            >
              <Heading
                as="h3"
                sx={{
                  fontSize: '20px',
                  lineHeight: '1.25',
                }}
              >
                <Text
                  sx={{
                    color: 'fg.default',
                  }}
                >
                  {currentUser?.firstname} {currentUser?.lastname}{' '}
                  <Text
                    sx={{
                      color: 'fg.muted',
                    }}
                  >
                    ({currentUser?.username})
                  </Text>
                </Text>
              </Heading>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                }}
              >
                <Text
                  sx={{
                    color: 'fg.muted',
                    marginBottom: 0,
                    marginRight: 3,
                  }}
                >
                  Your personal account
                </Text>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box>
          <Pagehead
            as="h2"
            sx={{
              padding: 0,
              margin: 0,
              fontWeight: '400',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 3,
              paddingBottom: 2,
            }}
          >
            Change username
          </Pagehead>
          <Button>Change username</Button>
          <Dialog isOpen={false}>
            <Dialog.Header>Really change your username?</Dialog.Header>
            <Flash
              variant="danger"
              full
              sx={{
                paddingY: '20px',
                paddingX: '16px',
              }}
            >
              <StyledOcticon icon={AlertIcon} />
              Unexpected bad things will happen if you don’t read this!
            </Flash>
            <Box
              sx={{
                padding: 3,
              }}
            >
              <ul className="mb-3 ml-3">
                <li>
                  We <strong>will not</strong> set up redirects for your old
                  profile page.
                </li>
                <li>
                  We <strong>will not</strong> set up redirects for Pages sites.
                </li>
                <li>
                  We <strong>will</strong> create redirects for your
                  repositories (web and git access).
                </li>
                <li>Renaming may take a few minutes to complete.</li>
              </ul>
              <Button variant="danger" block>
                I understand, let’s change my username
              </Button>
            </Box>
          </Dialog>
        </Box>
        <Box>
          <Pagehead
            as="h2"
            sx={{
              padding: 0,
              margin: 0,
              fontWeight: '400',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: '40px',
              marginBottom: 3,
              paddingBottom: 2,
            }}
          >
            Change password
          </Pagehead>

          <Flash
            variant="warning"
            sx={{
              paddingY: '20px',
              paddingX: '16px',
            }}
          >
            Old password isn't valid
          </Flash>

          <Box as={'form'} onSubmit={handleSubmit}>
            <FormControl
              sx={{
                marginY: '15px',
              }}
            >
              <FormControl.Label
                sx={{
                  marginBottom: '6px',
                }}
              >
                Old password
              </FormControl.Label>
              <TextInput
                type="text"
                // loading={true}
                // validationStatus="error"
                onChange={(e) => setUsername(e.target.value)}
                sx={{
                  width: '100%',
                  paddingY: '5px',
                }}
              />
            </FormControl>
            <FormControl
              sx={{
                marginY: '15px',
              }}
            >
              <FormControl.Label
                sx={{
                  marginBottom: '6px',
                }}
              >
                New password
              </FormControl.Label>
              <TextInput
                type="text"
                // validationStatus="error"
                onChange={(e) => setPassword(e.target.value)}
                sx={{
                  width: '100%',
                  paddingY: '5px',
                }}
              />
            </FormControl>
            <FormControl
              sx={{
                marginY: '15px',
              }}
            >
              <FormControl.Label
                sx={{
                  marginBottom: '6px',
                }}
              >
                Confirm new password
              </FormControl.Label>
              <TextInput
                type="password"
                // validationStatus="error"
                onChange={(e) => setConfirmPassword(e.target.value)}
                sx={{
                  width: '100%',
                  paddingY: '5px',
                }}
              />
            </FormControl>

            <Text
              sx={{
                color: 'fg.muted',
                fontSize: '12px',
              }}
            >
              Make sure it's at least 15 characters OR at least 8 characters
              including a number and a lowercase letter.{' '}
              <Link href="https://docs.github.com/articles/creating-a-strong-password">
                Learn more
              </Link>
              .
            </Text>
            <FormControl
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Button
                sx={{
                  marginRight: 2,
                }}
              >
                Update password
              </Button>
              <Link href="/password_reset">I forgot my password</Link>
            </FormControl>
          </Box>
        </Box>
        <Box>
          <Pagehead
            as="h2"
            sx={{
              padding: 0,
              margin: 0,
              color: 'danger.fg',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: '40px',
              marginBottom: 3,
              paddingBottom: 2,
            }}
          >
            Delete account
          </Pagehead>
          <Text as="p">
            Once you delete your account, there is no going back. Please be
            certain.
          </Text>
          <Button variant="danger">Delete your account</Button>
          <Dialog isOpen={false}>
            <Dialog.Header>Are you sure you want to do this?</Dialog.Header>
            <Flash
              variant="danger"
              full
              sx={{
                paddingY: '20px',
                paddingX: '16px',
              }}
            >
              <StyledOcticon icon={AlertIcon} />
              This is extremely important.
            </Flash>
            <Box
              sx={{
                padding: 3,
              }}
            >
              <Text as="p">
                We will{' '}
                <strong>immediately delete all of your repositories (0)</strong>
                , along with all of your forks, wikis, issues, pull requests,
                and GitHub Pages sites.
              </Text>
              <Text as="p">
                You will no longer be billed, and after 90 days your username
                will be available to anyone on GitHub.
              </Text>
              <Text as="p">
                For more help, read our article "
                <Link href="https://docs.github.com/articles/deleting-your-user-account">
                  Deleting your user account
                </Link>
                ".
              </Text>
              <hr></hr>
              <Box as={'form'} onSubmit={handleSubmit}>
                <FormControl
                  sx={{
                    marginY: '15px',
                  }}
                >
                  <FormControl.Label>Your username:</FormControl.Label>
                  <TextInput
                    type="text"
                    // loading={true}
                    // validationStatus="error"
                    onChange={(e) => setUsername(e.target.value)}
                    sx={{
                      width: '100%',
                      paddingY: '5px',
                    }}
                  />
                </FormControl>
                <FormControl
                  sx={{
                    marginY: '15px',
                  }}
                >
                  <FormControl.Label>
                    To verify, type{' '}
                    <Text
                      sx={{
                        fontStyle: 'italic',
                        fontWeight: '400',
                      }}
                    >
                      delete my account
                    </Text>{' '}
                    below:
                  </FormControl.Label>
                  <TextInput
                    type="text"
                    // validationStatus="error"
                    onChange={(e) => setPassword(e.target.value)}
                    sx={{
                      width: '100%',
                      paddingY: '5px',
                    }}
                  />
                </FormControl>
                <FormControl
                  sx={{
                    marginY: '15px',
                  }}
                >
                  <FormControl.Label>Confirm your password:</FormControl.Label>
                  <TextInput
                    type="password"
                    // validationStatus="error"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    sx={{
                      width: '100%',
                      paddingY: '5px',
                    }}
                  />
                </FormControl>

                <FormControl>
                  <Button variant="danger" block>
                    Delete this account
                  </Button>
                </FormControl>
              </Box>
            </Box>
          </Dialog>
        </Box>
      </PageLayout.Content>

      <PageLayout.Footer
        sx={{
          maxWidth: 1012,
          marginRight: 'auto',
          marginLeft: 'auto',

          paddingX: [16, 40, 40, 16],
          paddingY: 6,
          marginTop: 6,
          fontSize: '12px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Box
            sx={{
              marginRight: 3,
            }}
          >
            <Link href="/site/terms">Terms</Link>
          </Box>
          <Box
            sx={{
              marginRight: 3,
            }}
          >
            <Link href="/site/privacy">Privacy</Link>
          </Box>
          <Box
            sx={{
              marginRight: 3,
            }}
          >
            <Link href="/security">Security</Link>
          </Box>
          <Box>
            <Link
              sx={{
                color: 'fg.muted',
                '&:hover': {
                  color: 'accent.fg',
                },
              }}
              href="https://github.com/contact"
            >
              Contact GitHub
            </Link>
          </Box>
        </Box>
      </PageLayout.Footer>
    </PageLayout>
  );
};

export default SettingsPage;
