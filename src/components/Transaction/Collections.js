import React, {useEffect, useState} from 'react';
import Api from "../../api/api";
import Transaction from "./Transaction";

const Collections = ({match}) => {
    const [managers, setManagers] = useState(false)
    const [info, setInfo] = useState(false)

    const id = match.params.id

    const getManagers = async () => {
        let {data} = await Api.receiptCollections()
        const filteredArray = data.filter(el => el.id == id)[0]
        setInfo(filteredArray)
        setManagers(filteredArray.transactions)
    }
    useEffect(() => {
        getManagers()
    }, [])

    return (
        <div>
            <h2>Транзакции</h2>
            {info && <img width={200} height={300} src={info.receipt} alt=""/>}

            {managers && <Transaction transaction={ managers }  />}
        </div>
    );
};

export default Collections;