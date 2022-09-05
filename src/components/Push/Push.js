import React from 'react';

const Push = () => {
    return (
        <>
            <div className="col-lg-4">
                <div className="form-group">
                    <label className="control-label">Текст уведомления</label>
                    <textarea className="form-control" rows="3"></textarea>
                </div>
                <div className="form-group">
                    <div className="input-group">
            <span className="input-group-addon">
              <input type="checkbox" aria-label="..."/>
            </span>
                        <input type="text" className="form-control" value="Отправить всем" readOnly="readonly"/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="control-label">Город</label>
                    <select type="text" className="form-control">
                        <option value=""></option>
                        <option value="">Город 1</option>
                        <option value="">Город 2</option>
                    </select>
                </div>
                <div className="form-group">
                    <label className="control-label">Компания</label>
                    <select type="text" className="form-control">
                        <option value=""></option>
                        <option value="">Компания 1</option>
                        <option value="">Компания 2</option>
                    </select>
                </div>
                <div className="form-group">
                    <label className="control-label">Статус</label>
                    <select type="text" className="form-control">
                        <option value=""></option>
                        <option value="">Активен</option>
                        <option value="">Не активен</option>
                    </select>
                </div>
                <p>
                    <div className="btn btn-primary">Создать Push-Уведомление</div>
                </p>
            </div>
        </>
    );
};

export default Push;