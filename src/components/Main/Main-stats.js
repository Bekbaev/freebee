import React, {useEffect, useMemo, useState} from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import formatPrice from "../../utils/formatPrice";

const MainStats = ({totalSum, commission, currency}) => {
    const [sum, setSum] = useState(0);
    const [com, setCom] = useState(0);
    const [_currency, setCurrency] = useState('');

    useEffect(() => {
        setSum((totalSum));
        setCom((commission));
        setCurrency(currency)
    }, [totalSum, commission, currency]);

    return (
        <div>
            <div>
                <div className="d-flex w-50pr">
                    <div><b>Сумма:&nbsp;</b></div>
                    <div><b>{formatPrice(sum - com)} {_currency}</b></div>
                </div>
                <div className="d-flex w-50pr">
                    <div><b>Комиссия:&nbsp;</b></div>
                    <div><b>{formatPrice(com)} {_currency}</b></div>
                </div>
                <div className="d-flex w-50pr">
                    <div><b>Итого:&nbsp;</b></div>
                    <div><b>{formatPrice(sum)} {_currency}</b></div>
                </div>
            </div>
        </div>
    );
};

export default MainStats;
