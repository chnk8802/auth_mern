import * as React from "react";
import {
  Menu,
  MenuItem,
  IconButton,
  Tooltip,
  Container,
  Box,
  Typography,
} from "@mui/material";
import Person2Icon from "@mui/icons-material/Person2";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../app/features/authentication/authenticationSlice";

export default function UserMenu() {
  const dispatch = useDispatch();
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <>
      <Tooltip title="Open settings">
        <IconButton
          variant="outlined"
          size="small"
          color="default"
          onClick={(e) => {
            handleOpenUserMenu(e);
          }}
        >
          <Person2Icon />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        sx={{mt: 7}}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem sx={{ pr: 8 }} onClick={handleCloseUserMenu}>
          <Link
            style={{ textDecoration: "none", color: "#000" }}
            to="/my-profile"
          >
            <Typography textalign="center">My Profile</Typography>
          </Link>
        </MenuItem>
        <MenuItem
          sx={{ pr: 8 }}
          onClick={(e) => {
            handleCloseUserMenu(e);
            dispatch(logout());
          }}
        >
          <Typography color="error">Logout</Typography>
        </MenuItem>
      </Menu>
    </>
  );
}
