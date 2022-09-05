import React from 'react';
import InputMask from "react-input-mask";

const PhoneWriteoff = ({userPhone, setUserPhone}) => {
    return (
        <div className="form-group field-generateform-value required">
            <label className="control-label" htmlFor="generateform-value">
                Номер пользователя
            </label>
            <InputMask
                mask="+7 (999) 999 99 99"
                value={userPhone}
                onChange={e => setUserPhone(e.currentTarget.value)}
            >
                {() => (
                    <input
                        type="text"
                        className="form-control"
                        name="user_phone"
                        placeholder="+7 (___) ___ __ __"
                        required
                    />
                )}
            </InputMask>
        </div>
    );
};

export default PhoneWriteoff;
