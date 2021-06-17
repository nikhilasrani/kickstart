import Layout from '../../components/Layout';
import { useRouter } from 'next/router';
import Campaign from '../../ethereum/campaign';
import { Card, Grid, GridColumn } from 'semantic-ui-react';
import web3 from '../../ethereum/web3';
import ContributeForm from '../../components/ContributeForm';

const CampaignShow = (props) => {
    const router = useRouter();
    const { address } = router.query;

    const renderCards = () => {
        const { balance, manager, minimumContribution, requestsCount, approversCount } = props;

        const items = [
            {
                header: manager,
                meta: 'Address of Manager',
                description: 'The manager created this campaign and can create requests',
                style: { overflowWrap: 'break-word' }
            },
            {
                header: minimumContribution,
                meta: 'Minimum Contribution (wei)',
                description: 'You must contribute atleast this much wei to become an approver'
            },
            {
                header: requestsCount,
                meta: 'Number of Requests',
                description:
                    'A request tries to withdraw money from the contract. Requests must be approved by approvers'
            },
            {
                header: approversCount,
                meta: 'Number of Approvers',
                description: 'Number of people who have already donated to the campaign'
            },
            {
                header: web3.utils.fromWei(balance, 'ether'),
                meta: 'Campaign Balance (ether)',
                description: 'The balance is how much money this campaign has left to spend'
            }
        ];

        return <Card.Group items={items} />;
    };
    return (
        <Layout>
            <h2>Campaign Details</h2>
            <p>{address}</p>
            <Grid>
                <GridColumn width={10}>{renderCards()}</GridColumn>
                <GridColumn width={6}>
                    <ContributeForm address={address} />
                </GridColumn>
            </Grid>
        </Layout>
    );
};

export default CampaignShow;

CampaignShow.getInitialProps = async (props) => {
    const campaign = Campaign(props.query.address);

    const summary = await campaign.methods.getSummary().call();

    console.log(summary);
    return {
        address: props.query.address,
        minimumContribution: summary[0],
        balance: summary[1],
        requestsCount: summary[2],
        approversCount: summary[3],
        manager: summary[4]
    };
};
