import moment from 'moment';
export const FormatDate = (date:any, format:string) =>{
    return moment(date).format(format);
}

