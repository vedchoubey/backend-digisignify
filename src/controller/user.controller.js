import { generateToken } from "../util/jwt.util";
import { User } from "../model/user.model.js";

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.status(500).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exixts" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res
      .status(200)
      .json({ message: "User created successfully", data: newUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email }, "-password");
    if (!user) {
      return res
        .status(400)
        .json({ message: "User don't exists, register first" });
    }

    const isPasswordCorrect = await bcrypt.comapre(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentails" });
    }

    const payload = {
      id: user.id,
      email: user.email,
      name: user.name,
    };
    const token = await generateToken(payload);

    // res.cookie("token", token, {
    //   httpOnly: true,
    //   secure: true,
    //   sameSite: "None",
    // });

    res.status(200).json({
      message: "Logged in successfully",
      data: {
        token,
        user: payload,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
};

export const getUser = async (req, res) => {
  try {
    const { userId } = req.user;
    const user = await User.findById(userId);

    if (!user) {
      res.status(400).json({ message: "User not found" });
    }

    res.status(200).json({ message: "ok", data: user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
};
