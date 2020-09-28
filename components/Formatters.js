export function formatDateToString(date){
    
    var day = date.getDate().toString(); 
    var month = (date.getMonth() + 1).toString();

    var dd = day.padStart(2, '0');
    var mm = month.padStart(2, '0');

    return dd + '/' + mm + '/' + date.getFullYear();
}

export function formatStringToDate(dateString){
    var dateArr = dateString.split('/');
    return new Date(dateArr[2], parseInt(dateArr[1]) - 1, dateArr[0] - 1);
}

export function formatDateToDB(date){
    return formatStringDateToDB(formatDateToString(date));
}

export function formatStringDateToDB(dateString){
    var dateArr = dateString.split('/');
    return dateArr[2] + '-' + dateArr[1] + '-' + dateArr[0];
}

export function formatStringDateFromDB(dateString){
    var dateArr = dateString.split('-');
    return dateArr[2] + '/' + dateArr[1] + '/' + dateArr[0];
}
