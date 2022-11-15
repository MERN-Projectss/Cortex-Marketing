const userModel = require("../models/userModel")
const jwt = require("jsonwebtoken")
const { isValidValue, isValidName, isvalidPhone, isValidPL, isValidEmail } = require("../vallidaters/validators");


const regUser = async (req, res) => {
    try {
        let data = req.body;
        let { firstName, lastName, mobileNumber, email , password, age } = data

        if (!firstName ) return res.status(400).send({ status: false, Message: "Please enter First Name" });
        if (!isValidName(firstName) || !isValidValue(firstName)) return res.status(400).send({ status: false, Message: "Invalid First Name" });

        if (!lastName ) return res.status(400).send({ status: false, Message: "Please enter Last Name" });
        if (!isValidName(lastName)|| !isValidValue(lastName)) return res.status(400).send({ status: false, Message: "Invalid Last Name" });

        if (!mobileNumber) return res.status(400).send({ status: false, Message: "Please enter Mobile Number" });
        if (!isvalidPhone(mobileNumber)) return res.status(400).send({ status: false, Message: "Please enter Valid Mobile Number" });

        if (!email) return res.status(400).send({ status: false, Message: "Please enter email" });
        if (!isValidEmail(email)) return res.status(400).send({ status: false, Message: "Please enter Valid email" });

        console.log(mobileNumber)
        // Checking duplicacy Phone Number
         const isUserExists = await userModel.findOne({mobileNumber : mobileNumber })

        if(isUserExists.mobileNumber) return res.status(409).send({status:false , Message : `This Phone Number ${mobileNumber} already registered with us, Please login to check status`})
        
        if(isUserExists.email) return res.status(409).send({status:false , Message : `This e-mail ${email} already registered with us, Please login to check status`})
        
        if (!password ) return res.status(400).send({ status: false, Message: "Please enter password" });
        if (!isValidPL(password)) return res.status(400).send({ status: false, Message: "password is not Valid" });

        if (!age) return res.status(400).send({ status: false, Message: "Please enter Age" });
        if (12 > age || age > 120) return res.status(400).send({ status: false, Message: "Enter valid Age" });

        const userDetail = await userModel.create(data)
        res.status(201).send({ status: true, Message: "User registered successfully - " , userDetail })

    } catch (error) {
        console.log(error.message)
        res.status(500).send({ error: error.message })
    }
}





//==================================Login API ==============================================

const userLogin = async (req, res) => {
    try {
        // recieving login detail by user
        const loginDetail = req.body;

        // assigning keys to login detail
        const {  email,  password } = loginDetail

        //checking email is provided by user or not? , and it should not contain blank spaces
        if (!email ) return res.status(400).send({ status: false, message: " email is required to login" })

        //checking email entered by user is Valid or not?
        if (!isValidEmail(email)) return res.status(400).send({ status: false, message: `this email=> ${email} is not valid` })

        // checking user is registered with us or not?
        const findEmail = await userModel.findOne({ email: email })

        if (!findEmail) return res.status(400).send({ status: false, message: `this ${email} is not registered with us , you need to register first` })

        //checking ---is password entered by user or not?
        if (!password ) return res.status(400).send({ status: false, message: " password is required" })

        //checkin-- is password valid or not
        if (!isValidPL(password)) return res.status(400).send({ status: false, message: " provide valid password lenght between 8-15 character long" })


        //logging user with above detail
        const payLoad = { userId: findEmail._id.toString(), iat: Math.floor(Date.now() ) }
        const secretKey = "Cortex-Marketing-Pankaj"
       //const options = { exp : Math.floor(Date.now() / 1000) + (60 * 60) }// or {expiresIn:'1h' or 60*60 }
        const logging = jwt.sign(payLoad, secretKey, { expiresIn : 60*60*1000 })



        // sending logging in success response
        return res.status(201).send({ status: true, message: " user logged in successfully", data: findEmail._id, token: logging })

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

const getUser = async(req, res) => {
    try {
        const queryParams = req.query
        let { Age ,Pincode ,VaccinationStatus,Dose } = queryParams
        if (!queryParams) {
            // return all products that are not deleted and sort them in ascending
            let userDetail = await userModel.find().sort({ "price": 1 })
            return res.status(200).send({ status: true, msg: 'all book list', data: userDetail })
        }

        let filter = { }

        if (queryParams.Age) filter.Age = queryParams.Age
        if (queryParams.Pincode) filter.Pincode = queryParams.Pincode
        if(queryParams.VaccinationStatus == 1) filter.VaccinationStatus = await userModel.find({Dose : "first"}|| {Dose : "second"})

    
        const userFilter = await userModel.find(filter )



        if (userFilter.length) {
            return res.status(400).send({ status: true, count: userFilter.length, data: userFilter })
        } else {
            return res.status(404).send({ status: false, msg: "No user found" })
        }


    } catch (error) {
        console.log(error)
        return res.status(500).send({ status: false, msg: error.message })

    }
}


module.exports = {regUser,userLogin,getUser}