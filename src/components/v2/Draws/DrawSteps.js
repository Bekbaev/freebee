import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import Drum from "../../Drum";
import Api from "../../../api/api";
import toastPlugin from "../../../utils/toastPlugin";

const DrawSteps = () => {
    const {id, type} = useParams();
    const history = useHistory();
    const [showDrum, setShowDrum] = useState(false);
    const [prizes, setPrizes] = useState([]);
    const [draw, setDraw] = useState(null);

    const formatPhone = (phone) => {
        if (!phone) return null

        const chars = phone.split('')
        return `+7 (***) ***-${chars[7]}${chars[8]}-${chars[9]}${chars[10]}`
    }

    const handleDrum = () => {
        setShowDrum(true);
        setTimeout(() => {
            setShowDrum(false);
        }, 5000);
    }

    useEffect(() => {
        const navbar = document.querySelector('.navbar');
        navbar.classList.add('d-none');
    }, []);

    useEffect(() => {
        (async () => {
            const response = await Api.getDraw(id);
            setDraw(response);
            setPrizes(response.prizes);
        })();
    }, []);

    const getWinner = async (prizeId) => {
        handleDrum();
        try {
            const data = await Api.getDrawWinnerByPrize(prizeId);
            setPrizes(data.prizes);
        } catch (e) {
            toastPlugin.error(e.response.data.message);
        }

    }

    return (
        <>
            {showDrum && <Drum/>}
            {!showDrum && <div className="allPrize-container">
                <div className="allPrize">
                    {prizes.length > 0 &&
                    prizes.map((prize, key) => {
                        return (
                            <div className="pizeWrap" key={`prize-key-${key}`}>
                                <div className="prize">#{key + 1}.{prize.prize_name}</div>
                                {/*<p className="prizeWinner">не определен</p>*/}
                                {prize.winner_id === null ?
                                    <button className='winner_button winner_button-extend' onClick={() => getWinner(prize.id)}>
                                        Определить победителя
                                    </button> : <p className="prizeWinner">{formatPhone(prize.winner_phone)}, {prize.client.name}</p> }
                            </div>
                        );})
                    }

                </div>
            </div>}
        </>
    );
}


export default DrawSteps;
