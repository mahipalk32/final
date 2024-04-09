import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Button, MenuItem } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import "../style.css";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function OtherUserDetails({ filename }) {
  //Other User Details
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [ageValid, setAgeValid] = useState(true);

  const [mobileNo, setMobileNo] = useState(0);
  const [mobileValid, setMobileValid] = useState(true);
  const [email, setEmail] = useState("");
  const [validMail, setValidEmail] = useState(true);
  const [aadhar, setAadhar] = useState("");
  const [aadharValid, setAadharValid] = useState(true);
  const [file, setFile] = useState(null);
  const [dob, setDOB] = useState("");
  localStorage.setItem("applcationMail", email);

  //Residential Adress Details
  const [district, setDistrict] = useState("");
  const [mandal, setMandal] = useState("");
  const [mandalValid, setMandalValid] = useState(true);
  const [village, setVillage] = useState("");
  const [villageValid, setVillageValid] = useState(true);
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [pinValid, setPinValid] = useState(true);

  const navigate = useNavigate();
  const [review, setReview] = useState(false);

  const validateName = () => {
    const namePattern = /^[a-zA-Z\s-]+$/; // Regular expression for name (letters, spaces, and hyphens)

    if (namePattern.test(name.trim())) {
      setNameError(""); // Clear error message if name is valid
      return true; // Return true if validation passes
    } else {
      setNameError("Invalid name");
      return false; // Return false if validation fails
    }
  };

  const handleDOB = (e) => {
    const { $D, $M, $y } = e;
    const day = $D < 10 ? `0${$D}` : $D; // Add leading zero if day is less than 10
    const month = $M + 1 < 10 ? `0${$M + 1}` : $M + 1; // Increment month by 1 and add leading zero if less than 10
    const year = $y;
    const combinedDate = `${day}${month}${year}`; // Combine day, month, and year
    setDOB(combinedDate);
  };

  console.log(dob);
  const handleAge = (e) => {
    const agePattern = /^[0-9]{2}$/; // Regular expression for 10-digit hall ticket number
    const ageValue = e.target.value;
    setAge(ageValue);
    setAgeValid(agePattern.test(ageValue));
  };

  const handleAadhar = (e) => {
    const aadharPattern = /^[0-9]{12}$/; // Regular expression for 10-digit hall ticket number
    const aadharValue = e.target.value;
    setAadhar(aadharValue);
    setAadharValid(aadharPattern.test(aadharValue));
  };

  const handleMobile = (e) => {
    const mobilePattern = /^[0-9]{10}$/;
    const mobileNoValue = e.target.value;
    setMobileNo(mobileNoValue);
    setMobileValid(mobilePattern.test(mobileNoValue));
  };

  const handleEmail = (e) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailValue = e.target.value;
    setEmail(emailValue);
    setValidEmail(emailPattern.test(emailValue));
  };
  const handleResidentialMandal = (e) => {
    const mandalPattern = /^[a-zA-Z\s-]+$/;
    const mandalValue = e.target.value;
    setMandal(mandalValue);
    setMandalValid(mandalPattern.test(mandalValue));
  };

  const handleVillage = (e) => {
    const villagePattern = /^[a-zA-Z()\s-]+$/;
    const villageValue = e.target.value;
    setVillage(villageValue);
    setVillageValid(villagePattern.test(villageValue));
  };

  const handlePinCode = (e) => {
    const pinPattern = /^[0-9]{6}$/;
    const pinValue = e.target.value;
    setPostalCode(pinValue);
    setPinValid(pinPattern.test(pinValue));
  };

  //Review Part
  const handleSubmit = (e) => {
    e.preventDefault();
    setReview(true);
  };

  const handleStudentDetailsNext = () => {
    navigate("/other/payment");
    const formData = new FormData();
    formData.append("file", file);
    formData.append("email", email);
    formData.append("iam", name);

    axios
      .post("http://localhost:8080/uploadPhoto", formData, {
        body: {
          email: email,
        },
      })
      .then((res) => {})
      .catch((err) => {});

    axios
      .post("http://localhost:8080/user_apply_personal_details", {
        name,
        dob,
        gender,
        age,
        aadhar,
        mobileNo,
        email,
        fatherName,
      })
      .then((res) => {})
      .catch((err) => {});

    axios
      .post("http://localhost:8080/user_apply_residential_details", {
        email,
        district,
        mandal,
        village,
        address,
        postalCode,
      })
      .then((res) => {})
      .catch((err) => {});
  };

  const handleEdit = () => {
    setReview(false);
  };

  const handleNextPreview = () => {
    if (!validateName()) {
      alert("Not a valid name");
    } else if (fatherName.length <= 0) {
      alert("Father name is required");
    } else if (dob.length <= 0) {
      alert("Date of Birth is required");
    } else if (gender.length <= 0) {
      alert("Gender is required");
    } else if (!ageValid || age.length <= 0) {
      alert("Not a valid age OR age required");
    } else if (!validMail || email.length <= 0) {
      alert("Not an valid Email");
    } else if (!mobileValid || mobileNo.length <= 0) {
      alert("Not a valid mobile number OR mobile number Required");
    } else if (!aadharValid || aadhar.length <= 0) {
      alert("Not a valid aadhar  OR aadhar Required");
    } else if (district.length <= 0) {
      alert("District is required");
    } else if (!mandalValid || mandal.length <= 0) {
      alert("Not a valid mandal OR Mandal is required");
    } else if (!villageValid || village.length <= 0) {
      alert("Not a valid village OR village is required");
    } else if (!pinValid || postalCode.length <= 0) {
      alert("Not a valid postalCode OR postalCode is required");
    } else {
      setReview(true);
    }
  };

  return (
    <div className="others-details-div">
      {!review ? (
        <div className="main-sub-div">
          <Typography component="h1" variant="h4" align="center">
            USER PASS Apply
          </Typography>
          <hr />
          <Typography
            variant="h6"
            gutterBottom
            style={{ margin: "20px 0", fontSize: "20px" }}
          >
            <strong>User Details</strong>
          </Typography>
          <div className="sub-divs">
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="name"
                  name="name"
                  label="Name"
                  fullWidth
                  autoComplete="given-name"
                  variant="outlined"
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="father/Guardiansname"
                  name="father/Guardiansname"
                  label="Father/Guardian's Name"
                  fullWidth
                  autoComplete="family-name"
                  variant="outlined"
                  onChange={(e) => setFatherName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker fullWidth onChange={handleDOB} />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  select
                  id="gender"
                  name="gender"
                  label="Gender"
                  fullWidth
                  autoComplete="given-name"
                  variant="outlined"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Female">Other</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="age"
                  name="age"
                  label="Age"
                  fullWidth
                  autoComplete="family-name"
                  variant="outlined"
                  onChange={handleAge}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="aadhar"
                  name="aadhar"
                  label="Aadhar"
                  fullWidth
                  autoComplete="family-name"
                  variant="outlined"
                  onChange={handleAadhar}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="mobileNo"
                  name="mobileNo"
                  label="Mobile No"
                  fullWidth
                  autoComplete="family-name"
                  variant="outlined"
                  onChange={handleMobile}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="email"
                  name="email"
                  label="Email"
                  fullWidth
                  autoComplete="family-name"
                  variant="outlined"
                  onChange={handleEmail}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="photo"
                  name="photo"
                  label="Photo"
                  type="file"
                  fullWidth
                  autoComplete="family-name"
                  variant="outlined"
                  onChange={(e) => setFile(e.target.files[0])}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </Grid>
          </div>
          <hr />
          <Typography
            variant="h6"
            gutterBottom
            style={{
              marginTop: "40px",
              marginBottom: "20px",
              fontSize: "20px",
            }}
          >
            <strong>Residential Address Details</strong>
          </Typography>
          <div className="sub-divs">
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  select
                  id="district"
                  name="district"
                  label="District"
                  fullWidth
                  autoComplete="given-name"
                  variant="outlined"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                >
                  <MenuItem value="Adilabad">Adilabad</MenuItem>
                  <MenuItem value="BhadradriKothagudem">
                    Bhadradri Kothagudem
                  </MenuItem>
                  <MenuItem value="Hyderabad">Hyderabad</MenuItem>
                  <MenuItem value="Jagtial">Jagtial</MenuItem>
                  <MenuItem value="Jayashankar">Jayashankar</MenuItem>
                  <MenuItem value="JogulambaGadwal">Jogulamba Gadwal</MenuItem>
                  <MenuItem value="Kamareddy">Kamareddy</MenuItem>
                  <MenuItem value="Karimnagar">Karimnagar</MenuItem>
                  <MenuItem value="Khammam">Khammam</MenuItem>
                  <MenuItem value="Kumuram Bheem">Kumuram Bheem</MenuItem>
                  <MenuItem value="Mahabubabad">Mahabubabad</MenuItem>
                  <MenuItem value="Mahabubnagar">Mahabubnagar</MenuItem>
                  <MenuItem value="Mancherial">Mancherial</MenuItem>
                  <MenuItem value="Medak">Medak</MenuItem>
                  <MenuItem value="MedchalMalkajgiri">
                    Medchal-Malkajgiri
                  </MenuItem>
                  <MenuItem value="Mulugu">Mulugu</MenuItem>
                  <MenuItem value="Nagarkurnool">Nagarkurnool</MenuItem>
                  <MenuItem value="Nalgonda">Nalgonda</MenuItem>
                  <MenuItem value="Narayanpet">Narayanpet</MenuItem>
                  <MenuItem value="Nirmal">Nirmal</MenuItem>
                  <MenuItem value="Nizamabad">Nizamabad</MenuItem>
                  <MenuItem value="Peddapalli">Peddapalli</MenuItem>
                  <MenuItem value="RajannaSiricilla">
                    Rajanna Siricilla
                  </MenuItem>
                  <MenuItem value="Rangareddy">Rangareddy</MenuItem>
                  <MenuItem value="Sangareddy">Sangareddy</MenuItem>
                  <MenuItem value="Siddipet">Siddipet</MenuItem>
                  <MenuItem value="Suryapet">Suryapet</MenuItem>
                  <MenuItem value="Vikarabad">Vikarabad</MenuItem>
                  <MenuItem value="Wanaparthy">Wanaparthy</MenuItem>
                  <MenuItem value="Warangal Urban">Warangal Urban</MenuItem>
                  <MenuItem value="WarangalRural">Warangal Rural</MenuItem>
                  <MenuItem value="YadadriBhuvanagiri">
                    Yadadri Bhuvanagiri
                  </MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="mandal"
                  name="mandal"
                  label="Mandal"
                  fullWidth
                  autoComplete="given-name"
                  variant="outlined"
                  onChange={handleResidentialMandal}
                ></TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="village"
                  name="village"
                  label="Village"
                  fullWidth
                  autoComplete="family-name"
                  variant="outlined"
                  onChange={handleVillage}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  id="address"
                  name="address"
                  label="Address(complete address)"
                  fullWidth
                  autoComplete="family-name"
                  variant="outlined"
                  onChange={(e) => setAddress(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="postalCode"
                  name="postalCode"
                  label="Postal Code"
                  fullWidth
                  autoComplete="family-name"
                  variant="outlined"
                  onChange={handlePinCode}
                />
              </Grid>
            </Grid>
          </div>
          <Button
            type="text"
            onClick={handleNextPreview}
            variant="contained"
            style={{ marginBottom: "5px" }}
          >
            Next To Preview
          </Button>
        </div>
      ) : (
        <div
          style={{
            textAlign: "left",
            display: "flex",
            flexDirection: "column",
            borderRadius: "10px",
            backgroundColor: "white",
            padding: "25px",
            margin: "20px",
          }}
        >
          <Typography
            variant="h6"
            gutterBottom
            style={{
              marginTop: "10px",
              marginBottom: "40px",
              textAlign: "center",
              fontSize: "2rem",
            }}
          >
            <strong>APPLICATION</strong>
          </Typography>
          <div style={{ display: "flex", flex: 1, margin: "20px" }}>
            <div style={{ flex: 1, margin: "20px" }}>
              <TableContainer component={Paper}>
                <Typography
                  variant="h5"
                  gutterBottom
                  style={{
                    marginLeft: "25%",
                    fontSize: "20px",
                  }}
                >
                  Student Details
                </Typography>
                <Table>
                  <TableHead style={{ backgroundColor: "#f2f2f2" }}>
                    <TableRow>
                      <TableCell>
                        <strong>Name</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Value</strong>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>{name}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Father/ Guardian Name</TableCell>
                      <TableCell>{fatherName}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Date of Birth</TableCell>
                      <TableCell>{dob}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Gender</TableCell>
                      <TableCell>{gender}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Age</TableCell>
                      <TableCell>{age}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Aadhar</TableCell>
                      <TableCell>{aadhar}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Mobile No</TableCell>
                      <TableCell>{mobileNo}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Email</TableCell>
                      <TableCell>{email}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
            <div style={{ flex: 1, margin: "20px" }}>
              <TableContainer component={Paper}>
                <Typography
                  variant="h5"
                  gutterBottom
                  style={{
                    marginLeft: "25%",
                    fontSize: "20px",
                  }}
                >
                  Residential Address Details
                </Typography>
                <Table>
                  <TableHead style={{ backgroundColor: "#f2f2f2" }}>
                    <TableRow>
                      <TableCell>
                        <strong>Name</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Value</strong>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>District</TableCell>
                      <TableCell>{district}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Mandal</TableCell>
                      <TableCell>{mandal}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Village</TableCell>
                      <TableCell>{village}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Address</TableCell>
                      <TableCell>{address}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Postal Code</TableCell>
                      <TableCell>{postalCode}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
          <div style={{ margin: "auto" }}>
            <Button
              type="text"
              onClick={handleEdit}
              style={{ marginRight: "8px" }}
              variant="outlined"
            >
              Edit
            </Button>
            <Button
              type="text"
              onClick={handleStudentDetailsNext}
              variant="outlined"
            >
              NEXT
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
