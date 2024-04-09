import {
  Button,
  Table,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Paper,
  Typography,
  TableBody,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

function ViewPass() {
  const [viewMail, setViewMail] = useState("");
  const [status, setStatus] = useState("");
  const [viewStatusData, setViewStatusData] = useState([]);
  const [nameDetails, setNameDetails] = useState([]);
  const [pending, setPending] = useState(false);
  const [failed, setFailed] = useState(false);
  const [success, setSuccess] = useState(false);
  const [profile, setProfile] = useState(null);
  const [qr, setQr] = useState("");
  const [appType, setAppType] = useState("");

  // Pass Details

  const [name, setName] = useState("");
  const [fromPlace, setFromPlace] = useState("");
  const [toPlace, setToPlace] = useState("");

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleView = () => {
    axios
      .get(`http://localhost:8080/getStatus/${viewMail}`)
      .then((res) => {
        setViewStatusData(res.data);
        setStatus(res.data.status);
        setQr(res.data.imgUrl);
        setFromPlace(res.data.fromplace);
        setToPlace(res.data.toplace);
        setStartDate(res.data.startDate);
        setEndDate(res.data.endDate);
        setAppType(res.data.applicationType);
      })
      .catch((err) => {});

    axios
      .get(`http://localhost:8080/getImage/${viewMail}`)
      .then((res) => setProfile(res.data.imageurl))
      .catch((err) => {});
  };

  useEffect(() => {
    if (appType === "student") {
      axios
        .get(`http://localhost:8080/getName/${viewMail}`)
        .then((res) => {
          setNameDetails(res.data);

          setName(res.data.name);
        })
        .catch((err) => {});
    }

    if (appType === "other") {
      axios
        .get(`http://localhost:8080/getNameOther/${viewMail}`)
        .then((res) => {
          setNameDetails(res.data);

          setName(res.data.name);
        })
        .catch((err) => {});
    }
  }, [appType]);

  useEffect(() => {
    if (status === "pending") {
      setPending(true);
    } else if (status === "failed") {
      setFailed(true);
    } else if (status === "success") {
      setSuccess(true);
    }
  }, [status]);

  const link = `http://localhost:8080/uploads/${profile}`;

  return (
    <div style={{ backgroundColor: "#fff", margin: "50px", padding: "50px" }}>
      <Typography
        variant="h5"
        gutterBottom
        style={{
          fontSize: "20px",
          marginTop: "10px",
          marginBottom: "40PX",
        }}
      >
        ENTER MAIL TO VIEW PASS
      </Typography>
      <TextField
        placeholder="enter mail"
        type="text"
        required
        onChange={(e) => setViewMail(e.target.value)}
        style={{ width: "50%", marginBottom: "20px" }}
      ></TextField>{" "}
      <br />
      <Button variant="contained" color="inherit" onClick={handleView}>
        VIEW
      </Button>
      {pending && (
        <div>
          <h4>YOUR APPLICATION STILL PENDING</h4>
        </div>
      )}
      {failed && (
        <div style={{ color: "red" }}>
          <h4>YOUR APPLICATION HAS REJECTED</h4>
          <h4>Please Re-apply</h4>
        </div>
      )}
      {success && (
        <div style={{ color: "green", backgroundColor: "#fff" }}>
          <h4>YOUR APPLICATION SUCCESS</h4>
          <br />
          <br />
          <div
            style={{
              backgroundColor: "#fff",
              margin: "auto 25%",
              border: "1px solid black",
            }}
          >
            <div style={{ padding: "20px" }}>
              <div style={{ width: "50%", float: "left", padding: "20px" }}>
                <img
                  src={link}
                  style={{
                    height: "150px",
                    width: "150px",
                    // textAlign: "end",
                  }}
                  alt="images"
                />
              </div>
              <div style={{ width: "50%", float: "left", padding: "20px" }}>
                <img
                  src={qr}
                  style={{
                    height: "150px",
                    width: "150px",
                    // textAlign: "end",
                  }}
                  alt="QR"
                />
              </div>
            </div>
            <div>
              <TableContainer component={Paper}>
                <Typography
                  variant="h5"
                  gutterBottom
                  style={{
                    // marginLeft: "25%",
                    fontSize: "20px",
                  }}
                >
                  <strong>BUSS PASS</strong>
                </Typography>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <TableCell>
                          <strong>Name</strong>{" "}
                        </TableCell>
                      </TableCell>
                      <TableCell>
                        <TableCell>
                          <strong>{name}</strong>
                        </TableCell>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <TableCell>
                          <strong>Email</strong>
                        </TableCell>
                      </TableCell>
                      <TableCell>
                        <TableCell>
                          <strong>{viewMail}</strong>
                        </TableCell>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <TableCell>
                          <strong>Form</strong>
                        </TableCell>
                        <TableCell>
                          <strong>{fromPlace}</strong>
                        </TableCell>
                      </TableCell>
                      <TableCell>
                        <TableCell>
                          <strong>To</strong>
                        </TableCell>
                        <TableCell>
                          <strong>{toPlace}</strong>
                        </TableCell>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <TableCell>
                          <strong>Start Date</strong>
                        </TableCell>
                        <TableCell>
                          <strong>{startDate}</strong>
                        </TableCell>
                      </TableCell>
                      <TableCell>
                        <TableCell>
                          <strong>End Date</strong>
                        </TableCell>
                        <TableCell>
                          <strong>{endDate}</strong>
                        </TableCell>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewPass;
