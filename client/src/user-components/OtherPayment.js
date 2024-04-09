import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Button,  MenuItem } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../style.css";
import { useAuth0 } from "@auth0/auth0-react";

export default function OtherPayment() {
  const [showAmount, setShowAmount] = useState(false);
  const [routeDetails, setRouteDetails] = useState([]);
  const [cost, setCost] = useState(0);
  const [paymentStatus, setPaymentStatus] = useState(false);
  const [status, setStatus] = useState("pending");
  const [applicationType, setApplicationType] = useState("other");

  const navigate = useNavigate();
//   const { user } = useAuth0();
  const appEmail = localStorage.getItem("email");

  //Payment and Route State variables
  const [passType, setPassType] = useState("");
  const [custom, setCustom] = useState(0);
  const [routeAmount, setRouteAmount] = useState(0);
  const [fromplace, setFromPlace] = useState("");
  const [toplace, setToPlace] = useState("");
  const [handleCustom, setHandleCustom] = useState(false);
  const [months, setMonths] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [payButton, setPayButton] = useState(false);
  const [imgUrl, setImgUrl] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  React.useEffect(() => {
    if (passType === "custom") {
      setHandleCustom(true);
    } else {
      setHandleCustom(false);
    }
  }, [passType]);

  React.useEffect(() => {
    setMonths(months);
    setRouteAmount(routeAmount);
    setTotalAmount(totalAmount);
  }, [months, routeAmount, totalAmount]);

  React.useEffect(() => {
    handleCheckCost();
  }, [months, routeAmount, totalAmount]);

  const handleCheckCost = () => {
    setShowAmount(true);

    axios
      .get("http://localhost:8080/routeCost")
      .then((result) => setRouteDetails(result.data))
      .then(() => {
        routeDetails.map((route) => {
          if (route.fromplace === fromplace && route.Toplace === toplace) {
            setRouteAmount(route.Amount);
          }
        });
      })

      .catch((err) => {});

    if (passType === "year") {
      setMonths(12);
      setTotalAmount(routeAmount * months);
    } else if (passType === "half") {
      setMonths(6);
      setTotalAmount(routeAmount * months);
    } else if (passType === "quarter") {
      setMonths(3);
      setTotalAmount(routeAmount * months);
    } else {
      setMonths(custom);
      setTotalAmount(routeAmount * months);
    }

    if (totalAmount !== 0) {
      setPayButton(true);
    }
  };

  const handlePay = () => {
    const email = localStorage.getItem("applcationMail");
    const wallent = localStorage.getItem("wallet");

    if (totalAmount > wallent) {
      alert("Insufficient Balnce - UPDATE WALLET");
      return;
    }

    if (`${totalAmount}` === `${cost}`) {
      axios
        .put(`http://localhost:8080/payment/${appEmail}`, { cost })
        .then((result) => {
          setPaymentStatus(true);
          navigate("/other/payment/status");
        })
        .catch((err) => {});
      axios
        .post("http://localhost:8080/applicaiton_emails", {
          email,
          fromplace,
          toplace,
          months,
          status,
          applicationType,
          imgUrl,
          startDate,
          endDate,
        })
        .then((res) => {})
        .catch((err) => {});
    } else {
      alert("Enter correct total amount");
    }
  };


  return (
    <React.Fragment>
      <div className="payment-div">
        <Typography variant="h6" gutterBottom style={{ fontSize: "2rem" }}>
          PAYMENT
        </Typography>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            select
            id="passtype"
            name="passtype"
            label="PASS Type"
            fullWidth
            autoComplete="given-name"
            variant="outlined"
            onChange={(e) => setPassType(e.target.value)}
            className="payment-textfield"
            value={passType}
            style={{ marginTop: "10px" }}
          >
            <MenuItem value="year">year</MenuItem>
            <MenuItem value="half">half</MenuItem>
            <MenuItem value="quarter">quarter</MenuItem>
            <MenuItem value="custom">custom</MenuItem>
          </TextField>
        </Grid>
        {handleCustom && (
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="custom"
              name="custom"
              label="Custom"
              fullWidth
              autoComplete="given-name"
              variant="outlined"
              onChange={(e) => setCustom(e.target.value)}
              className="payment-textfield"
              style={{ marginTop: "10px", marginBottom: "10px" }}
            ></TextField>
          </Grid>
        )}
        {!paymentStatus && (
          <Typography
            variant="h6"
            gutterBottom
            style={{
              marginTop: "40px",
              marginBottom: "10px",
              fontSize: "20px",
            }}
          >
            <strong>Route Details</strong>
          </Typography>
        )}
        <Grid item xs={12} sm={6}>
          <TextField
            id="fromplace"
            name="fromplace"
            label="From Place"
            fullWidth
            autoComplete="family-name"
            variant="outlined"
            onChange={(e) => setFromPlace(e.target.value)}
            className="payment-textfield"
            style={{ marginTop: "10px", marginBottom: "10px" }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="toplace"
            name="toplace"
            label="To Place"
            fullWidth
            autoComplete="family-name"
            variant="outlined"
            onChange={(e) => setToPlace(e.target.value)}
            className="payment-textfield"
            style={{ marginTop: "10px", marginBottom: "10px" }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button
            type="text"
            onClick={handleCheckCost}
            variant="outlined"
            style={{ marginTop: "10px", marginBottom: "10px" }}
          >
            Check Cost
          </Button>
        </Grid>
        {!paymentStatus && showAmount && (
          <Grid item xs={12} sm={12}>
            <p style={{ textAlign: "center", color: "red" }}>
              For your pass you need to pay <strong>{totalAmount}</strong>{" "}
              rupees!!!{" "}
            </p>
          </Grid>
        )}
        <Grid item xs={12} sm={3}>
          <TextField
            type="decimal"
            id="cost"
            name="cost"
            label="Total Amount"
            fullWidth
            onChange={(e) => setCost(e.target.value)}
            className="payment-textfield"
            style={{ marginTop: "10px", marginBottom: "10px" }}
          />
        </Grid>
        <Grid item xs={12} sm={9}></Grid>
        <Grid item xs={12} sm={3}>
          <Button
            type="text"
            onClick={handlePay}
            disabled={!payButton}
            variant="outlined"
            style={{ marginTop: "10px", marginBottom: "10px" }}
          >
            PAY
          </Button>
        </Grid>
      </div>
    </React.Fragment>
  );
}
