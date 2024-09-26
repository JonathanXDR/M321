import { KebabHorizontalIcon, SignOutIcon } from '@primer/octicons-react';
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
            }}
          >
            <Text>
              Signed in as
              {/* <Text fontWeight="bold">{user.username}</Text>s */}
            </Text>
          </ActionList.Item>
          {/* <ActionList.Item onSelect={() => alert('Star clicked')}>
            <ActionList.LeadingVisual>
              <StarIcon />
            </ActionList.LeadingVisual>
            Star
            <ActionList.TrailingVisual>⌘S</ActionList.TrailingVisual>
          </ActionList.Item> */}
          {/* <ActionList.Divider /> */}
          <ActionList.Item variant="danger" onSelect={() => logout()}>
            Logout
            <StyledOcticon
              icon={SignOutIcon}
              sx={{
                marginLeft: 2,
              }}
            />
            <ActionList.TrailingVisual>⌘L</ActionList.TrailingVisual>
          </ActionList.Item>
        </ActionList>
      </ActionMenu.Overlay>
    </ActionMenu>
  );
}

export default AccountActionMenu;
