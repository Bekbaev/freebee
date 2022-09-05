import React, {useEffect, useState} from 'react';
import Api from "../../api/api";
import Drum from "../Drum";
import Animate from 'animate.css-react'
import 'animate.css/animate.css'

const DrawTable = ({match}) => {
    const [drumShow, setDrumShow] = useState(true)
    const [winners, setWinners] = useState(null)
    const [winnersTable, setWinnersTable] = useState(false)
    const [winnersLength, setWinnersLength] = useState(null)
    const [currentWinner, setCurrentWinner] = useState(null)
    const id = match.params.id
    const type = match.params.type

    const getWinners = async () => {
        const formData = new FormData();
        formData.append('id', id);
        await Api.drawStart(formData);
        const {data} = await Api.drawRead(type, id);
        console.log(data);
        const prizes = data[0].prizes
        prizes.forEach(el => el.open = false)
        console.log(prizes);
        setWinners(prizes)
        setWinnersLength(prizes.length)
    }

    const drum_start = () => {
        setDrumShow(true)
        setTimeout(() => {
            setDrumShow(false)
        }, 5000)
    }

    useEffect(() => {
        //getWinners()
        drum_start()
    }, [])

    return (
        <div className="gif-wrapper">
            {
                drumShow
                    ? <Drum/>
                    : !winnersTable
                    ? <UsersTable setWinnersLength={setWinnersLength} winnersLength={winnersLength}
                                  setCurrentWinner={setCurrentWinner}
                                  setWinnersTable={setWinnersTable} winners={winners} drum_start={drum_start}/>
                    : <WinnerPage currentWinner={currentWinner} setWinnersTable={setWinnersTable}/>
            }
        </div>
    );
};

const UsersTable = ({winners, setCurrentWinner, setWinnersTable, drum_start}) => {
    const ChangeCurrentWinner = (id) => {
        const currentWinner = winners.filter(el => el.id == id)[0]
        drum_start()
        winners.forEach(el => {
            if (el.id == id) {
                el.open = true
            }
        })
        setCurrentWinner(currentWinner)
        setWinnersTable(true)
    }

    return (
        <div className="allPrize-container">
            <div className="allPrize">
                {winners.map((el, idx) => {
                        let winner_phone = el.winner_phone

                        winner_phone = winner_phone.split('').slice(-4).join('')

                        return (
                            <div key={el.id} className="pizeWrap">
                                <div className="prize">{idx + 1}. {el.prize_name}</div>
                                {el.open
                                    ? <p className="prizeWinner">{el.winner_name}, <br/> {'+7 (***) *** ' + winner_phone}</p>
                                    : <div className="winner_button" onClick={e => ChangeCurrentWinner(el.id)}>Выбрать</div>
                                }
                            </div>
                        )
                    }
                )}
            </div>
        </div>
    )

}

const WinnerPage = ({setWinnersTable, winners, currentWinner, winnersLength, setWinnersLength}) => {
    let winner_phone = currentWinner.winner_phone
    winner_phone = winner_phone.split('').slice(-4).join('')

    return (
        <div className="winner-container ">

            <div className="winner_wrapper h150 animate__animated  animate__zoomIn">
                <div className="winner"><span className="prize">{currentWinner.prize_name}!</span>
                    <br/> {'+7 (***) *** ' + winner_phone} {currentWinner.winner_name}</div>
                <div className="winner_button-wrapper">
                    <div className="winner_button mt-30" onClick={() => setWinnersTable(false)}>Назад</div>
                </div>
            </div>

        </div>

    )
}

export default DrawTable;
