import React from 'react';

const CompanyAllTableSort = ({companyArray, setCompanyFilteredArray}) => {
    const sortTable = (type, e) => {
        const text = e.currentTarget.value
        const filteredArray = companyArray.filter(el => el[type] == text)
        setCompanyFilteredArray(filteredArray)
    }

    return (
        <>
            <tr>
                <th><input type="text" className="form-control" onChange={e => sortTable("id", e)}/></th>
                <th><input type="text" className="form-control" onChange={e => sortTable("city", e)}/></th>
                <th><input type="text" className="form-control" onChange={e => sortTable("name", e)}/></th>
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
                <th><input type="text" className="form-control" onChange={e => sortTable("commission", e)}/></th>
                <th>&nbsp;</th>
            </tr>
        </>
    );
};

export default CompanyAllTableSort;