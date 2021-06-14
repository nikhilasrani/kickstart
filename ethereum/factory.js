import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json'

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0xFD821093753e96329805869fcbD36d90354f5bea'

);

export default instance;
