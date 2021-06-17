import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0x57562E2479BcaF674b5eaeCac98c369A12C1d255'
);

export default instance;
