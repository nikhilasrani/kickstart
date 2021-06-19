import Layout from '../../../../components/Layout';
import { Button } from 'semantic-ui-react';
import LinkTo from '../../../../components/LinkTo';

const RequestIndex = (props) => {
    return (
        <Layout>
            <h3>Requests</h3>
            <LinkTo href={`/campaigns/${props.address}/requests/new`}>
                <Button primary>Add Request</Button>
            </LinkTo>
        </Layout>
    );
};

export default RequestIndex;

RequestIndex.getInitialProps = async (props) => {
    const { address } = props.query;
    return { address };
};
