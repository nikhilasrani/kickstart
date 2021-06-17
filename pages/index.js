import factory from '../ethereum/factory';
import { Card, Button, Icon } from 'semantic-ui-react';
import Layout from '../components/Layout';

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
            <Layout>
                <h3>Open Campaigns</h3>
                <Button icon primary floated="right">
                    <Icon name="add circle" />
                    {'   '}Create Campaign
                </Button>
                {renderCampaigns()}
            </Layout>
        </div>
    );
};

CampaignIndex.getInitialProps = async (ctx) => {
    const campaigns = await factory.methods.getDeployedCampaigns().call();
    return { campaigns };
};

export default CampaignIndex;
