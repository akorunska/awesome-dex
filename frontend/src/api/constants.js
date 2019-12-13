import { client } from 'ontology-dapi';


client.registerClient({});
export const getOntologyAccount = async () => {
  try {
    await client.api.provider.getProvider();
    return await client.api.asset.getAccount();
  } catch (e) {
    console.log(e)
    return ""
  }
}

export const ontologyExchangeContractSellOnt = "4d7599e77c878f9655ee97e0a9434c4a642f9714";
export const ethereumExchangeContractSellOnt = "";

// export const ontologyExchangeContractSellEth = "";
// export const ethereumExchangeContractSellEth = "";
