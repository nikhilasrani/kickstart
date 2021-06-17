import { Menu } from 'semantic-ui-react';
import LinkTo from './LinkTo';

const Header = () => {
    return (
        <Menu style={{ marginTop: 10 }}>
            <LinkTo href="/" className="item">
                CrowdCoin
            </LinkTo>
            <Menu.Menu position="right">
                <LinkTo href="/" className="item">
                    Campaigns
                </LinkTo>
                <LinkTo href="/campaigns/new" className="item">
                    +
                </LinkTo>
            </Menu.Menu>
        </Menu>
    );
};

export default Header;
