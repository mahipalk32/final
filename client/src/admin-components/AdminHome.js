import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Button,
  Typography,
} from "@mui/material";

const AdminHome = () => {
  const [mailsData, setMailsData] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  //Student Education details
  const [sscBoard, setSSCBoard] = useState("");
  const [sscType, setSSCType] = useState("");
  const [sscPassYear, setSSCPassYear] = useState("");
  const [sscHallTicket, setSSCHallTicket] = useState("");
  const [dob, setDOB] = useState("");

  //Student Details
  const [name, setName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [mobileNo, setMobileNo] = useState(0);
  const [email, setEmail] = useState("");
  const [aadhar, setAadhar] = useState("");
  const [file, setFile] = useState(null);
  localStorage.setItem("applcationMail", email);

  //Residential Adress Details
  const [district, setDistrict] = useState("");
  const [mandal, setMandal] = useState("");
  const [village, setVillage] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [applicationType, setApplicationType] = useState("")

  //Institutional Details
  const [districtInstitution, setDistrictInstitution] = useState("");
  const [mandalInstitution, setMandalInstitution] = useState("");
  const [institutionname, setInstitutionName] = useState("");
  const [coursename, setCourseName] = useState("");
  const [admissionnumber, setAdmissionNumber] = useState("");
  const [addressInstitution, setAddressInstitution] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/application_mails")
      .then((res) => {
        setMailsData(res.data);
      })
      .catch((err) => {});
  }, []);

  const handleView = (user) => {
    setShowDetails(true);
    setApplicationType(user.applicationType)

    if (user.applicationType === "student") {
      axios
        .get(
          `http://localhost:8080/student-apply-personal-details/${user.email}`
        )
        .then((res) => {
          setName(res.data.name);
          setFatherName(res.data.fatherName);
          setGender(res.data.gender);
          setAge(res.data.age);
          setMobileNo(res.data.mobileNo);
          setEmail(res.data.email);
          setAadhar(res.data.aadhar);
          setDOB(res.data.dob)
        })

        .catch((err) => {});

      axios
        .get(
          `http://localhost:8080/student-apply-study-details/${user.email}`
        )
        .then((res) => {
          setSSCType(res.data.sscType);
          setSSCBoard(res.data.sscBoard);
          setSSCPassYear(res.data.sscPassYear);
          setSSCHallTicket(res.data.sscHallTicket);
          setDOB(res.data.dob);
        })
        .catch((err) => {});

      // axios.get(`http://localhost:8080/student-apply-insitution-details/${user.email}`)

      //   .then((res) => {
      //     setDistrictInstitution(res.data.)
      //     setMandalInstitution(res.data.)
      //     setInstitutionName(res.data.)
      //     setCourseName(res.data.)
      //     setAdmissionNumber(res.data.)
      //     setAddressInstitution(res.data.)
      //   })
      //   .catch((err) => console.log(err))

      axios
        .get(
          `http://localhost:8080/student-apply-residential-details/${user.email}`
        )
        .then((res) => {
          setDistrict(res.data.district);
          setMandal(res.data.mandal);
          setVillage(res.data.village);
          setAddress(res.data.address);
          setPostalCode(res.data.postalCode);
        })
        .catch((err) => {});

      axios
        .get(`http://localhost:8080/getImage/${user.email}`)
        .then((res) => setImageUrl(res.data.imageurl))
        .catch((err) => {});
    }
    if (user.applicationType === "other") {
      axios
        .get(
          `http://localhost:8080/other-personal-details/${user.email}`
        )
        .then((res) => {
          setName(res.data.name);
          setFatherName(res.data.fatherName);
          setGender(res.data.gender);
          setAge(res.data.age);
          setMobileNo(res.data.mobileNo);
          setEmail(res.data.email);
          setAadhar(res.data.aadhar);
          setDOB(res.data.dob)
        })

        .catch((err) => {});

        axios
        .get(
          `http://localhost:8080/other-residential-details/${user.email}`
        )
        .then((res) => {
          setDistrict(res.data.district);
          setMandal(res.data.mandal);
          setVillage(res.data.village);
          setAddress(res.data.address);
          setPostalCode(res.data.postalCode);
        })
        .catch((err) => {});

        axios
        .get(`http://localhost:8080/getImage/${user.email}`)
        .then((res) => setImageUrl(res.data.imageurl))
        .catch((err) => {});
    }
  };
  
  const link = `http://localhost:8080/uploads/${imageUrl}`;
  const hello = (stat) => {
    if (stat === "failed" || stat === "success") {
      return false;
    } else {
      return true;
    }
  };

  const handleFail = () => {
    setShowDetails(false);
    let newStatus = "failed";

    axios
      .put(`http://localhost:8080/statusUpdate/${email}`, {
        newStatus,
      })
      .then((res) => {})
      .catch((err) => {});
  };

  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate("/qrgeneration");
    let newStatus = "success";
    axios
      .put(`http://localhost:8080/statusUpdate/${email}`, {
        newStatus,
      })
      .then((res) => {})
      .catch((err) => {});
  };

  return (
    <div style={{ margin: "50px" }}>
      {!showDetails ? (
        <div>
          <h2>USER APPLICATIONS</h2>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{ textAlign: "center" }}>
                    <strong>Application email</strong>
                  </TableCell>
                  <TableCell style={{ textAlign: "center" }}>
                    <strong>View Application</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mailsData && mailsData.length > 0 ? (
                  mailsData.map((data, index) => (
                    <TableRow key={index}>
                      {hello(data.status) && (
                        <TableCell
                          style={{ cursor: "pointer", textAlign: "center" }}
                        >
                          {data.email}
                        </TableCell>
                      )}
                      {hello(data.status) && (
                        <TableCell
                          style={{
                            cursor: "pointer",
                            justifyContent: "center",
                            textAlign: "center",
                            alignItems: "center",
                          }}
                        >
                          <Button
                            variant="contained"
                            color="inherit"
                            onClick={() => handleView(data)}
                          >
                            View
                          </Button>
                        </TableCell>
                      )}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4}>No data available</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
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
            variant="h5"
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
          <img src={file} alt="" />
          <div style={{ display: "flex", flex: 1 }}>
            {
              applicationType === "student" ? <><div style={{ flex: 1, margin: "20px" }}>
              <TableContainer component={Paper}>
                <Typography
                  variant="h5"
                  gutterBottom
                  style={{
                    marginLeft: "25%",
                    fontSize: "20px",
                  }}
                >
                  Student Education Details
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
                      <TableCell>SSC Board</TableCell>
                      <TableCell>{sscBoard}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>SSC(Regular/ Supplimentary)</TableCell>
                      <TableCell>{sscType}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>SSC Pass Year</TableCell>
                      <TableCell>{sscPassYear}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>SSC Hall Ticket</TableCell>
                      <TableCell>{sscHallTicket}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Date of Birth</TableCell>
                      <TableCell>{dob}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </div></> : <></>
            }
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
          <div style={{ display: "flex", flex: 1 }}>
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
                  {
                    applicationType === "student" ? <label>Student Details</label> : <label>Other Details</label>
                  }
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
              <Typography
                variant="h5"
                gutterBottom
                style={{
                  fontSize: "20px",
                }}
              >
                Profile Photo
              </Typography>
              <img
                src={link}
                style={{ height: "150px", width: "150px", textAlign: "center" }}
                alt="images"
              />
            </div>
          </div>
          <div style={{ margin: "auto" }}>
            <Button
              type="text"
              variant="contained"
              style={{ marginRight: "8px" }}
              color="success"
              onClick={handleSuccess}
            >
              Success
            </Button>
            <Button
              type="text"
              variant="contained"
              color="info"
              onClick={handleFail}
            >
              failed
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
export default AdminHome;
