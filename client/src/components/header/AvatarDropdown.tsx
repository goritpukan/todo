"use client"
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import {useState} from "react";
import {menuItemWithoutHover} from "@/components/header/styles";
import {deleteData, patchData} from "@/utils/fetchData";
import {useRouter} from "next/navigation";

export default function AvatarDropdown({username}: { username: any }) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [usernameState, setUsernameState] = useState(username);
  const [updateUsername, setUpdateUsername] = useState(username);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const open = Boolean(anchorEl);

  const router = useRouter();

  const handeChangeUsername = async () => {
    setError("");
    setIsLoading(true);
    const res = await patchData("/api/user/", {username: updateUsername});
    if (res && res.username) {
      setUsernameState(res.username);
      setIsLoading(false);
      handleClose();
      return;
    }
    setError(res.message);
    setIsLoading(false);
  }
  const handleEnterClick = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if(event.key === "Enter"){
      handeChangeUsername();
    }
  }

  const handleLogout = async () => {
    await deleteData("/api/auth/logout");
    router.push("/signin");
  }

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setUpdateUsername(usernameState);
    setError("");
    setIsLoading(false);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = () => {
    handleClose();
  };

  return (
    <>
      <Avatar
        onClick={handleClick}
        sx={{bgcolor: "red", width: 60, height: 60, cursor: "pointer"}}>
        {usernameState && String(usernameState).charAt(0).toUpperCase()}
      </Avatar>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            width: '200px',
            maxWidth: '100%',
          },
        }}
      >
        <MenuItem
          disableRipple
          sx={menuItemWithoutHover}>
          <Stack gap={2}>
            <Typography>Change your nickname</Typography>
            <TextField onKeyDown={handleEnterClick} value={updateUsername} onChange={e => setUpdateUsername(e.target.value)}/>
            <Button
              disabled={isLoading || usernameState === updateUsername}
              onClick={handeChangeUsername}
              variant={"contained"}>Save</Button>
            {error && <Alert sx={{wordBreak: 'break-word', whiteSpace: 'normal',}} severity={"error"}>{error}</Alert>}
          </Stack>
        </MenuItem>
        <MenuItem onClick={() => handleMenuItemClick()}>
          <Button onClick={handleLogout} sx={{width: "100%", backgroundColor: "#ee2400"}} variant={"contained"}>Log out</Button>
        </MenuItem>
      </Menu>
    </>

  )
}