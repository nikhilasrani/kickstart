import Layout from '../../../../components/Layout';
import { Button, Table } from 'semantic-ui-react';
import LinkTo from '../../../../components/LinkTo';
import Campaign from '../../../../ethereum/campaign';
import RequestRow from '../../../../components/RequestRow';
const RequestIndex = (props) => {
    const { Header, Row, HeaderCell, Body } = Table;

    const renderRow = () => {
        return props.requests.map((request, index) => {
            return (
                <RequestRow
                    key={index}
                    request={request}
                    address={props.address}
                    id={index}
                    approversCount={props.approversCount}
                />
            );
        });
    };
    return (
        <Layout>
            <h3>Requests</h3>
            <LinkTo href={`/campaigns/${props.address}/requests/new`}>
                <Button primary floated="right" style={{ marginBottom: 10 }}>
                    Add Request
                </Button>
            </LinkTo>
            <Table>
                <Header>
                    <Row>
                        <HeaderCell>ID</HeaderCell>
                        <HeaderCell>Description</HeaderCell>
                        <HeaderCell>Amount</HeaderCell>
                        <HeaderCell>Receipient</HeaderCell>
                        <HeaderCell>Approval Count</HeaderCell>
                        <HeaderCell>Approve</HeaderCell>
                        <HeaderCell>Finalize</HeaderCell>
                    </Row>
                </Header>
                <Body>{renderRow()}</Body>
            </Table>
            <div>Found {props.requestCount} requests.</div>
        </Layout>
    );
};

export default RequestIndex;

RequestIndex.getInitialProps = async (props) => {
    const { address } = props.query;
    const campaign = Campaign(address);
    const requestCount = await campaign.methods.getRequestsCount().call();
    const approversCount = await campaign.methods.approversCount().call();

    const requests = await Promise.all(
        Array(parseInt(requestCount))
            .fill()
            .map((element, index) => {
                return campaign.methods.requests(index).call();
            })
    );
    return { address, requests, requestCount, approversCount };
};
