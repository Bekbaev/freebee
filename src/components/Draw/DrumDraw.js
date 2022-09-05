import React, {useEffect, useState} from 'react';
import Api from "../../api/api";
import Drum from "../Drum";

const DrumDraw = ({match}) => {
    const [drumShow, setDrumShow] = useState(true)
    const [winners, setWinners] = useState(null)
    const [winnersTable, setWinnersTable] = useState(false)
    const [winnersLength, setWinnersLength] = useState(null)
    const id = match.params.id
    const type = match.params.type

    const getWinners = async () => {
        const formData = new FormData();
        formData.append('id', id);
        await Api.drawStart(formData);
        const {data} = await Api.drawRead(type, id)
        const prizes = data[0].prizes
        setWinners(prizes)
        setWinnersLength(prizes.length)
    }

    const drum_start = () =>{
        setDrumShow(true)
        setTimeout(() => {
            setDrumShow(false)
        }, 5000)
    }

    useEffect(() => {
        getWinners()
        drum_start()
    }, [])

    return (
        <div>
            {
                drumShow
                    ? <Drum />
                    // :  !winnersTable
                    //     ? <Winner setWinnersLength={setWinnersLength} winnersLength={winnersLength} setWinnersTable={setWinnersTable} winners={winners} drum_start={drum_start}/>
                    //     : <WinnerList winners={winners}/>
                    : <WinnerList winners={winners}/>
            }
        </div>
    );
};

const Winner = ({setWinnersTable, winners, drum_start, winnersLength, setWinnersLength}) => {
    winnersLength = winnersLength - 1
    const next_winner = () => {
        drum_start()
        setWinnersLength(prevstate => prevstate - 1)
    }

    return(
        <div className="winner-container">
            <div className="winner_wrapper">
                <div className="winner">#{winnersLength + 1} {winners[winnersLength].winner_phone} {winners[winnersLength].winner_name}</div>
                <div className="winner_button-wrapper">
                    <div className="winner_button" onClick={() => setWinnersTable(true)}>Полный список</div>
                    {winnersLength >= 1 &&
                        <div className="winner_button" onClick={ next_winner }>Следущий победитель</div>
                    }
                </div>
            </div>

        </div>
    )
}

const WinnerList = ({winners}) => {
    return (
        // <div className="winnerTable">
        //     <table className="table">
        //         <thead className="winnerTable_head ">
        //         <tr>
        //             <th scope="col">#</th>
        //             <th scope="col">Приз</th>
        //             <th scope="col">Имя</th>
        //             <th scope="col">id победителя</th>
        //         </tr>
        //         </thead>
        //         <tbody>
        //             {
        //                 winners && winners.map((el, index) => {
        //                     return (
        //                         <tr>
        //                             <th scope="row">{index + 1}</th>
        //                             <th>{el.prize_name}</th>
        //                             <th>{el.winner_name}</th>
        //                             <th>{el.winner_id}</th>
        //                         </tr>
        //                     )
        //                 })
        //             }
        //         </tbody>
        //     </table>
        // </div>
        <div className="allPrize-container">
            <div className="allPrize">
                 {
                     winners && winners.map((el, index) => {
                         return (
                             // <tr>
                             //     <th scope="row">{index + 1}</th>
                             //     <th>{el.prize_name}</th>
                             //     <th>{el.winner_name}</th>
                             //     <th>{el.winner_id}</th>
                             // </tr>
                         <div className="pizeWrap">
                             <div className="prize">#{index + 1}. {el.prize_name}</div>
                             <p className="prizeWinner"> {el.winner_phone}, {el.winner_name}</p>
                         </div>
                         )
                     })
                 }

            </div>
        </div>
    );
};


export default DrumDraw;