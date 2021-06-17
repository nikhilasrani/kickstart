import factory from '../ethereum/factory';
import { Card, Button, Icon } from 'semantic-ui-react';
import Layout from '../components/Layout';
import LinkTo from '../components/LinkTo';

const CampaignIndex = ({ campaigns }) => {
    const renderCampaigns = () => {
        const items = campaigns.map((address) => {
            return {
                header: address,
                description: <LinkTo href={`/campaigns/${address}`}>View Campaign</LinkTo>,
                fluid: true
            };
        });

        return <Card.Group items={items} />;
    };

    return (
        <div>
            <Layout>
                <h3>Open Campaigns</h3>
                <LinkTo href="/campaigns/new">
                    <Button icon primary floated="right">
                        <Icon name="add circle" />
                        {'   '}Create Campaign
                    </Button>
                </LinkTo>
                {renderCampaigns()}
            </Layout>
        </div>
    );
};

CampaignIndex.getInitialProps = async () => {
    const campaigns = await factory.methods.getDeployedCampaigns().call();
    return { campaigns };
};

export default CampaignIndex;
