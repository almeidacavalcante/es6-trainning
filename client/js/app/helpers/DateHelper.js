class DateHelper {

    constructor(){
        throw new Error('DateHelper is a static class');
    }

    static stringToDate(string){

        if(!/\d{4}-\d{2}-\d{2}/.test(string)) throw new Error('The date should be yyyy-mm-dd');

        return new Date(
            ...string.split('-')
            .map( (item, index) => item - index % 2)
        )
    }

    static toString(date){
        return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
    }
}