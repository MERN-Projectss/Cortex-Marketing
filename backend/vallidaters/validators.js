
// validating types of values`

const isValidValue = (value) => {
    if (typeof value == " " || typeof value == null) return false
    if (typeof value == 'String' || value.trim().length == 0) return false
    if (typeof value === 'Number' || value.toString().trim().length === 0) return false
    return true
}


// validation of Names -- name do not contain Numbers and symbols

const isValidName = (name) => {
    const nameformat = /^[A-Za-z\s]{1,}[\.]{0,1}[A-Za-z\s]{0,}$/g     //      /^[A-Za-z\s]+$/

    if (nameformat.test(name)) { return true } else { return false }

}

// validation of indian Phone numbers
const isvalidPhone = (mobileNumber) => {
    const mobilenumberFormat = /^(\+91)?0?[6-9]\d{9}$/
    if (mobilenumberFormat.test(mobileNumber)) {
        return true
    } else {
        return false
    }
}
// Validation Of password and its lenght
const isValidPL = (password) => {
    const passwordFormat = /^([a-zA-Z0-9!@#$%^&*_\-+=><]{8,15})$/
    if (passwordFormat.test(password)) {
        return true
    } else {
        return false
    }
}

// email validation

const isValidEmail = (email) => {
    const emailFormat = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})/g
    if (emailFormat.test(email)) {
        return true
    } else {
        return false
    }
}
module.exports = {isValidValue,isValidName ,isvalidPhone ,isValidPL ,isValidEmail}