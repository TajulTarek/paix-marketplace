import User from "../model/user.model.js";

export const Signup = async (req, res) => {
    console.log(req.body);
    const { name, email, password } = req.body;
    try {
        const user = await User.create({
            name,
            email,
            password,
        });
        res.status(201).json({
            success: true,
            user,
        });
    } catch(error) {
        console.error("Error occurred:", error.message);  // Log the error message
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

