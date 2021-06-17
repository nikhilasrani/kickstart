import factory from '../ethereum/factory';
import 'semantic-ui-css/semantic.min.css';
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
                {renderCampaigns()}
                <Button icon primary>
                    <Icon name="add circle" />
                    {'   '}Create Campaign
                </Button>
            </Layout>
        </div>
    );
};

CampaignIndex.getInitialProps = async (ctx) => {
    const campaigns = await factory.methods.getDeployedCampaigns().call();
    return { campaigns };
};

export default CampaignIndex;
