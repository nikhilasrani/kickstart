import factory from '../ethereum/factory';
import 'semantic-ui-css/semantic.min.css';
import { Card, Button, Icon } from 'semantic-ui-react';

const CampaignIndex = ({ campaigns }) => {
    const renderCampaigns = () => {
        const items = campaigns.map((address) => {
            return {
                header: address,
                description: <a>View Campaign</a>,
                fluid: true
            };
        });

        return <Card.Group items={items} />;
    };

    return (
        <div>
            <h3>Open Campaigns</h3>
            {renderCampaigns()}
            <Button icon primary>
                <Icon name="add circle" />
                {'   '}Create Campaign
            </Button>
        </div>
    );
};

CampaignIndex.getInitialProps = async (ctx) => {
    const campaigns = await factory.methods.getDeployedCampaigns().call();
    return { campaigns };
};

export default CampaignIndex;
