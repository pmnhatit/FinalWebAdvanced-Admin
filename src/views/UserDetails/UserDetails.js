import React, {useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
// import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {useHistory, useParams} from 'react-router-dom';



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


export default function Profile() {
  const classes = useStyles();
  const {id} = useParams();
  console.log("id1 ",id);
  //info user
  const token = JSON.parse(localStorage.getItem('token'));
  const [fullName, setFullName] = useState("abc");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const history = useHistory();

  const handleChange = (e) =>{
    if(e.target.id==="name"){
      setFullName(e.target.value);
    }else if(e.target.id==="phone"){
        setPhone(e.target.value);
    }else if(e.target.id==="email"){
      setEmail(e.target.value);
    }else if(e.target.id==="username"){
      setUsername(e.target.value);
    }
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    // editProfile();
  };


  useEffect(() => {
    fetch("https://apiadmin-caro.herokuapp.com/user/infouser",{
      method: 'POST',
        headers: {
        Authorization: 'Bearer ' + `${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id
      }),
    })
      .then(res => res.json())
      .then(
        (result) => {
          
          setIsLoaded(true);
          console.log("username:"+result.infoUser.username);
          setUsername(result.infoUser.username);
          setFullName(result.infoUser.name);
          setEmail(result.infoUser.email);
          setPhone(result.infoUser.phone);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (<>
      <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Edit Infomation
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
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="username"
            label="Username"
            name="username"
            value={username}
            // disabled
            onChange={handleChange}
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="email"
            label="Email"
            name="email"
            value={email}
            // disabled
            onChange={handleChange}
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="phone"
            label="Phone Number"
            name="phone"
            value={phone}
            // disabled
            onChange={handleChange}
            InputProps={{
              readOnly: true,
            }}
          />
          {/* <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Edit
          </Button> */}
        </form>
      </div>
      <Box mt={8}>
      </Box>
    </Container>
    </>);
  }
  
 

  // useEffect(()  => {
  //   const getRes = async ()  =>{
  //     console.log("Goi API")
  //   const res = await fetch("http://localhost:3000/user/infouser",{
  //       method: 'POST',
  //       headers: {
  //       Authorization: 'Bearer ' + `${token}`,
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       id: id
  //     }),
  //   })
  //   if(res.status===200){
  //       console.log("Vo 200OK")
  //       const user = await res.json();
  //       console.log("user: "+user.infoUser);
  //       console.log("username: "+user.infoUser.username);
  //       // setListUser(users.users);
  //       setIsLoaded(true);
  //       setFullName(user.infoUser.name);
  //       setInfoUser(user.infoUser);
  //       console.log("state: "+infouser);
  //       console.log("name: "+fullName);
  //   }else{
  //       const result = await res.json();
  //       alert(result.message);
  //   }
  // }
  // getRes();
  // }, [fullName])

  // const editProfile = async () => {
  //   console.log(token);
  //   // const res = await fetch("https://apiadmin-caro.herokuapp.com/user/edit", {
  //   const res = await fetch("http://localhost:3000/user/infouser", {
  //     method: 'GET',
  //     headers: {
  //       Authorization: 'Bearer ' + `${token}`,
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       id:user.id,
  //       name:fullName,
  //       phone:phone,
  //       email: email
  //     }),
  //   })
  //   if(res.status===200){
  //       const result = await res.json();
  //       console.log(result);
  //       // localStorage.setItem('token',JSON.stringify(result.token));
  //       localStorage.setItem('user',JSON.stringify(result.infoUser));
  //       history.push('/admin/home');
  //     }else{
  //       alert(res.message);
  //     }
  // }

  

  // return (
    
  // );
}