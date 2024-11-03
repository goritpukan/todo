"use client"
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Link from "next/link";
import Styles from "./AuthForm.module.css";
import {useState, useEffect} from "react";
import {useRouter} from "next/navigation";
import {isValidEmail, isValidPassword, isValidUsername} from "@/utils/validation";
import {postData} from "@/utils/fetchData";

interface AuthFormProps {
  isSignUp: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({isSignUp}) => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    username: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState("");

  const validate = () => {
    return {
      email: isValidEmail(email),
      username: isSignUp ? isValidUsername(username) : "",
      password: isValidPassword(password),
    }
  }
  const handleSubmit = async (): Promise<any> => {
    setIsSubmitted(true);
    const errors = validate();
    if (errors.email || (isSignUp && errors.username) || errors.password) return;
    setIsLoading(true);
    const {res, data} = await postData(isSignUp ? "/api/auth/signup" : "/api/auth/signin",
      {
        email,
        password,
        username: isSignUp ? username : undefined
      });
    setIsLoading(false);
    if (!res.ok) {
      setAlert(data.message);
      return;
    }
    router.push("/")
  }

  useEffect(() => {
    if (isSubmitted) setErrors(validate());
  }, [email, password, username, isSubmitted]);//test! isSub

  return (
    <div className={Styles.auth}>
      <Stack sx={{border: "2px, solid", padding: 4, borderRadius: 5, bgcolor: "white"}} spacing={4}>
        <h1 className={Styles.header}>{isSignUp ? "Sign up" : "Sign in"}</h1>
        <TextField
          error={Boolean(errors.email)}
          helperText={errors.email}
          label="Email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        {isSignUp && <TextField
          error={Boolean(errors.username)}
          helperText={errors.username}
          label="Username"
          required
          onChange={(e) => setUsername(e.target.value)}
        />}
        <TextField
          error={Boolean(errors.password)}
          helperText={errors.password}
          label="Password"
          required
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        {alert && <Alert severity="error">{alert}</Alert>}
        <Button
          disabled={isLoading}
          onClick={handleSubmit}
          variant={"contained"}>{isSignUp ? "Sign up" : "Sign in"}</Button>
        <Button
          component={Link}
          href={isSignUp ? "/signin" : "/signup"}>
          {isSignUp ? "Dont have an a account?" : "Already have an account?"}
        </Button>
      </Stack>
    </div>
  )
}
export default AuthForm;