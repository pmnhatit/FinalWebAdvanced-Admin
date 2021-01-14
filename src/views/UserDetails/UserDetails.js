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
//dialog
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

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
  // form: {
  //   width: '100%', // Fix IE 11 issue.
  //   marginTop: theme.spacing(1),
  // },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  table: {
    marginBottom: '30px',
  },
  page: {
    overflow: 'auto',
  }
}));


export default function Profile() {
  const classes = useStyles();
  const {id} = useParams();
  console.log("id1 ",id);
  const mainPanel = React.createRef();
  //info user
  const token = JSON.parse(localStorage.getItem('token'));
  const [fullName, setFullName] = useState("abc");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [matches, setMatches] = useState(0);
  const [trophies, setTrophies] = useState(0);
  const [winRate, setWinRate] = useState(0);
  // const [status, setStatus] = useState("");
  const [blocked, setBlocked] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [open, setOpen] = React.useState(false);
  const history = useHistory();


  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const ChangeStatus = async () =>{
    // const res = await fetch("https://apiadmin-caro.herokuapp.com/user/changeblock", {
      const res = await fetch("http://localhost:3000/user/changeblock", {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + `${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
        blocked: !blocked,
      }),
    })
    const result = await res.json();
    if(res.status===200){
        console.log("blocked: "+result.infoUser.blocked);
        setBlocked(result.infoUser.blocked);
      }else{
        alert(result.message);
      }
  }

  const handleConfirm = (e) =>{
    e.preventDefault();
    ChangeStatus();
    setOpen(false);
  }

//   const asideBody = new PerfectScrollbar('.aside-body', {
//     suppressScrollX: true
// });

  useEffect(() => {
    //load data
    fetch("https://apiadmin-caro.herokuapp.com/user/infouser",{
      // fetch("http://localhost:3000/user/infouser",{
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
          setBlocked(result.infoUser.blocked);
          setMatches(result.infoUser.matches);
          setTrophies(result.infoUser.trophies);
          setWinRate(result.infoUser.win_rate);
          // console.log("blocked "+blocked)
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
  let status = "";
  let text = "";
  if(blocked){
    status="Blocked";
    text = "UnBlock";
  }else{
    status="Active"
    text="Block";
  }
  blocked ? status="Blocked" : status="Active";

  if (error) {
    return <div style={{display:'flex', justifyContent:'center'}}>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div style={{display:'flex', justifyContent:'center'}}>Loading...</div>;
  } else {
    
    return (<div className={classes.page}>
      <Container maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          User Infomation
        </Typography>
        <form className={classes.form} >
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="name"
            label="Full Name"
            name="name"
            value={fullName}
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
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="matches"
            label="Matches"
            name="matches"
            value={matches}
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="trophies"
            label="Trophies"
            name="trophies"
            value={trophies}
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="win-rate"
            label="Win Rate"
            name="win-rate"
            value={winRate}
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="status"
            label="Status"
            name="status"
            value={status}
            InputProps={{
              readOnly: true,
            }}
            
          />
          <Button
            // type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleClickOpen}
          >
            {text}
          </Button>
          <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{`${text} user`}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {`Are you sure ${text} this user?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirm} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
        </form>
      </div>
      <Box mt={8}>
      </Box>
      
    </Container>
    </div>);
  }
}