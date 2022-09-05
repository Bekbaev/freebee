import React, {useEffect, useState} from 'react';
import Api from "../../api/api";
import Transaction from "./Transaction";

const TransactionHist = () => {
    const [transaction, setTransaction] = useState(null)


    const getTransaction = async () =>{
        const {data} = await Api.transactionRead()
        const filteredData =  data.filter(el => el.receipt != null || el.collection_id != null)
        setTransaction(filteredData)
    }
    useEffect(() => {
        getTransaction()
    }, [])

    return (
        <div>
            <h2>Транзакции</h2>
            {transaction && <Transaction transaction={ transaction } />}
        </div>
    );
};

export default TransactionHist;