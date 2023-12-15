import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Redirect } from "react-router-dom";
import { useAppDispatch ,useAppSelector} from '../../store/storeHooks';
import { setCurrentUser,selectCurrentUser } from '../../store/appSlice';

import VCollabLogo from "../../assets/images/loginVCollabLogo.png";
import users from "./users.json";
import {
  makeStyles,
  createStyles,
  Theme,
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import IconButton from "@material-ui/core/IconButton";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import clsx from "clsx";
import "./index.css";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
    },
    textField: {
      width: "25ch",
    },
    margin: {
      margin: theme.spacing(1),
    },
    inpLabel: {
      color: "black",
    },
    disabled: {
      /*color: theme.palette.text.disabled,*/
      color: "grey",
      pointerEvents: "none",
      cursor: "not-allowed",
    },
    activeBtnColor: {
      background: "#005FB8",
      color: "white",
      "&:hover": {
        background: "#005FB8",
      },
    },
    pass: {
      "& InputLabel.Mui-focused": {
        color: "#005FB8",
      },
      "& InputLabel": {
        color: "black",
      },

      // '& .MuiInput-underline:after': {
      //   borderBottomColor: 'green',
      // },
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: "black",
        },
        "&:hover fieldset": {
          borderColor: "black",
        },
        "&.Mui-focused fieldset": {
          borderColor: "#005FB8",
        },
      },
    },
    inpTextBox :{
      "& .MuiOutlinedInput-input:-webkit-autofill" : {
        "-webkit-box-shadow": "0 0 0 100px #fff inset",
        "-webkit-text-fill-color": "#000"
      }      
    }
}));

interface State {
  showPassword: boolean;
  password: any;
}

function Login() {
  const history = useHistory();
  const dispatch = useAppDispatch();  
  const currentUser = useAppSelector(selectCurrentUser);
  const [cookies, setCookie] = useCookies(["auth"]);
  const classes = useStyles();
  const [errorMessages, setErrorMessages] = useState({ name: "", message: "" });
  let [values, setValues] = React.useState<State>({ password: "",  showPassword: false  });

  const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const getUserDetails = (userName : string) =>{
    if(users){
      const filteredUsers = users.filter((user) => user.name === userName);
      if (filteredUsers.length > 0) return filteredUsers[0];
    }
    return null;
  };

  const errors = {
    uname: "Invalid username",
    pass: "Invalid password",
  };

  const renderErrorMessage = (name : any) =>
  name === errorMessages.name && (
    <div className="error">{errorMessages.message}</div>
  );

  const handleLogin = () => { 
    var { uname, pass } = document.forms[0];  
    const userData = getUserDetails(uname.value);  
    if (userData) {
      if (userData.password !== pass.value) {
        // Invalid password
        setErrorMessages({ name: "pass", message: errors.pass });
      } else {
        dispatch(setCurrentUser(userData));
        setCookie("auth", userData, { path: "/", maxAge: 1800 }); // 60 * 30
        setTimeout(() => {
          history.push("/home");
        }, 500);
      }
    } else {
      // Username not found
      setErrorMessages({ name: "uname", message: errors.uname });
    }
  };

  const renderForm = (
    <div className="login-container">
      <div className="login-form">
        <div className="title">
          <img src={VCollabLogo} alt="logo"></img>
        </div>
        <hr className="solid"></hr>
        <div className="frame">
          <p className="paragraph1">Enterprise Login</p>
          <p className="paragraph2">
            Fill in your credentials below to access VCollab Enterprise
          </p>
        </div>

          <div className="form">
            <form>
            <FormControl
              className={clsx(classes.margin, classes.textField, classes.pass)}
              variant="outlined"
            >
              <InputLabel
                htmlFor="outlined-adornment-Username"
                className={clsx(classes.pass, classes.inpLabel)}
              >
                Username
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-Username"
                label="Username"
                name="uname"
                style={{ color: "black", width: "375px" }}
                labelWidth={70}
                autoComplete="off" 
                className={ clsx(classes.inpTextBox)}
              />
                {renderErrorMessage("uname")}
            </FormControl>
            <br />
            <FormControl
              className={clsx(classes.margin, classes.textField, classes.pass)}
              variant="outlined"
            >
              <InputLabel
                htmlFor="outlined-adornment-password"
                className={clsx(classes.pass, classes.inpLabel)}
              >
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                label="password"
                type={values.showPassword ? "text" : "password"}
                value={values.password}
                name="pass"
                onChange={handleChange("password")}
                style={{ color: "black", width: "375px" }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      style={{ color: "black" }}
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                className={ classes.inpTextBox}
                labelWidth={70}
              />
                {renderErrorMessage("pass")}
            </FormControl>
              <div className="button-container">
              <Button
                variant="contained"
                onClick={handleLogin}
                className={
                  values.password.length >= 1
                    ? classes.activeBtnColor
                    : classes.disabled
                }
              >
                Login
              </Button>
              </div>
            </form>
        </div>
      </div>
    </div>
  );

  if(currentUser)
      return <Redirect to="/home"> </Redirect>

  if(cookies.auth){
      dispatch(setCurrentUser(cookies.auth));
      return <Redirect to="/home"> </Redirect>;
  }

  return renderForm;

}

export default Login;
