import * as React from "react";
import {Menu,
    MenuItem,
    IconButton,
    Tooltip,
    Container,
    Box,
    Typography
} from '@mui/material'
import Person2Icon from "@mui/icons-material/Person2";
import { Link } from "react-router-dom";

export default function UserMenu() {
    
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
          size="large"
          color="default"
          onClick={(e) => {
            handleOpenUserMenu(e);
          }}
        >
          <Person2Icon />
        </IconButton>
      </Tooltip>
      <Menu
      sx={{mt: -4.8}}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem onClick={handleCloseUserMenu}>
          <Link
            style={{ textDecoration: "none", color: "#000" }}
            to="/my-profile"
          >
            <Typography textalign="center">My Profile</Typography>
          </Link>
        </MenuItem>
        <MenuItem
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
