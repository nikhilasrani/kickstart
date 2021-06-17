import { useState } from 'react';
import { Form, Input, Message, Button } from 'semantic-ui-react';
import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';
import { useRouter } from 'next/router';

const ContributeForm = (props) => {
    const [value, setValue] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const onSubmit = async (event) => {
        event.preventDefault();
        const campaign = Campaign(props.address);
        setErrorMessage('');
        setLoading(true);
        try {
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.contribute().send({
                from: accounts[0],
                value: web3.utils.toWei(value, 'ether')
            });

            router.replace(`/campaigns/${props.address}`);
            setErrorMessage('');
        } catch (err) {
            setErrorMessage(err.message);
        }
        setLoading(false);
    };
    return (
        <Form onSubmit={onSubmit} error={!!errorMessage}>
            <Form.Field>
                <p>Amount to Contribute</p>
                <Input
                    label="ether"
                    labelPosition="right"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
            </Form.Field>
            <Message error header="Oops!" content={errorMessage} />
            <Button primary loading={loading}>
                Contribute
            </Button>
        </Form>
    );
};

export default ContributeForm;
