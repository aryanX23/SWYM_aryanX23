import { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import {TextField, colors} from "@mui/material";
import Papa from "papaparse";
import Axios from "axios";
import "./Signin.css"
import { Card } from "@mui/material";

function Signin(){
  const URL = "http://localhost:8080"
  
  const [data,setData] = useState([]);
  const [name,setName] = useState("");
  const [save,setSave] =useState([]);
  const [count,setCount] = useState([]);
  const handleChangesCsv = (e) =>{
    const file = e.target.files[0];
    const redirect = (maskedUrl) => {
      window.open(maskedUrl, "_blank", "noreferrer"); 
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const csvData = e.target.result;
      const parsedData = Papa.parse(csvData, {
        header: true,
      });
      setData(parsedData.data);
    };
    reader.readAsText(file);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const bodyFormData={
      user: name,
      urlArray: data
    };
    Axios({
      method: "post",
      url: URL + "/api/masker/maskUrl",
      data: bodyFormData,
      headers: { 'Content-Type': 'application/json' },
    }).then(response=>{setSave(response.data.urlArray); setCount(response.data.countArray)});
  }
  return <div style={{display:"flex", justifyContent:"center", marginTop: 100}}>
    <Card margin="dense" style={{padding:"20px", display:"flex", flexDirection: "column"}}>
      <TextField variant="outlined" label="Name" onChange={(e)=>{
        setName(e.target.value);
      }}/>
      <div style={{margin:10}}>
      <input type="file" id="csvFile" accept=".csv" onChange={handleChangesCsv}/>
      </div>
      <Button variant="outlined" onClick={handleSubmit}>Save</Button>
      <ul>
        {save.map(link => {
          return <li>
            <a href={link.maskedUrl} onClick={() => redirect(link.maskedUrl)}>
              {link.maskedUrl}
            </a> -- {link.count}</li>
        })}
      </ul>
   </Card>
   
  </div>
}
export default Signin;