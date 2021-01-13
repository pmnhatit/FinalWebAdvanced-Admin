import React, { useState, useEffect } from 'react';
import {useHistory} from 'react-router-dom';
import {makeStyles } from '@material-ui/core/styles';
import MUIDataTable from "mui-datatables";
import Button from "@material-ui/core/Button";


const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});


export default function CustomizedTables() {
  const token = JSON.parse(localStorage.getItem('token'));
  const [listHistories, setListHistories] = useState([]);
  const history = useHistory();
  
  const columns = [
    // { name: "id", lable:"ID",options: {
    //   display: false,
    // } },
    { name: "id", label:"ID" },
    { name: "date", lable:"Date" },
    {
      name: "Detail",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <Button variant="outlined" color="secondary" onClick={()=>handleClick(tableMeta.rowData[0]) }>
              Detail
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
    history.push(`/history/${id}`);
  }

    useEffect(()  => {
    const getRes = async ()  =>{
    const res = await fetch("http://localhost:3000/history/histories",{
    //   const res = await fetch("https://apiadmin-caro.herokuapp.com/history/histories",{
        method: 'GET',
        headers: {
        Authorization: 'Bearer ' + `${token}`,
        'Content-Type': 'application/json',
      },
    })
    if(res.status===200){
        console.log("Vo 200OK")
        const histories = await res.json();
        console.log("histories: "+histories.histories);
        let data=[];
        for(let i=0;i<histories.histories.length;i++){
            data[i]={
              id: histories.histories[i]._id,  
              date: histories.histories[i].date,
            }
        }
        // setListUser(users.users);
        setListHistories(data);
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
                title={"List Match"}
                data={listHistories}
                columns={columns}
                options={options}
/>
      </div>
  );
}
