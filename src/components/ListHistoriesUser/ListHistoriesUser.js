import React, { useState, useEffect } from 'react';
import {useHistory, useParams} from 'react-router-dom';
// import {useParams} from 'react-router-dom';
import {makeStyles } from '@material-ui/core/styles';
import MUIDataTable from "mui-datatables";
import Button from "@material-ui/core/Button";


const useStyles = makeStyles({
  page: {
    // minWidth: 700,
    display: 'flex',
    margin: '16px',
    justifyContent: 'center',
  },
});


export default function CustomizedTables(props) {
  const classes = useStyles();
  const {id} = useParams();
  const token = JSON.parse(localStorage.getItem('token'));
  const [listHistories, setListHistories] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const history = useHistory();
  
  const columns = [
    // { name: "id", lable:"ID",options: {
    //   display: false,
    // } },
    { name: "id", label:"ID" },
    { name: "date", lable:"Date" },
    { name: "winner", lable:"Winner" },
    { name: "loser", lable:"Loser" },
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
    const res = await fetch("http://localhost:3000/history/historiesuser",{
    //   const res = await fetch("https://apiadmin-caro.herokuapp.com/user/users",{
        method: 'POST',
        headers: {
        Authorization: 'Bearer ' + `${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id
      }),
    })
    if(res.status===200){
        console.log("Vo 200OK")
        setIsLoaded(true);
        const histories = await res.json();
        console.log("histories: "+histories.listHistories);
        let data=[];
        for(let i=0;i<histories.listHistories.length;i++){
            data[i]={
              id: histories.listHistories[i].id,  
              date: histories.listHistories[i].date,
              winner: histories.listHistories[i].winner,
              loser: histories.listHistories[i].loser
            }
        }
        // setListUser(users.users);
        setListHistories(data);
        // console.log("data"+data[0].name)
        // console.log(listUser[0].name);
    }else{
        // const result = await res.json();
        // alert(result.message);
        setIsLoaded(true);
          setError(error);
    }
  }
  getRes();
  }, [])

  if (error) {
    return <div style={{display:'flex', justifyContent:'center'}}>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div style={{display:'flex', justifyContent:'center'}}>Loading...</div>;
  } else {
    return(
      <div className={classes.page}>
        <MUIDataTable
          title={"Match history"}
          data={listHistories}
          columns={columns}
          options={options}
        />
      </div>
  );
  }
}
