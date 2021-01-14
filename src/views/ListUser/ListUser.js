import React, { useState, useEffect } from 'react';
import {useHistory} from 'react-router-dom';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import MUIDataTable from "mui-datatables";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});


export default function CustomizedTables() {
  const token = JSON.parse(localStorage.getItem('token'));
  const classes = useStyles();
  const [listUser, setListUser] = useState([]);
  const history = useHistory();
  
  const columns = [
    { name: "id", lable:"ID",options: {
      display: false,
    } },
    { name: "name", lable:"Name" },
    { name: "username", label:"Username" },
    { name: "email", label:"Email" },
    {
      name: "Detail",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <Button variant="outlined" color="secondary" onClick={()=>handleClick(tableMeta.rowData[0]) }>
              Details
            </Button>
          );
        }
      }
    },
    {
      name: "History",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <Button variant="outlined" color="secondary" onClick={()=>handleClickHistory(tableMeta.rowData[0]) }>
              Histories
            </Button>
          );
        }
      }
    }
  ];
  
  const options = {
    filterType: "dropdown",
    responsive: "scroll",
    selectableRows: false
  };
  
  
  const handleClick = (id) =>{
    // e.preventDefault();
    console.log(id);
    history.push(`/userdetails/${id}`);
  }

  const handleClickHistory = (id) =>{
    // e.preventDefault();
    console.log(id);
    history.push(`/userhistories/${id}`);
  }

    useEffect(()  => {
    const getRes = async ()  =>{
    // const res = await fetch("http://localhost:3000/user/users",{
      const res = await fetch("https://apiadmin-caro.herokuapp.com/user/users",{
        method: 'GET',
        headers: {
        Authorization: 'Bearer ' + `${token}`,
        'Content-Type': 'application/json',
      },
    })
    if(res.status===200){
        console.log("Vo 200OK")
        const users = await res.json();
        console.log("user: "+users.users);
        console.log("block: "+users.users[0].blocked);
        let data=[];
        for(let i=0;i<users.users.length;i++){
            data[i]={
              id: users.users[i].id,  
              email: users.users[i].email,
              name: users.users[i].name,
              username: users.users[i].username,
            }
        }
        // setListUser(users.users);
        setListUser(data);
        // console.log("data"+data[0].name)
        // console.log(listUser[0].name);
    }else{
        const result = await res.json();
        alert(result.message);
    }
  }
  getRes();
  }, [])
  
  return(
      <div>
            <MUIDataTable
                title={"List User"}
                data={listUser}
                columns={columns}
                options={options}
/>
      </div>
  );
}
