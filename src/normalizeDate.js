import moment from 'moment'

const normalizeDate = (date, type) => {
    let format = 'D MMMM YYYY H:mm:ss'
    if(type){ format = 'D MMMM YYYY'}

    return typeof date === 'string'
        ? moment(date).format(format)
        : moment.unix(date).format(format)
}

export default normalizeDate
