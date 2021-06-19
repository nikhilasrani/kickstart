import { useState } from 'react';
import Layout from '../../../../components/Layout';
import { Form, Button, Message, Input } from 'semantic-ui-react';
import Campaign from '../../../../ethereum/campaign';
import web3 from '../../../../ethereum/web3';
import LinkTo from '../../../../components/LinkTo';
import { useRouter } from 'next/router';

const NewRequest = (props) => {
    const [value, setValue] = useState('');
    const [description, setDescription] = useState('');
    const [receipient, setReceipient] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const onSubmit = async (event) => {
        event.preventDefault();
        setErrorMessage('');
        setLoading(true);
        try {
            const accounts = await web3.eth.getAccounts();
            const campaign = Campaign(props.address);
            await campaign.methods
                .createRequest(description, web3.utils.toWei(value, 'ether'), receipient)
                .send({ from: accounts[0] });

            router.push(`/campaigns/${props.address}/requests`);
        } catch (err) {
            setErrorMessage(err.message);
        }
        setLoading(false);
    };
    return (
        <Layout>
            <LinkTo href={`/campaigns/${props.address}/requests`}>Back</LinkTo>
            <h3>Create a Request</h3>
            <Form onSubmit={onSubmit} error={!!errorMessage}>
                <Form.Field>
                    <p>Description</p>
                    <Input value={description} onChange={(e) => setDescription(e.target.value)} />
                </Form.Field>
                <Form.Field>
                    <p>Value in Ether</p>
                    <Input value={value} onChange={(e) => setValue(e.target.value)} />
                </Form.Field>
                <Form.Field>
                    <p>Receipient</p>
                    <Input value={receipient} onChange={(e) => setReceipient(e.target.value)} />
                </Form.Field>
                <Message error header="Oops!" content={errorMessage} />
                <Button primary loading={loading}>
                    Create
                </Button>
            </Form>
        </Layout>
    );
};

export default NewRequest;

NewRequest.getInitialProps = async (props) => {
    const { address } = props.query;
    return { address };
};
