import moment from 'moment'
export const formatDate = (date, forInput = false) => {
    let theDate = moment(date)
    if(forInput) {
        return theDate.format('YYYY-MM-DD')
    }
    if(theDate.isValid()) return theDate.format('DD / MM / YYYY')
    return ""
}