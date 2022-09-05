import FingerprintJS from '@fingerprintjs/fingerprintjs'
import * as axios from 'axios'
import jwtDecode from 'jwt-decode'
import moment from 'moment'

const instance = axios.create({
    baseURL: 'http://fl1.wistis.ru/',
})

instance.interceptors.request.use(
    async config => {
        if (config.url !== '/auth/login' && config.url !== '/auth/admin/password-reset') {
            if (!localStorage.access_token || !localStorage.refresh_token) {
                localStorage.clear()
                return window.location.replace('/login')
            }

            const expires = jwtDecode(localStorage.access_token).exp

            if (moment().unix() >= expires) {
                try {
                    const fp = await FingerprintJS.load()
                    const result = await fp.get()
                    const visitorId = result.visitorId

                    const formData = new FormData()
                    formData.append('refresh_token', localStorage.refresh_token)
                    formData.append('fingerprint', visitorId)

                    const tokens = await Api.refreshToken(formData)

                    localStorage.access_token = tokens.access_token
                    localStorage.refresh_token = tokens.refresh_token
                } catch (err) {
                    localStorage.clear()
                    return window.location.replace('/login')
                }
            }

            config.headers.Authorization = `Bearer ${localStorage.access_token}`
        }

        return config
    },
    error => {
        return Promise.reject(error)
    }
)

const Api = {
    async authorization(formData) {
        const { data } = await instance.post('/auth/login', formData)
        return data
    },
    async resetPassword(formData) {
        const { data } = await instance.post('/auth/admin/password-reset', formData);
        return data;
    },
    async register(formData) {
        try {
            const { data } = await instance.post('/user/create', formData)
            return data
        } catch (e) {
            throw e.response;
        }
    },
    async refreshToken(formData) {
        const { data } = await instance.post('/auth/refresh-token', formData)
        return data
    },
    async userRead() {
        const { data } = await instance.get('/user/read')
        return data
    },
    async userReadById(id) {
        const { data } = await instance.get(`/user/read?id=${id}`)
        return data
    },
    async userUpdate(formData) {
        const { data } = await instance.post('/user/update', formData)
        return data
    },
    async userDelete(formData) {
        const { data } = await instance.post('/user/delete', formData)
        return data
    },
    // COMPANIES
    async companyCreate(formData) {
        const { data } = await instance.post('/companies/create', formData)
        return data
        try {
            const { data } = await instance.post('/companies/create', formData)
            return data
        } catch (e) {
            console.log(e.response)
        }
    },
    async companyRead(params = '') {
        const { data } = await instance.get('/companies/read?' + params)
        return data
    },
    async companyUpdate(formData) {
        const { data } = await instance.post('/companies/update', formData)
        return data
    },
    async companyDelete(formData) {
        const { data } = await instance.post('/companies/delete', formData)
        return data
    },
    async ticketsCreate(formData) {
        const { data } = await instance.post('/tickets/create', formData)
        return data
    },
    // TICKETS
    async ticketsRead(page) {
        let url
        if (page) {
            url = `/tickets/read?page=${page}`
        } else {
            url = `/tickets/read`
        }
        const { data } = await instance.get(url)
        return data
    },
    async ticketDeleteByUniq(uniq) {
        return await instance.get(`/tickets/delete/uniq/${uniq}`);
    },
    async ticketsPageCount() {
        const { data } = await instance.get('/tickets/read')
    },
    async ticketsReadUniqKey(uniq_key) {
        //const { data } = await instance.get(`/tickets/read?uniq_key=${uniq_key}`)
        const { data } = await instance.get(`/v2/ticket/read/${uniq_key}`);
        return data
    },
    async ticketsUpdate(formData) {
        const { data } = await instance.post('/tickets/update', formData)
        return data
    },
    async ticketsDelete(formData) {
        const { data } = await instance.post('/tickets/delete', formData)
        return data
    },
    async getQr(code) {
        const { data } = await instance.get(`/tickets/qr?code=${code}`)
        return data
    },
    async getQrList(uniq_key) {
        const { data } = await instance.get(`/tickets/qr-list?uniq_key=${uniq_key}`)
        return data
    },
    async history() {
        //const { data } = await instance.get('/tickets/history')
        const { data } = await instance.get('/v2/ticket/history')
        return data
    },
    ////////////////
    async transactionRead(company_id = null, page = 1) {
        const { data } = await instance.get(`/transactions/read?page=${page}&${company_id ? 'company_id=' + company_id : ''}`)
        return data
    },
    async getManagersTransactions(user_id) {
        const { data } = await instance.get(`/transactions/read?user_id=${user_id}`)
        return data
    },
    async citiesRead() {
        const { data } = await instance.get('/cities/read')
        return data
    },
    async currentCity(id) {
        const { data } = await instance.get(`/cities/read?id=${id}`)
        return data
    },
    ////////
    async writeoff(formData) {
        const { data } = await instance.post('/transactions/write-off', formData)
        return data
    },
    async writeoffConfirm(formData) {
        const { data } = await instance.post('/transactions/write-off-confirm', formData)
        return data
    },
    async accrual(formData) {
        const { data } = await instance.post('/transactions/accrual', formData)
        return data
    },
    async clientsRead() {
        const { data } = await instance.get(`/clients/read`)
        return data
    },
    async clientsDelete(id) {
        const { data } = await instance.delete(`/clients/${id}`)
        return data
    },
    async clientsUpdate(formData) {
        const { data } = await instance.post(`/clients/update`, formData)
        return data
    },
    async clientsReadOne(id) {
        const { data } = await instance.get(`/clients/read?id=${id}`)
        return data
    },
    async clientsRegister(formData) {
        const { data } = await instance.post(`/auth/client-register`, formData)
        return data
    },
    async receipt(formData) {
        const { data } = await instance.post(`/transactions/bind-receipt`, formData)
        return data
    },
    async getRules(id) {
        const { data } = await instance.get(`/text-rules/read?id=${id}`)
        return data
    },
    async sendRules(formData) {
        const { data } = await instance.post(`/text-rules/update`, formData)
        return data
    },
    async clientConfirm(formData) {
        const { data } = await instance.post(`/auth/client-confirm`, formData)
        return data
    },
    async getDrawWinnerByPrize(id) {
        const { data } = await instance.get(`/draw/prize/winner/${id}`);
        return data;
    },
    async drawCreate(formData) {
        const { data } = await instance.post('/draw/create', formData)
        return data
    },
    async drawRead(type) {
        const { data } = await instance.get('/draw/read', { params: { type } })
        return data
    },
    async getDraw(id) {
        const { data } = await instance.get(`/draw/${id}`);
        return data;
    },
    async drawUpdate(formData) {
        const { data } = await instance.post('ticketsReadUniqKey/draw/update', formData)
        return data
    },
    async drawDelete(formData) {
        const { data } = await instance.post('/draw/delete', formData)
        return data
    },
    async drawStart(formData) {
        const { data } = await instance.post('/draw/get-winners', formData)
        return data
    },
    async getDrawStats(type) {
        const { data } = await instance.get(`draw/get/info?type=${type}`);
        return data;
    },
    async getCondition(id) {
        const { data } = await instance.get(`/conditions/read?id=${id}`)
        return data
    },
    async sendCondition(formData) {
        const { data } = await instance.post(`/conditions/update`, formData)
        return data
    },
    async getWriteType() {
        const { data } = await instance.get(`/companies/write-type`)
        return data
    },
    async getWriteTypeUser() {
        const { data } = await instance.get(`/user/write-type`)
        return data
    },
    async getAccrualType() {
        const { data } = await instance.get(`/companies/accrual-type`)
        return data
    },
    async getAccrualTypeUser() {
        const { data } = await instance.get(`/user/can-accrual`)
        return data
    },
    async receiptInfo(startTime, endTime, companyId) {
        const { data } = await instance.get(`/transactions/receipt-info?start=${startTime}&end=${endTime}&company_id=${companyId}`)
        return data
    },
    async receiptCollections() {
        const { data } = await instance.get(`/transactions/read-collections`)
        return data
    },
    async receiptBind(formData) {
        const { data } = await instance.post(`/transactions/bind-receipts`, formData)
        return data
    },
    async getRoles() {
        const { data } = await instance.get('/clients/roles');
        return data;
    },
    // write-off-qr
    async getWriteOffQr(req) {
        const { data } = await instance.post('/v2/qr/write-off', req);
        return data;
    },
    async checkWriteOffQRStatus(id) {
        const { data } = await instance.get(`/v2/qr/write-off/status/${id}`);
        return data;
    },
    async companyList() {
        const { data } = await instance.get(`/v2/company`);
        return data;
    },
    async companyWalletAdd(transaction) {
        return await instance.post(`/v2/company/wallet`, transaction);
    },
    async companiesWalletList() {
        return await instance.get(`/v2/company/wallet`);
    },
    async companyWalletIndex(id) {
        return await instance.get(`/v2/company/wallet/${id}`);
    },
    async deleteWalletTransaction(id) {
        return await instance.delete(`/v2/company/wallet/${id}`);
    },
    async bindWalletReceipt(formData, id) {
        return await instance.post(`/v2/company/wallet/bind/${id}`, formData);
    },
    async getReferalsList() {
        return await instance.get(`/clients/referral/index`);
    },
    async getCompany(id) {
        return await instance.get(`/v2/company/${id}`);
    },
    async createPromocode(promocodeObject) {
        return await instance.post(`/v2/promocode`, promocodeObject);
    },
    async activePromocodesList() {
        return await instance.get('v2/promocode/active');
    },
    async getPromocodes(company_id = null) {
        return await instance.get(`v2/promocode/list${company_id > 0 ? `?company_id=${company_id}` : ''}`)
    },
    async closePromocode(promoId) {
        return await instance.get(`v2/promocode/${promoId}/close`)
    },
    async restorePromocode(promoId) {
        return await instance.get(`v2/promocode/${promoId}/restore`)
    },
    async deletePromocode(promoId) {
        return await instance.get(`v2/promocode/${promoId}/delete`)
    }
}

export default Api
