import React, { useContext, createContext } from 'react';
import { ethers } from 'ethers';
import { useAddress, useContract, useContractWrite, useMetamask } from '@thirdweb-dev/react'

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
    const { contract } = useContract('0x4086B2a1B1A0b638bE0d6702FceE0e19D0f4D4C4');
    const { mutateAsync: createSupport } = useContractWrite(contract, 'createSupport');

    const address = useAddress();
    const connect = useMetamask();

    const publishSupport = async (form) => {
        try {
            const data = await createSupport([
                address,
                form.title, //title
                form.description,// description
                form.target,
                new Date(form.deadline).getTime(), //deadline
                form.image,
            ])
            console.log('Contract call success', data)
        } catch (error) {
            console.log('Contract call failure', error)
        }

    }

    const getSupports = async () => {
        const supports = await contract.call('getSupports');

        const parsedSupport = supports.map((support, i) => ({
            owner: support.owner,
            title: support.title,
            description: support.description,
            target: ethers.utils.formatEther(support.target.toString()),
            deadline: support.deadline.toNumber(),
            amountCollected: ethers.utils.formatEther(support.amountCollected.toString()),
            image: support.image,
            pId: i
        }))
        return parsedSupport;
        // console.log(parsedSupport);
    }

    const getUserSupports = async () => {
        const allsupport = await getSupports();

        const filteredSupports = allsupport.filter((support) => support.owner === address);

        return filteredSupports;
    }

    const donate = async (pId, amount) => {
        const data = await contract.call('donateToSupport', pId, { value: ethers.utils.parseEther(amount) });

        return data
    }

    const getDonation = async (pId) => {
        const donations = await contract.call('getDonators', pId);
        const numberOfDonations = donations[0].length;

        const parsedDonation = [];

        for (let i = 0; i < numberOfDonations; i++) {
            parsedDonation.push({
                donator: donations[0][i],
                donation: ethers.utils.formatEther(donations[1][i].toString())
            })
        }

        return parsedDonation
    }

    return (
        <StateContext.Provider
            value={{
                address,
                contract,
                connect,
                createSupport: publishSupport,
                getSupports,
                getUserSupports,
                getDonation,
                donate,
            }}
        >
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);