import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function VerifyPass() {
  const location = useLocation();
  const [email, setEmail] = useState(null);

  const [profile, setProfile] = useState(null);
  const [qr, setQr] = useState("");
  const [name, setName] = useState("");
  const [fromPlace, setFromPlace] = useState("");
  const [toPlace, setToPlace] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    setEmail(searchParams.get("email"));
  }, [location]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const statusResponse = await axios.get(
          `http://localhost:8080/getStatus/${email}`
        );
        setQr(statusResponse.data.imgUrl);
        setFromPlace(statusResponse.data.fromplace);
        setToPlace(statusResponse.data.toplace);
        setStartDate(statusResponse.data.startDate);
        setEndDate(statusResponse.data.endDate);

        const imageResponse = await axios.get(
          `http://localhost:8080/getImage/${email}`
        );
        setProfile(imageResponse.data.imageurl);

        if (statusResponse.data.applicationType === "student") {
          const nameResponse = await axios.get(
            `http://localhost:8080/getName/${email}`
          );
          setName(nameResponse.data.name);
        }

        if (statusResponse.data.applicationType === "other") {
          const nameResponse = await axios.get(
            `http://localhost:8080/getNameOther/${email}`
          );
          setName(nameResponse.data.name);
        }
      } catch (error) {
        // Handle errors
        console.error(error);
      }
    };

    fetchData();
  }, [email]);

  const link = `http://localhost:8080/uploads/${profile}`;
  return (
    <div>
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
                      <strong>{email}</strong>
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
  );
}

export default VerifyPass;
