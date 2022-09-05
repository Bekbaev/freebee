import React from 'react';
import Header from "../components/Header";

const Edit = () => {
    return (
        <div class="col-lg-4">
            <form id="registration-form" role="form">
                <div class="form-group field-regForm-city">
                    <label class="control-label">Город</label>
                    <input type="text" id="regForm-city" name="RegForm[city]" class="form-control"
                           value="Павлодар"/>
                    <p class="help-block help-block-error"></p>
                </div>
                <div class="form-group field-regForm-company">
                    <label class="control-label">Название компании</label>
                    <input type="text" id="regForm-сompany" name="RegForm[company]" class="form-control"
                           value="NameCompany"/>
                    <p class="help-block help-block-error"></p>
                </div>
                <div class="form-group field-regForm-leader">
                    <label class="control-label">ФИО (директора)</label>
                    <input type="text" id="regForm-leader" name="RegForm[leader]" class="form-control"
                           value="Фамилия Имя Отчество"/>
                    <p class="help-block help-block-error"></p>
                </div>
                <div class="form-group field-regForm-phoneLeader">
                    <label class="control-label">Телефон директора</label>
                    <input type="text" id="regForm-phoneLeader" name="RegForm[phoneLeader]" class="form-control"
                           value="7478658478"/>
                    <p class="help-block help-block-error"></p>
                </div>
                <div class="form-group field-regForm-phoneAdmin">
                    <label class="control-label">Телефон администратора</label>
                    <input type="text" id="regForm-phoneAdmin" name="RegForm[phoneAdmin]" class="form-control"
                           value="7478658478"/>
                    <p class="help-block help-block-error"></p>
                </div>
                <div class="form-group field-regForm-phoneKeeping">
                    <label class="control-label">Телефон бухгалтера</label>
                    <input type="text" id="regForm-phoneKeeping" name="RegForm[phoneKeeping]" class="form-control"
                           value="7478658478"/>
                    <p class="help-block help-block-error"></p>
                </div>
                <div class="form-group field-regForm-email">
                    <label class="control-label">E-mail</label>
                    <input type="text" id="regForm-email" name="RegForm[email]" class="form-control"
                           value="email@gmail.com"/>
                    <p class="help-block help-block-error"></p>
                </div>
                <div class="form-group field-regForm-twoGis">
                    <label class="control-label">Ссылка на 2gis</label>
                    <input type="text" id="regForm-twoGis" name="RegForm[twoGis]" class="form-control" value="ссылка"/>
                    <p class="help-block help-block-error"></p>
                </div>
                <div class="btn btn-success">Сохранить</div>
            </form>
        </div>
    );
};

export default Edit;