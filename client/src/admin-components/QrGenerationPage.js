// import React, { useEffect, useState } from "react";
// import { Button, TextField, Typography } from "@mui/material";
// import QRcode from "qrcode";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const QrGenerationPage = () => {
//   const [url, setUrl] = useState("");
//   const [qrUrl, setQrUrl] = useState("");
//   const navigate = useNavigate();
//   const [appData, setAppData] = useState([]);

//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);
//   const [currentDate, setCurrentDate] = useState(new Date());
//   const [futureDate, setFutureDate] = useState(null);

//   const formatDate = (date) => {
//     if (!date) return "";
//     const options = { month: "long", day: "numeric", year: "numeric" };
//     return date.toLocaleDateString(undefined, options);
//   };

//   const handleGenerate = async () => {
//     try {
//       const response = await QRcode.toDataURL(url);
//       setQrUrl(response);
//       const newDate = new Date(currentDate);
//       newDate.setMonth(newDate.getMonth() + 6);
//       setFutureDate(newDate);
//       setStartDate(formatDate(currentDate));
//       setEndDate(formatDate(futureDate));
//     } catch (err) {}
//   };

//   useEffect(() => {
//     setStartDate(formatDate(currentDate));
//   }, [currentDate]);

//   useEffect(() => {
//     setEndDate(formatDate(futureDate));
//   }, [futureDate]);

//   const email = localStorage.getItem("applcationMail");
//   const passUrl = `https://passverifier.netlify.app/login`;

//   const handleDone = async () => {
//     await axios
//       .put(`http://localhost:8080/qrUrlUpdate/${email}`, { qrUrl })
//       .then((res) => {})
//       .catch((err) => {});

//     await axios
//       .put(`http://localhost:8080/dateUpdate/${email}`, {
//         startDate,
//         endDate,
//       })
//       .then((res) => {})
//       .catch((err) => {});

//     await axios
//       .get(`http://localhost:8080/appDetails/${email}`)
//       .then((res) => {
//         setAppData(res.data);
//       })
//       .catch((err) => {});
//     navigate("/admin-portal");
//   };

//   console.log(appData)

//   return (
//     <div style={{ backgroundColor: "#fff", margin: "20px 200px" }}>
//       <Typography
//         variant="h5"
//         gutterBottom
//         style={{
//           fontSize: "20px",
//           padding: "30px 0",
//         }}
//       >
//         QR GENERATION
//       </Typography>
//       <label style={{ marginBottom: "0px" }}>{passUrl} </label>
//       <br />
//       <TextField
//         placeholder="paste url link"
//         onChange={(e) => setUrl(e.target.value)}
//         style={{ marginTop: "30px", marginBottom: "20px" }}
//       ></TextField>{" "}
//       <br />
//       <Button variant="contained" color="info" onClick={handleGenerate}>
//         Generate
//       </Button>{" "}
//       <br />
//       <br />
//       {qrUrl ? (
//         <div>
//           <a href={qrUrl} download>
//             <img src={qrUrl} alt="QR" />
//           </a>{" "}
//           <br />
//           <Button
//             style={{ marginBottom: "30px" }}
//             variant="contained"
//             color="success"
//             onClick={handleDone}
//           >
//             Done
//           </Button>
//         </div>
//       ) : null}
//     </div>
//   );
// };

// export default QrGenerationPage;

// import React, { useEffect, useState } from "react";
// import { Button, Typography } from "@mui/material";
// import QRcode from "qrcode";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { v4 as uuidv4 } from "uuid";

// const QrGenerationPage = () => {
//   const [url, setUrl] = useState("");
//   const [qrUrl, setQrUrl] = useState("");
//   const navigate = useNavigate();
//   const [appData, setAppData] = useState([]);
//   const [passId, setPassId] = useState(null);

//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);
//   const [currentDate, setCurrentDate] = useState(new Date());
//   const [futureDate, setFutureDate] = useState(null);
//   const email = localStorage.getItem("applcationMail");

//   const formatDate = (date) => {
//     if (!date) return "";
//     const options = { month: "long", day: "numeric", year: "numeric" };
//     return date.toLocaleDateString(undefined, options);
//   };

//   const handleGenerate = async () => {
//     try {
//       const newDate = new Date(currentDate);
//       newDate.setMonth(newDate.getMonth() + 6);
//       setFutureDate(newDate);
//       setStartDate(formatDate(currentDate));
//       setEndDate(formatDate(futureDate));

//       // Update date information on the server
//       await axios.put(`http://localhost:8080/dateUpdate/${email}`, {
//         startDate: formatDate(currentDate),
//         endDate: formatDate(newDate),
//       });

//       // Fetch application details
//       const response = await axios.get(`http://localhost:8080/appDetails/${email}`);
//       setAppData(response.data);

//       // Generate QR code
//       const passIdentifier = uuidv4();
//       setPassId(passIdentifier);
//       const qrCodeData = JSON.stringify({
//         passId: passIdentifier,
//         appData: response.data,
//       });
//       const qrCodeUrl = await QRcode.toDataURL(qrCodeData);
//       setQrUrl(qrCodeUrl);

//       // Update QR code URL on the server
//       await axios.put(`http://localhost:8080/qrUrlUpdate/${email}`, { qrUrl: qrCodeUrl });
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     setStartDate(formatDate(currentDate));
//   }, [currentDate]);

//   useEffect(() => {
//     setEndDate(formatDate(futureDate));
//   }, [futureDate]);

//   const handleDone = async () => {
//     navigate("/admin-portal");
//   };

//   return (
//     <div style={{ backgroundColor: "#fff", margin: "20px 200px" }}>
//       <Typography
//         variant="h5"
//         gutterBottom
//         style={{
//           fontSize: "20px",
//           padding: "30px 0",
//         }}
//       >
//         QR GENERATION
//       </Typography>
//       <Button variant="contained" color="info" onClick={handleGenerate}>
//         Generate QR Code
//       </Button>
//       {qrUrl && (
//         <div>
//           <img src={qrUrl} alt="QR Code" style={{ width: "200px", height: "200px" }} />
//           <Button variant="contained" color="success" onClick={handleDone}>
//             Done
//           </Button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default QrGenerationPage;

// import React, { useEffect, useState } from "react";
// import { Button, Typography } from "@mui/material";
// import QRcode from "qrcode";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { v4 as uuidv4 } from "uuid";

// const QrGenerationPage = () => {
//   const [qrUrl, setQrUrl] = useState("");
//   const navigate = useNavigate();
//   const [appData, setAppData] = useState([]);
//   const email = localStorage.getItem("applcationMail");
//   const [passId, setPassId] = useState(null);
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);
//   const [currentDate, setCurrentDate] = useState(new Date());
//   const [futureDate, setFutureDate] = useState(null);
//   const [profileImage, setProfileImage] = useState(null);

//   const formatDate = (date) => {
//     if (!date) return "";
//     const options = { month: "long", day: "numeric", year: "numeric" };
//     return date.toLocaleDateString(undefined, options);
//   };

//   const handleGenerate = async () => {
//     try {
//       const newDate = new Date(currentDate);
//       newDate.setMonth(newDate.getMonth() + 6);
//       setFutureDate(newDate);
//       setStartDate(formatDate(currentDate));
//       setEndDate(formatDate(newDate));

//       // Update date information on the server
//       await axios.put(`http://localhost:8080/dateUpdate/${email}`, {
//         startDate: formatDate(currentDate),
//         endDate: formatDate(newDate),
//       });

//       // Fetch application details
//       const response = await axios.get(
//         `http://localhost:8080/appDetails/${email}`
//       );
//       setAppData(response.data);

//       const profile = await axios.get(
//         `http://localhost:8080/getImage/${email}`
//       );

//       // Generate QR code data
//       const passIdentifier = uuidv4();
//       setPassId(passIdentifier);
//       const qrCodeData = {
//         passId: passIdentifier,
//         email: email,
//         name: response.data.name,
//         fromplace: response.data.fromplace,
//         toplace: response.data.toplace,
//         startDate: formatDate(currentDate),
//         endDate: formatDate(newDate),
//         profile: profile.data.imageurl,
//       };

//       // Convert QR code data to URL
//       const qrCodeUrl = await QRcode.toDataURL(JSON.stringify(qrCodeData));
//       setQrUrl(qrCodeUrl);

//       // Update QR code URL on the server
//       await axios.put(`http://localhost:8080/qrUrlUpdate/${email}`, {
//         qrUrl: qrCodeUrl,
//       });
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     setStartDate(formatDate(currentDate));
//   }, [currentDate]);

//   useEffect(() => {
//     setEndDate(formatDate(futureDate));
//   }, [futureDate]);

//   const handleDone = async () => {
//     navigate("/admin-portal");
//   };

//   return (
//     <div style={{ backgroundColor: "#fff", margin: "20px 200px" }}>
//       <Typography
//         variant="h5"
//         gutterBottom
//         style={{
//           fontSize: "20px",
//           padding: "30px 0",
//         }}
//       >
//         QR GENERATION
//       </Typography>
//       <Button variant="contained" color="info" onClick={handleGenerate}>
//         Generate QR Code
//       </Button>
//       {qrUrl && (
//         <div>
//           <img
//             src={qrUrl}
//             alt="QR Code"
//             style={{ width: "200px", height: "200px" }}
//           />
//           <Button variant="contained" color="success" onClick={handleDone}>
//             Done
//           </Button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default QrGenerationPage;


import React, { useEffect, useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import QRcode from "qrcode";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const QrGenerationPage = () => {
  const [url, setUrl] = useState("");
  const [qrUrl, setQrUrl] = useState("");
  const navigate = useNavigate();
  const [appData, setAppData] = useState([]);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [futureDate, setFutureDate] = useState(null);

  const formatDate = (date) => {
    if (!date) return "";
    const options = { month: "long", day: "numeric", year: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  const handleGenerate = async () => {
    try {
      const urlWithEmail = `${url}?email=${email}`
      console.log(urlWithEmail)
      const response = await QRcode.toDataURL(urlWithEmail);
      setQrUrl(response);
      const newDate = new Date(currentDate);
      newDate.setMonth(newDate.getMonth() + 6);
      setFutureDate(newDate);
      setStartDate(formatDate(currentDate));
      setEndDate(formatDate(futureDate));
    } catch (err) {}
  };

  useEffect(() => {
    setStartDate(formatDate(currentDate));
  }, [currentDate]);

  useEffect(() => {
    setEndDate(formatDate(futureDate));
  }, [futureDate]);

  const email = localStorage.getItem("applcationMail");
  const passUrl = `https://passverifier.netlify.app/login`;

  const handleDone = async () => {
    await axios
      .put(`http://localhost:8080/qrUrlUpdate/${email}`, { qrUrl })
      .then((res) => {})
      .catch((err) => {});

    await axios
      .put(`http://localhost:8080/dateUpdate/${email}`, {
        startDate,
        endDate,
      })
      .then((res) => {})
      .catch((err) => {});

    await axios
      .get(`http://localhost:8080/appDetails/${email}`)
      .then((res) => {
        setAppData(res.data);
      })
      .catch((err) => {});
    navigate("/admin-portal");
  };

  console.log(appData)

  return (
    <div style={{ backgroundColor: "#fff", margin: "20px 200px" }}>
      <Typography
        variant="h5"
        gutterBottom
        style={{
          fontSize: "20px",
          padding: "30px 0",
        }}
      >
        QR GENERATION
      </Typography>
      <label style={{ marginBottom: "0px" }}>{passUrl} </label>
      <br />
      <TextField
        placeholder="paste url link"
        onChange={(e) => setUrl(e.target.value)}
        style={{ marginTop: "30px", marginBottom: "20px" }}
      ></TextField>{" "}
      <br />
      <Button variant="contained" color="info" onClick={handleGenerate}>
        Generate
      </Button>{" "}
      <br />
      <br />
      {qrUrl ? (
        <div>
          <a href={qrUrl} download>
            <img src={qrUrl} alt="QR" />
          </a>{" "}
          <br />
          <Button
            style={{ marginBottom: "30px" }}
            variant="contained"
            color="success"
            onClick={handleDone}
          >
            Done
          </Button>
        </div>
      ) : null}
    </div>
  );
};

export default QrGenerationPage;
