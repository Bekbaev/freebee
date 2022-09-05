import React, {useEffect, useState} from 'react';
import Drum from "../../Drum";
import Api from "../../../api/api";
import { useParams, useHistory } from 'react-router-dom';
import toastPlugin from "../../../utils/toastPlugin";

const DrawDrum = () => {
    const history = useHistory();
    const [drumShow, setDrumShow] = useState(true);
    const [winners, setWinners] = useState([]);
    const { id, type } = useParams();

    const getWinners = async () => {
        try {
            const formData = new FormData;
            formData.append('id', id);
            const { data } = await Api.drawStart(formData);
            setWinners(data);
        } catch (e) {
            toastPlugin.error(e.response.data.message);
            history.goBack();
        }

    };

    const formatPhone = (phone) => {
        if (!phone) return null

        const chars = phone.split('')
        return `+7 (***) ***-${chars[7]}${chars[8]}-${chars[9]}${chars[10]}`
    }

    useEffect(() => {
        (async () => {
            startDrum();
            await getWinners();
        })();
    }, []);

    const drawList = () => {
        return (
            <div className="allPrize-container">
                <div className="allPrize">
                    {
                        winners && winners.map((el, index) => {
                            return (
                                <div className="pizeWrap">
                                    <div className="prize">#{index + 1}. {el.prize_name}</div>
                                    <p className="prizeWinner"> {formatPhone(el.winner_phone)}, {el.client.name}</p>
                                </div>
                            )
                        })
                    }

                </div>
            </div>
        );
    };

    const startDrum = () => {
        setDrumShow(true);
        setTimeout(() => {
            setDrumShow(false);
        }, 5000);
    }

    return (
        <>
            { drumShow && <Drum /> }
            { !drumShow && drawList() }
        </>
    );
}

export default DrawDrum;
