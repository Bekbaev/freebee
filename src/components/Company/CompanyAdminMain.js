import React from 'react';

const CompanyAdminMain = () => {
    return (
        <div>
            <ul className="nav nav-tabs">
                <li role="presentation" className="active"><a href="#">Списания</a></li>
                <li role="presentation"><a href="#">Оплата</a></li>
            </ul>
            <div style="width: 100%; margin-top: 10px;">
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
                            <input type="text" id="w0" className="form-control w-90pr" readOnly="readonly" />
                        </div>
                        <div className="w-50pr">
                            <input type="text" id="w1" className="form-control w-90pr" readOnly="readonly" />
                        </div>
                    </div>
                </p>
                <p>
                    <div className="form-group w-50pr">
                        <label className="control-lavel">Выбрать кошелек</label>
                        <select name="" id="" className="form-control w-50pr">
                            <option value="">По всем</option>
                            <option value="">FreeBee</option>
                            <option value="">Тенге</option>
                        </select>
                    </div>
                    <div className="btn btn-primary">Рассчитать</div>
                </p>
                <p>
                    <div className="d-flex w-50pr">
                        <div><b>Сумма:&nbsp;</b></div>
                        <div><b>50000</b></div>
                    </div>
                </p>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th style="width: 50px;">#</th>
                        <th>Дата транзакции</th>
                        <th>Имя клиента</th>
                        <th>Имя менеджера</th>
                        <th style="width: 150px">
                            Платежи
                            <div className="d-flex">
                                <div className="w-50pr"><b>Бар</b></div>
                                <div><b>Касса</b></div>
                            </div>
                        </th>
                        <th style="width: 150px;">
                            Списания
                            <div className="d-flex">
                                <div className="w-50pr"><b>FreeBee</b></div>
                                <div><b>Тенге</b></div>
                            </div>
                        </th>
                        <th>&nbsp;</th>
                    </tr>
                    <tr>
                        <th><input type="text" className="form-control" /></th>
                        <th><input type="text" className="form-control" readOnly="readonly" /></th>
                        <th><input type="text" className="form-control" /></th>
                        <th><input type="text" className="form-control" /></th>
                        <th>
                            <div className="d-flex">
                                <div className="w-50pr">
                                    <input type="text" id="w0" className="form-control w-90pr" />
                                </div>
                                <div className="w-50pr">
                                    <input type="text" id="w1" className="form-control w-90pr" />
                                </div>
                            </div>
                        </th>
                        <th>
                            <div className="d-flex">
                                <div className="w-50pr">
                                    <input type="text" id="w0" className="form-control w-90pr" />
                                </div>
                                <div className="w-50pr">
                                    <input type="text" id="w1" className="form-control w-90pr" />
                                </div>
                            </div>
                        </th>
                        <th>&nbsp;</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>1</td>
                        <td>2021-02-05 12:00:00</td>
                        <td><a href="#">NameClient</a></td>
                        <td><a href="#">NameManager</a></td>
                        <td>
                            <div className="d-flex">
                                <div className="w-50pr"><b>5000</b></div>
                                <div><b>3000</b></div>
                            </div>
                        </td>
                        <td>
                            <div className="d-flex">
                                <div className="w-50pr"><b>5000</b></div>
                                <div><b>3000</b></div>
                            </div>
                        </td>
                        <td>
                            <div className="btn btn-primary">DOC</div>
                        </td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>2021-02-05 12:00:00</td>
                        <td><a href="#">NameClient</a></td>
                        <td><a href="#">NameManager</a></td>
                        <td>
                            <div className="d-flex">
                                <div className="w-50pr"><b>5000</b></div>
                                <div><b>3000</b></div>
                            </div>
                        </td>
                        <td>
                            <div className="d-flex">
                                <div className="w-50pr"><b>5000</b></div>
                                <div><b>3000</b></div>
                            </div>
                        </td>
                        <td>
                            <div className="btn btn-primary">DOC</div>
                        </td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>2021-02-05 12:00:00</td>
                        <td><a href="#">NameClient</a></td>
                        <td><a href="#">NameManager</a></td>
                        <td>
                            <div className="d-flex">
                                <div className="w-50pr"><b>5000</b></div>
                                <div><b>3000</b></div>
                            </div>
                        </td>
                        <td>
                            <div className="d-flex">
                                <div className="w-50pr"><b>5000</b></div>
                                <div><b>3000</b></div>
                            </div>
                        </td>
                        <td>
                            <div className="btn btn-primary">DOC</div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div style="width: 100%; margin-top: 10px;">
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th style="width: 50px;">#</th>
                        <th>Дата</th>
                        <th>Сумма</th>
                        <th>Комиссия</th>
                        <th>Итого</th>
                        <th style="width: 200px;">&nbsp;</th>
                    </tr>
                    <tr>
                        <th><input type="text" className="form-control" /></th>
                        <th><input type="text" className="form-control" readOnly="readonly" /></th>
                        <th><input type="text" className="form-control" /></th>
                        <th><input type="text" className="form-control" /></th>
                        <th><input type="text" className="form-control" /></th>
                        <th>&nbsp;</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>1</td>
                        <td>2021-02-05 12:00:00</td>
                        <td>5000</td>
                        <td>4000</td>
                        <td>9000</td>
                        <td>
                            <div className="btn btn-primary" style="width: 100%;">Подробнее</div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CompanyAdminMain;