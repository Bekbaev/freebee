import React from 'react';

const UserCreate = () => {
    return (
        <>
            <div className="user-create">
                <div className="user-form">
                    <form id="w0" action="/admin/admin/user/create" method="post">
                        <div className="form-group field-usereditform-username required">
                            <label className="control-label" htmlFor="usereditform-username">Имя</label>
                            <input type="text" id="usereditform-username" className="form-control"
                                   name="UserEditForm[username]" aria-required="true" />
                            <div className="help-block"></div>
                        </div>
                        <div className="form-group field-usereditform-email">
                            <label className="control-label" htmlFor="usereditform-email">EMail</label>
                            <input type="text" id="usereditform-email" className="form-control"
                                   name="UserEditForm[email]" />
                            <div className="help-block"></div>
                        </div>
                        <div className="form-group">
                            <label className="control-label">Город</label>
                            <input type="text" className="form-control" />
                            <div className="help-block"></div>
                        </div>
                        <div className="form-group field-usereditform-phone required">
                            <label className="control-label" htmlFor="usereditform-phone">Телефон</label>
                            <input type="text" id="usereditform-phone" className="form-control"
                                   name="UserEditForm[phone]" aria-required="true" />
                            <div className="help-block"></div>
                        </div>
                        <div className="form-group field-usereditform-comment">
                            <label className="control-label" htmlFor="usereditform-comment">Комментарий</label>
                            <input type="text" id="usereditform-comment" className="form-control"
                                   name="UserEditForm[comment]" />

                            <div className="help-block"></div>
                        </div>
                        <div className="form-group field-usereditform-balance required">
                            <label className="control-label" htmlFor="usereditform-balance">Баланс</label>
                            <input type="text" id="usereditform-balance" className="form-control"
                                   name="UserEditForm[balance]" aria-required="true" />

                            <div className="help-block"></div>
                        </div>
                        <div className="form-group field-usereditform-temppassword">
                            <label className="control-label" htmlFor="usereditform-temppassword">Пароль</label>
                            <input type="text" id="usereditform-temppassword" className="form-control"
                                   name="UserEditForm[tempPassword]" />

                            <div className="help-block"></div>
                        </div>
                        <div className="form-group field-usereditform-rights">
                            <label className="control-label" htmlFor="usereditform-rights">Доступ</label>
                            <select id="usereditform-rights" className="form-control" name="UserEditForm[rights]">
                                <option value="2">Клиент</option>
                            </select>

                            <div className="help-block"></div>
                        </div>
                        <div className="form-group field-usereditform-status">
                            <label className="control-label" htmlFor="usereditform-status">Статус</label>
                            <select id="usereditform-status" className="form-control" name="UserEditForm[status]">
                                <option value="0">Удален</option>
                                <option value="1">Заблокирован</option>
                                <option value="2">Новичок</option>
                                <option value="3">Активен</option>
                            </select>

                            <div className="help-block"></div>
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-success">Добавить</button>
                            <a className="btn btn-default" href="/admin/users">Назад</a>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default UserCreate;