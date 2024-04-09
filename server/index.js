const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserRegistrationModel = require("./models/UserRegistration");
const RouteDetailsModel = require("./models/RouteDetailsModel");
const PhotoModel = require("./models/PhotoModel");
const multer = require("multer");
const StudentPersonalDetailsModel = require("./models/StudentPersonalDetails");
const StudentStudyDetailsModel = require("./models/StudentStudyDetails");
const InstitutionDetailsModel = require("./models/InstitutionDetails");
const ResidentialAddressDetailsModel = require("./models/ResidentialAddressDetails");
const UserPersonalDetailsModel = require("./models/UserPersonalDetails");
const UserResidentialDetailsModel = require("./models/UserResidentialDetails");
const ApplicationMailsModel = require("./models/ApplicationMails");
const path = require("path");
const { error } = require("console");

const app = express();
app.use(express.json());
const staticPath = path.join(__dirname, "./public/");
app.use(express.static(staticPath));
app.use(cors());
const PORT = 8080;

const DB =
  "mongodb+srv://mahipalkeluth143:uK0niUwwZG9FOCHp@majordb.cb49png.mongodb.net/bussPass?retryWrites=true&w=majority";

// const DB = "mongodb://0.0.0.0:27017";

mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB Atlas");
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

app.post("/user-signin", (req, res) => {
  const { email } = req.body;
  UserRegistrationModel.findOne({ email: email }).then((user) => {
    if (user) {
      // console.log(user);
      res.json({ status: "success" });
    } else {
      res.json({ status: "fail" });
    }
  });
});

app.get("/routeCost", (req, res) => {
  RouteDetailsModel.find()
    .then((userdetails) => res.json(userdetails))
    .catch((err) => res.json(err));
});

app.get("/getUserWallet/:email", (req, res) => {
  const { email } = req.params;
  UserRegistrationModel.findOne({ email: email })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => res.json(err));
});

app.post("/register", (req, res) => {
  UserRegistrationModel.create(req.body)
    .then((registration) => res.json(registration))
    .catch((err) => res.json(err));
});

app.put("/wallet/:email", async (req, res) => {
  const { newWallet } = req.body;
  const email = req.params.email;
  try {
    const result = await UserRegistrationModel.updateOne(
      { email: email },
      {
        $inc: {
          wallet: `${newWallet}`,
        },
      }
    );

    if (result.modifiedCount > 0) {
      res.json({ success: true, message: "wallent updated success" });
    } else {
      res.json({ success: false, message: "wallet update failed" });
    }
  } catch {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

app.put("/payment/:email", async (req, res) => {
  const { cost } = req.body;
  const email = req.params.email;
  try {
    const result = await UserRegistrationModel.updateOne(
      { email: email },
      {
        $inc: {
          wallet: -`${cost}`,
        },
      }
    );

    if (result.modifiedCount > 0) {
      res.json({ success: true, message: "wallent updated success" });
    } else {
      res.json({ success: false, message: "wallet update failed" });
    }
  } catch {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// Image Upload and Retrive********

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

// const upload = multer({dest: 'images/'})
const upload = multer({
  storage: storage,
}).single("file");

app.post("/uploadPhoto", upload, async (req, res) => {
  PhotoModel.create({ email: req.body.email, image: req.file.filename })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.get("/getImage/:email", (req, res) => {
  const email = req.params.email;
  PhotoModel.findOne({ email: email })
    .then((result) => res.json({ imageurl: result.image }))
    .catch((err) => res.json(res));
});

// STUDENT APPLICATION //

app.post("/student_personal_details", (req, res) => {
  StudentPersonalDetailsModel.create(req.body)
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.post("/student_study_details", (req, res) => {
  StudentStudyDetailsModel.create(req.body)
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.post("/institution_detail", (req, res) => {
  const {
    email,
    districtInstitution,
    mandalInstitution,
    institutionname,
    coursename,
    admissionnumber,
    addressInstitution,
  } = req.body;
  InstitutionDetailsModel.create({
    email: email,
    districtInstitution: districtInstitution,
    mandalInstitution: mandalInstitution,
    institutionname: institutionname,
    coursename: coursename,
    admissionnumber: admissionnumber,
    addressInstitution: addressInstitution,
  })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.post("/residential_address_details", (req, res) => {
  ResidentialAddressDetailsModel.create(req.body)
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

// OTHER USER APPLICATION //

app.post("/user_apply_personal_details", (req, res) => {
  UserPersonalDetailsModel.create(req.body)
    .then((res) => res.json(res))
    .catch((err) => res.json(err));
});

app.post("/user_apply_residential_details", (req, res) => {
  UserResidentialDetailsModel.create(req.body)
    .then((res) => res.json(res))
    .catch((err) => res.json(err));
});

app.post("/applicaiton_emails", (req, res) => {
  ApplicationMailsModel.create(req.body)
    .then((res) => res.json(res))
    .catch((err) => res.json(err));
});

/*  ------------ ADMIN API'S ------------- */

app.get("/application_mails", (req, res) => {
  ApplicationMailsModel.find()
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.get("/student-apply-personal-details/:applicationMail", (req, res) => {
  const applicationMail = req.params.applicationMail;
  StudentPersonalDetailsModel.findOne({ email: applicationMail })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.get("/student-apply-study-details/:applicationMail", (req, res) => {
  const applicationMail = req.params.applicationMail;
  StudentStudyDetailsModel.findOne({ email: applicationMail })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.get("/student-apply-insitution-details/:applicationMail", (req, res) => {
  const applicationMail = req.params.applicationMail;
  InstitutionDetailsModel.findOne({ email: applicationMail })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.get("/student-apply-residential-details/:applicationMail", (req, res) => {
  const applicationMail = req.params.applicationMail;
  ResidentialAddressDetailsModel.findOne({ email: applicationMail })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.get("/other-personal-details/:applicationMail", (req, res) => {
  const applicationMail = req.params.applicationMail;
  UserPersonalDetailsModel.findOne({ email: applicationMail })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.get("/other-residential-details/:applicationMail", (req, res) => {
  const applicationMail = req.params.applicationMail;
  UserResidentialDetailsModel.findOne({ email: applicationMail })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.put("/statusUpdate/:email", async (req, res) => {
  try {
    const { newStatus } = req.body;
    const { email } = req.params;
    const updateDoc = await ApplicationMailsModel.findOneAndUpdate(
      { email: email },
      { $set: { status: newStatus } },
      { new: true }
    );

    if (!updateDoc) {
      return res.status(404);
    }

    res.json(updateDoc);
  } catch (err) {
    res.json(err);
  }
});

app.put("/qrUrlUpdate/:email", async (req, res) => {
  try {
    const { qrUrl } = req.body;
    const { email } = req.params;
    const updateDoc = await ApplicationMailsModel.findOneAndUpdate(
      { email: email },
      { $set: { imgUrl: qrUrl } },
      { new: true }
    );

    if (!updateDoc) {
      return res.status(404);
    }

    res.json(updateDoc);
  } catch (err) {
    res.json(err);
  }
});

app.put("/dateUpdate/:email", async (req, res) => {
  try {
    const { startDate, endDate } = req.body;
    const { email } = req.params;
    const updateDoc = await ApplicationMailsModel.findOneAndUpdate(
      { email: email },
      { $set: { startDate: startDate, endDate: endDate } },

      { new: true }
    );

    if (!updateDoc) {
      return res.status(404);
    }

    res.json(updateDoc);
  } catch (err) {
    res.json(err);
  }
});

app.get("/getName/:viewMail", (req, res) => {
  const viewMail = req.params.viewMail;
  StudentPersonalDetailsModel.findOne({ email: viewMail })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.get("/getNameOther/:viewMail", (req, res) => {
  const viewMail = req.params.viewMail;
  UserPersonalDetailsModel.findOne({ email: viewMail })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.get("/appDetails/:appMail", (req, res) => {
  const appEmail = req.params.appMail;
  ApplicationMailsModel.findOne({ email: appEmail })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});


/* ************ VIEW PASS API *********** */
app.get("/getStatus/:viewMail", (req, res) => {
  const viewMail = req.params.viewMail;
  ApplicationMailsModel.findOne({ email: viewMail })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.listen(PORT, () => {
  console.log(`server is running at port ${PORT}`);
});
