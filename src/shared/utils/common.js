import moment from "moment";

const formatDate = (date) => {
    return moment(date).format('YYYY-MM-DD')
}

const formatTime = (date) => {
    return moment(date).format('hh:mm')
}

export {formatDate, formatTime}
