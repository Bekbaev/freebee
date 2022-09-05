import React from 'react';

const Users = () => {
    return (
        <>
            <div className="user-index">
                <p>
                    <a className="btn btn-success" href="/admin/admin/user/create">Добавить</a>
                </p>
                <div id="p0" data-pjax-container="" data-pjax-push-state data-pjax-timeout="1000">
                    <div id="w0" className="grid-view">
                        <table className="table table-striped">
                            <thead>
                            <tr>
                                <th>#</th>
                                <th><a href="/admin/users?sort=username" data-sort="username">Имя</a></th>
                                <th><a href="/admin/users?sort=email" data-sort="email">EMail</a></th>
                                <th><a href="#">Город</a></th>
                                <th><a href="/admin/users?sort=phone" data-sort="phone">Телефон</a></th>
                                <th><a href="/admin/users?sort=balance"
                                       data-sort="balance">Баланс</a></th>
                                <th><a href="/admin/users?sort=comment"
                                       data-sort="comment">Должность</a></th>
                                <th><a href="/admin/users?sort=rights"
                                       data-sort="rights">Доступ</a></th>
                                <th><a href="/admin/users?sort=status"
                                       data-sort="status">Статус</a></th>
                                <th className="action-column">&nbsp;</th>
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
                                        <div className="w-50pr">Тенге</div>
                                    </div>
                                </th>
                                <th>&nbsp;</th>
                                <th>&nbsp;</th>
                                <th>&nbsp;</th>
                                <th>&nbsp;</th>
                            </tr>
                            <tr id="w0-filters" className="filters">
                                <td>&nbsp;</td>
                                <td><input type="text" className="form-control" name="UserSearch[username]"/></td>
                                <td><input type="text" className="form-control" name="UserSearch[email]"/></td>
                                <td><input type="text" className="form-control"/></td>
                                <td><input type="text" className="form-control" name="UserSearch[phone]"/></td>
                                <td><input type="text" className="form-control" name="UserSearch[balance]"/></td>
                                <td><select className="form-control" name="UserSearch[comment]">
                                    <option value=""></option>
                                    <option value="2">Игрок</option>
                                    <option value="16">Бармен</option>
                                    <option value="32">Кальянщик</option>
                                </select></td>
                                <td><select className="form-control" name="UserSearch[rights]">
                                    <option value=""></option>
                                    <option value="2">Клиент</option>
                                    <option value="16">Бар</option>
                                    <option value="32">Касса</option>
                                    <option value="255">Администратор</option>
                                </select></td>
                                <td><select className="form-control" name="UserSearch[status]">
                                    <option value=""></option>
                                    <option value="0">Удален</option>
                                    <option value="1">Заблокирован</option>
                                    <option value="2">Новичок</option>
                                    <option value="3">Активен</option>
                                </select></td>
                                <td>&nbsp;</td>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>1</td>
                                <td>NameClient</td>
                                <td><a href="mailto:">email@gmail.com</a></td>
                                <td>Павлодар</td>
                                <td>7781307093</td>
                                <td>
                                    <div className="d-flex">
                                        <div className="w-50pr">5000</div>
                                        <div className="w-50pr">3000</div>
                                    </div>
                                </td>
                                <td>Игрок</td>
                                <td>Клиент</td>
                                <td>Активен</td>
                                <td>
                                    <a href="/admin/admin/user/294" title="Просмотр" aria-label="Просмотр"
                                       data-pjax="0">
                                        <span className="glyphicon glyphicon-eye-open"></span></a>
                                    <a href="/admin/admin/user/294/update" title="Редактировать"
                                       aria-label="Редактировать" data-pjax="0">
                                        <span className="glyphicon glyphicon-pencil"></span>
                                    </a>
                                    <a href="/admin/admin/user/294/delete" title="Удалить" aria-label="Удалить"
                                       data-pjax="0" data-confirm="Вы уверены, что хотите удалить этот элемент?"
                                       data-method="post">
                                        <span className="glyphicon glyphicon-trash"></span>
                                    </a>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <ul className="pagination">
                            <li className="first disabled"><span>В начало</span></li>
                            <li className="prev disabled"><span>&laquo;</span></li>
                            <li className="active"><a href="/admin/users?page=1" data-page="0">1</a></li>
                            <li><a href="/admin/users?page=2" data-page="1">2</a></li>
                            <li><a href="/admin/users?page=3" data-page="2">3</a></li>
                            <li><a href="/admin/users?page=4" data-page="3">4</a></li>
                            <li><a href="/admin/users?page=5" data-page="4">5</a></li>
                            <li><a href="/admin/users?page=6" data-page="5">6</a></li>
                            <li><a href="/admin/users?page=7" data-page="6">7</a></li>
                            <li><a href="/admin/users?page=8" data-page="7">8</a></li>
                            <li><a href="/admin/users?page=9" data-page="8">9</a></li>
                            <li><a href="/admin/users?page=10" data-page="9">10</a></li>
                            <li className="next"><a href="/admin/users?page=2" data-page="1">&raquo;</a></li>
                            <li className="last"><a href="/admin/users?page=17" data-page="16">В конец</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Users;