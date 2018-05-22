const strUpperCase = (str)=> {
    let result = '';
    for (let i=0; i < str.length; i++){
        if (i === 0){
            result += str[i].toUpperCase();
        }else{
            result += str[i];
        }
    }
    return result;
}

const fullName = (firstName, lastName)=>{
    firstName = strUpperCase(firstName).trim();
    lastName = strUpperCase(lastName).trim();
    return firstName + ' ' + lastName;
}

module.exports = {strUpperCase,fullName};