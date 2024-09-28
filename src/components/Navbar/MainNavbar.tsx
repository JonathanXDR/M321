import { MarkGithubIcon } from '@primer/octicons-react';
import { Header, StyledOcticon, Text } from '@primer/react';
import AccountActionMenu from '../AccountActionMenu';

const MainNavbar = () => {
  return (
    <Header>
      <Header.Item full>
        <Header.Link href="/">
          <StyledOcticon icon={MarkGithubIcon} size={32} sx={{ mr: 2 }} />
          <Text>GitHub</Text>
        </Header.Link>
      </Header.Item>
      <Header.Item>
        <AccountActionMenu />
      </Header.Item>
    </Header>
  );
};

export default MainNavbar;
