const User = require('../models/userModel');

registerUser = (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'No Name or Password',
        });
    }

    const user = new User(body);

    if (!user) {
        return res.status(400).json({ success: false, error: err });
    }

    user
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                message: 'User Registered!',
            });
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: "Registration Failed",
            });
        })
}	

loginUser = async (req, res) => {
	const body = req.body;
	
	if(!body){
		return res.status(400).json({
			success: false,
			error: 'No Name or Password',
		});
	}
	
	passw = body.pass;
	
    User.findOne({pass: passw}, (err, user) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }
        if (!user) {
            return res
                .status(404)
                .json({ success: false, error: `No Such User` });
        }
		return res.status(200).json({sucess: true, data: user});
	}).catch(err => console.log(err))
}
		
module.exports = {
    registerUser,
	loginUser,
}