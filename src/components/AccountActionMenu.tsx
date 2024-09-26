import {
  KebabHorizontalIcon,
  SignOutIcon,
  StarIcon,
} from '@primer/octicons-react';
import {
  ActionList,
  Text,
  ActionMenu,
  IconButton,
  Avatar,
  StyledOcticon,
  Box,
} from '@primer/react';
import { logout } from '../services/auth.service';
function AccountActionMenu() {
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
            Jonathan Russ
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
                Jonathan Russ
              </Text>
            </Box>
          </ActionList.Item>
          <ActionList.Divider />
          <ActionList.Item variant="danger" onSelect={() => logout()}>
            Logout
            <ActionList.TrailingVisual>⌘L</ActionList.TrailingVisual>
          </ActionList.Item>
        </ActionList>
      </ActionMenu.Overlay>
    </ActionMenu>
  );
}

export default AccountActionMenu;
