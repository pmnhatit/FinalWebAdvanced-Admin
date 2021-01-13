import React, {useEffect, useState} from "react";
import {useParams} from 'react-router-dom';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import TextField from '@material-ui/core/TextField';
import {Chat} from '../../components/Chatroom/Chat/chat'
import Game from '../../components/DetailHistory/gamehistory'
import avatar from "assets/img/faces/marc.jpg";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  },
  page:{
    // display: 'flex',
    justifyContent: 'center',
    margin: '16px',
  }
};

const useStyles = makeStyles(styles);

export default function UserProfile() {
    const token = JSON.parse(localStorage.getItem('token'));
  const classes = useStyles();
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const {id} = useParams();
  console.log("id1 ",id);
  const [winner, setWinner] = useState("");
  const [loser, setLoser] = useState("");
  const [matchDate, setMatchDate] = useState("");

  useEffect(() => {
    // fetch("https://apiadmin-caro.herokuapp.com/history/details",{
      fetch("http://localhost:3000/history/details",{
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
          console.log("winner: "+result.infoHistory.player1);
          setIsLoaded(true);
          setLoser(result.infoHistory.player2);
          setWinner(result.infoHistory.player1);
          setMatchDate(result.infoHistory.date)
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
  if (error) {
    return <div style={{display:'flex', justifyContent:'center'}}>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div style={{display:'flex', justifyContent:'center'}}>Loading...</div>;
  } else {
  return (
    <div className={classes.page}>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Match Details</h4>
              <p className={classes.cardCategoryWhite}>Match ID: {id}</p>
            </CardHeader>
            <CardBody>
                <GridItem xs={12} sm={12} md={12}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="date"
                    label="Date"
                    name="date"
                    value={matchDate}
                    InputProps={{
                    readOnly: true,
                    }}
                />
                </GridItem>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="winner"
                    label="Winner"
                    name="winner"
                    value={winner}
                    InputProps={{
                    readOnly: true,
                    }}
                />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="loser"
                    label="Loser"
                    name="loser"
                    value={loser}
                    InputProps={{
                    readOnly: true,
                    }}
                />
                </GridItem>
              </GridContainer>
              {/* <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="First Name"
                    id="first-name"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Last Name"
                    id="last-name"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
              </GridContainer> */}
              {/* <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="City"
                    id="city"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Country"
                    id="country"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Postal Code"
                    id="postal-code"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
              </GridContainer> */}
              {/* <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <InputLabel style={{ color: "#AAAAAA" }}>About me</InputLabel>
                  <CustomInput
                    labelText="Lamborghini Mercy, Your chick she so thirsty, I'm in that two seat Lambo."
                    id="about-me"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      multiline: true,
                      rows: 5
                    }}
                  />
                </GridItem>
              </GridContainer> */}
            </CardBody>
            {/* <CardFooter>
              <Button color="primary">Update Profile</Button>
            </CardFooter> */}
          </Card>
        </GridItem>
        {/* <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            <CardAvatar profile>
              <a href="#pablo" onClick={e => e.preventDefault()}>
                <img src={avatar} alt="..." />
              </a>
            </CardAvatar>
            <CardBody profile>
              <h6 className={classes.cardCategory}>CEO / CO-FOUNDER</h6>
              <h4 className={classes.cardTitle}>Alec Thompson</h4>
              <p className={classes.description}>
                Don{"'"}t be scared of the truth because we need to restart the
                human foundation in truth And I love you like Kanye loves Kanye
                I love Rick Owens’ bed design but the back is...
              </p>
              <Button color="primary" round>
                Follow
              </Button>
            </CardBody>
          </Card>
        </GridItem> */}
      </GridContainer>
      <Game/>
     
    </div>
  );
    }
}
