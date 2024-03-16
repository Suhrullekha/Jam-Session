import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import { Link } from "react-router-dom";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

export default class CreateRoomPage extends Component {
  defaultVotes = 2;
  constructor(props) {
    super(props); 
    //will be using react states to keep track of whats in the form or whats changed
    //if this is changed it forces the component to refrest and update
    this.state = {
      guestCanPause: true, 
      votesToSkip: this.defaultVotes,
    };
    //bind the method to this class so "this" keyword can be used
    this.handleRoomButtonPressed = this.handleRoomButtonPressed.bind(this); 
    this.handleGuestCanPauseChange = this.handleGuestCanPauseChange.bind(this); 
    this.handleVotesChange = this.handleVotesChange.bind(this); 
  }

  //e is the object that called this function 
  //sets the changed votes to skip value
  handleVotesChange(e){
    this.setState({
      votesToSkip: e.target.value,
    });
  }

  handleGuestCanPauseChange(e){
    //if e value is true, set to true else false
    this.setState({guestCanPause: e.target.value === "true" ? true:false});
  }

  handleRoomButtonPressed(){
    //send a request to the endpoint we created so a new room can actually be created 
    //this is the backend portion
    const requestOptions = {
      method: 'POST', 
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        votes_to_skip: this.state.votesToSkip, 
        guest_can_pause: this.state.guestCanPause,
      }),
    };
    //send a request to the create-room with the payload(requestOptions)
    //once we get a response, convert to json 
    fetch('/api/create-room', requestOptions)
    .then((response)=>response.json())
    .then((data) => console.log(data));
  }



  render() {
    return(
      <Grid container spacing={1}> 
        <Grid item xs={12} align="center">
          <Typography component="h4" variant="h4">
            Create A Room
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <FormControl component="fieldset"> 
            <FormHelperText>{/* small text for info*/}
              <div align="center">Guest Control of Playback State</div>
            </FormHelperText>
            <RadioGroup
              row
              defaultValue="true"
              onChange={this.handleGuestCanPauseChange}
            > {/* /*radio buttons  */}
              <FormControlLabel
                value="true" /* when users have access*/
                control={<Radio color="primary" />}
                label="Play/Pause"
                labelPlacement="bottom"
              />
              <FormControlLabel
                value="false"
                control={<Radio color="secondary" />}
                label="No Control"
                labelPlacement="bottom"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} align="center">
          <FormControl>
            <TextField
              required={true} /* {/*this is a required feild */
              type="number"
              onChange={this.handleVotesChange}
              defaultValue={this.defaultVotes} 
              inputProps={{
                min: 1,
                style: { textAlign: "center" },
              }}/*Min value is 1 and double {} cuz its  js code*/
            />
            <FormHelperText>
              <div align="center">Votes Required To Skip Song</div>
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} align="center">
          <Button
            color="primary"
            variant="contained"
            onClick={this.handleRoomButtonPressed}
          >
            Create A Room
          </Button>
        </Grid>
        <Grid item xs={12} align="center">
          <Button color="secondary" variant="contained" to="/" component={Link}>
            Back
          </Button>
        </Grid>
      </Grid>
    );
  }
}