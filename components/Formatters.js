export function formatDateToString(date){
    
    var day = date.getDate().toString(); 
    var month = (date.getMonth() + 1).toString();

    var dd = day.padStart(2, '0');
    var mm = month.padStart(2, '0');

    return dd + '/' + mm + '/' + date.getFullYear();
}

export function formatStringToDate(dateString){
    var dateArr = dateString.split('/');
    return new Date(dateArr[2], parseInt(dateArr[1]) - 1, dateArr[0]);
}