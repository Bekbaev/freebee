import React, {useEffect, useState} from 'react';
import Api from "../../api/api";

const TicketsPrint = ({match}) => {
    const [ticketsArray, setTicketsArray] = useState([])
    const key = match.params.key


    const getTickets = async () => {
        let {data} = await Api.getQrList(key)
        setTicketsArray(data)
    }
    useEffect(() => {
        getTickets()
    }, [])

    return (
        <table>
            {
                ticketsArray
                    ?
                    <tbody>
                    <tr>
                        { ticketsArray.map((el, key) => {
                            return (
                                <td key={el.id} className='qr'>
                                    <img src={el.qr} className='qr-img' alt={'qr'} />
                                    <div className="qr-text">
                                        <div className='qr-text'>#{el.id}-{el.bonus} <br /> {el.description}</div>
                                    </div>
                                </td>
                            );
                        }) }
                    </tr>
                    </tbody>
                    :
                    <p>Загрузка...</p>
            }
        </table>
       /* <div className="qr-wrapper">
            {ticketsArray
                ?
                ticketsArray.map(el =>
                <div className='qr' >
                    <img src={el.qr} className='qr-img' alt={'qr'} />
                        <div className="qr-text">
                            <div className='qr-text'>#{el.id}-{el.bonus} <br /> {el.description}</div>
                        </div>
                </div>
                )
            : <p>Загрузка...</p>
            }
        </div>*/
    );
   /* return (
        <div className="qr-wrapper">
            {ticketsArray
                ?
                <table className='qr-table' cellPadding='5'>
                    <tr>
                        { ticketsArray.map(el =>
                        <td className='qr' >
                            <img src={el.qr} className='qr-img' alt={'qr'} />
                            <div className="qr-text">
                                <div className='qr-text'>#{el.id}-{el.bonus} <br /> {el.description}</div>
                            </div>
                        </td>)}
                    </tr>
                </table>
            : <p>Загрузка...</p>
            }
        </div>
    );*/
};


export default TicketsPrint;
