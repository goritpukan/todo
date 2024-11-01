"use client"
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Styles from "./page.module.css";
import Link from "next/link";
import {useState, useEffect} from "react";
import {isValidEmail} from "@/utils/validation";

export default function Page() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    username: ""
  });

  const validate = ():void => {
    const newErrors = {email: "", username: "", password: ""};
    if(!email.trim() || !isValidEmail(email.trim())) newErrors.email = "Email is invalid";
    if(!username.trim() || username.trim().length < 3) newErrors.username = "Username is invalid";
    if(!password.trim() || password.trim().length < 6) newErrors.password = "Password is invalid";
    setErrors(newErrors);
  }
  const handleSubmit = ():void => {
    validate();
  }
  useEffect(validate, [email, password, username])

  return (
    <div className={Styles.signup}>
      <Stack sx={{border: "2px, solid", padding: 4, borderRadius: 5, bgcolor: "white"}} spacing={4}>
        <TextField
          error={Boolean(errors.email)}
          helperText={errors.email}
          label="Email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          error={Boolean(errors.username)}
          helperText={errors.username}
          label="Username"
          required
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          error={Boolean(errors.password)}
          helperText={errors.password}
          label="Password"
          required
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleSubmit} variant={"contained"}>Sign up</Button>
        <Button component={Link} href="/signin">Dont have an a account?</Button>
      </Stack>
    </div>
  )
}