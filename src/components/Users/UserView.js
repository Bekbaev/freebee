import React from 'react';

const UserView = () => {
    return (
        <>
            <div className="mb-20">
                <a href="edit.html">
                    <div className="btn btn-primary">Изменить</div>
                </a>
                <a href="#">
                    <div className="btn btn-danger">Удалить</div>
                </a>
            </div>
            <table className="table table-striped table-bordered">
                <tbody>
                <tr>
                    <th>Имя</th>
                    <td>NameUser</td>
                </tr>
                <tr>
                    <th>E-mail</th>
                    <td>email@gmail.com</td>
                </tr>
                <tr>
                    <th>Город</th>
                    <td>Павлодар</td>
                </tr>
                <tr>
                    <th>Телефон</th>
                    <td>7476543210</td>
                </tr>
                <tr>
                    <th>Должность</th>
                    <td>Игрок</td>
                </tr>
                <tr>
                    <th>Доступ</th>
                    <td>Клиент</td>
                </tr>
                <tr>
                    <th>Статус</th>
                    <td>Активен</td>
                </tr>
                <tr>
                    <th>Кошелек «FreeBee»</th>
                    <td>5000</td>
                </tr>
                <tr>
                    <th>Кошелек «Тенге»</th>
                    <td>3000</td>
                </tr>
                </tbody>
            </table>
            <p>
                <b>Статистика</b>
                <div className="d-flex w-50pr">
                    <div className="w-50pr">От</div>
                    <div>До</div>
                </div>
            </p>
            <p>
                <div className="d-flex w-50pr">
                    <div className="w-50pr">
                        <input type="text" id="w0" className="form-control w-90pr" readOnly="readonly"/>
                    </div>
                    <div className="w-50pr">
                        <input type="text" id="w1" className="form-control w-90pr" readOnly="readonly"/>
                    </div>
                </div>
            </p>
            <p>
                <div className="d-flex w-50pr">
                    <div><b>Сумма:&nbsp;</b></div>
                    <div><b>50000</b></div>
                </div>
                <div className="d-flex w-50pr">
                    <div><b>Комиссия:&nbsp;</b></div>
                    <div><b>50000</b></div>
                </div>
                <div className="d-flex w-50pr">
                    <div><b>Итого:&nbsp;</b></div>
                    <div><b>50000</b></div>
                </div>
            </p>
            <p><b>Таблица транзакций</b></p>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Дата</th>
                    <th>Город</th>
                    <th>Компания</th>
                    <th>Начисление</th>
                    <th>Списание</th>
                    <th>Комиссия</th>
                </tr>
                <tr>
                    <th>&nbsp;</th>
                    <th>&nbsp;</th>
                    <th>&nbsp;</th>
                    <th>&nbsp;</th>
                    <th>&nbsp;</th>
                    <th>
                        <div className="d-flex">
                            <div className="w-50pr">FreeBee</div>
                            <div>Тенге</div>
                        </div>
                    </th>
                    <th>&nbsp;</th>
                </tr>
                <tr>
                    <th><input type="text" className="form-control"/></th>
                    <th>
                        <div className="d-flex">
                            <div className="w-50pr">
                                <input type="text" id="w0" className="form-control w-90pr" readOnly="readonly"/>
                            </div>
                            <div className="w-50pr">
                                <input type="text" id="w1" className="form-control w-90pr" readOnly="readonly"/>
                            </div>
                        </div>
                    </th>
                    <th><input type="text" className="form-control"/></th>
                    <th><input type="text" className="form-control"/></th>
                    <th><input type="text" className="form-control"/></th>
                    <th>
                        <div className="d-flex">
                            <div className="w-50pr">
                                <input type="text" id="w0" className="form-control w-90pr"/>
                            </div>
                            <div className="w-50pr">
                                <input type="text" id="w1" className="form-control w-90pr"/>
                            </div>
                        </div>
                    </th>
                    <th><input type="text" className="form-control"/></th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>1</td>
                    <td>2021-02-04 13:00:00</td>
                    <td>Астана</td>
                    <td>NameCompany</td>
                    <td>5000</td>
                    <td>
                        <div className="d-flex">
                            <div className="w-50pr">5000</div>
                            <div>3000</div>
                        </div>
                    </td>
                    <td>4000</td>
                </tr>
                </tbody>
            </table>
        </>
    );
};

export default UserView;