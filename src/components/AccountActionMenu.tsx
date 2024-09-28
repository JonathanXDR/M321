import { useEffect, useState } from 'react';
import { ActionList, Text, ActionMenu, Avatar, Box, Link } from '@primer/react';
import { logout } from '../services/auth.service';
import { users } from '../services/http.service';
import { User } from '../types/user.interface';
import LoadingSpinner from './LoadingSpinner';

function AccountActionMenu() {
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

  if (!currentUser) {
    return <LoadingSpinner />;
  }

  return (
    <ActionMenu>
      <ActionMenu.Anchor>
        <Box
          sx={{
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Text
            sx={{
              marginRight: 3,
              fontWeight: 'bold',
              color: 'fg.default',
            }}
          >
            {currentUser?.firstName} {currentUser?.lastName}
          </Text>
          <Avatar
            src="https://github.com/octocat.png"
            alt="@octocat"
            size={32}
          />
        </Box>
      </ActionMenu.Anchor>

      <ActionMenu.Overlay>
        <ActionList>
          <ActionList.Item
            disabled
            sx={{
              cursor: 'default !important',
              color: 'fg.default !important',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
              }}
            >
              <Text
                sx={{
                  marginRight: 1,
                }}
              >
                Signed in as
              </Text>
              <Text
                sx={{
                  fontWeight: 'bold',
                }}
              >
                {currentUser?.username}
              </Text>
            </Box>
          </ActionList.Item>
          <ActionList.Divider />
          <ActionList.Item
            as={Link}
            href="/settings"
            sx={{
              textDecoration: 'none !important',
            }}
          >
            Settings
          </ActionList.Item>
          {/* <ActionList.Divider /> */}
          <ActionList.Item variant="danger" onSelect={() => logout()}>
            Logout
            {/* <ActionList.TrailingVisual>⌘L</ActionList.TrailingVisual> */}
          </ActionList.Item>
        </ActionList>
      </ActionMenu.Overlay>
    </ActionMenu>
  );
}

export default AccountActionMenu;
