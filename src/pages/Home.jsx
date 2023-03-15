import React, { useState, useEffect } from 'react';
import { DisplaySupport } from '../components'
import { useStateContext } from '../context';


const Home = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [supports, setSupports] = useState([]);

    const { address, contract, getSupports } = useStateContext();

    const fetchSupport = async () => {
        setIsLoading(true);
        const data = await getSupports();
        setSupports(data);
        setIsLoading(false);
    }

    useEffect(() => {
        if (contract) fetchSupport();
    }, [address, contract]);

    return (
        <DisplaySupport
            title="All Support"
            isLoading={isLoading}
            supports={supports}
        />
    )
}

export default Home