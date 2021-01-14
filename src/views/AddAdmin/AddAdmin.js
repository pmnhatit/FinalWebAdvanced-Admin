import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
// import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {useHistory} from 'react-router-dom';



const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


export default function AddAdmin() {
  const classes = useStyles();

  //info user
  const token = JSON.parse(localStorage.getItem('token'));
  console.log(token);
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const history = useHistory();

  

  const editUser = async () => {
    const res = await fetch("https://apiadmin-caro.herokuapp.com/admin/addadmin", {
      // const res = await fetch("http://localhost:3000/admin/addadmin", {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + `${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: fullName,
        phone: phone,
        username: username,
        email: email
      }),
    })
    if(res.status===200){
        
        setFullName("");
        setEmail("");
        setPhone("");
        setUsername("");
        alert("Add success!");
        // history.push('/addadmin');
      }else{
        const result = await res.json();
        alert(result.message);
      }
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    editUser();
  };

  const handleChange = (e) =>{
    if(e.target.id==="name"){
      setFullName(e.target.value);
    }else if(e.target.id==="phone"){
        setPhone(e.target.value);
    }else if(e.target.id==="username"){
        setUsername(e.target.value);
    }else if(e.target.id==="email"){
        setEmail(e.target.value);
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Create New Admin
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="name"
            label="Full Name"
            name="name"
            value={fullName}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="username"
            label="Username"
            name="username"
            value={username}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            type="Number"
            id="phone"
            label="Phone Number"
            name="phone"
            value={phone}
            onChange={handleChange}
  ></TextField>
          
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="email"
            label="Email"
            name="email"
            value={email}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            ADD
          </Button>
        </form>
      </div>
      <Box mt={8}>
      </Box>
    </Container>
  );
}
