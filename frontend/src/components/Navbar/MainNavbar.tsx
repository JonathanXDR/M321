import { Header } from '@primer/react';
import AccountActionMenu from '../AccountActionMenu';

const MainNavbar = () => {
  return (
    <Header>
      <Header.Item full>
        <Header.Link href="/">Home</Header.Link>
      </Header.Item>
      <Header.Item>
        <AccountActionMenu />
      </Header.Item>
    </Header>
  );
};

export default MainNavbar;
