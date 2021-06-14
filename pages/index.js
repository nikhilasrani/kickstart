import {useState, useEffect} from 'react'
import factory from '../ethereum/factory';


const CampaignIndex = () => {
    const [campaigns, setCampaigns] = useState([]);
    useEffect(()=> {
        const getDeployedCampaigns = async () => {
            const campaigns = await factory.methods.getDeployedCampaigns().call();
            setCampaigns(campaigns)
        }
         if(process.browser) getDeployedCampaigns();
    },[])

    console.log(campaigns)
    return <h1>Index page</h1>
};


export default CampaignIndex
