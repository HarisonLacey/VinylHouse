import Newsletter from "../../models/newsletter";
import dbConnect from "../../util/mongodb";

// newsletter signup api endpoint

export default async (req, res) => {
  let { name, email } = req.body;
  try {
    await dbConnect();
    let newsletterUser = await new Newsletter({
      name: name,
      email: email,
    });
    await newsletterUser.save();
    res
      .status(200)
      .json({ message: "Thank you for Subscribing " + name + "!" });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ message: "Something broke. Please try again!" });
  }
};
