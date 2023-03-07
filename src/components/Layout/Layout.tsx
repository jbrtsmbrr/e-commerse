import React, { useRef, useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
// import AccountCircle from '@mui/icons-material/AccountCircle';
// import MailIcon from '@mui/icons-material/Mail';
// import NotificationsIcon from '@mui/icons-material/Notifications';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MoreIcon from '@mui/icons-material/MoreVert';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import StorefrontTwoToneIcon from '@mui/icons-material/StorefrontTwoTone';
import Popover from '@mui/material/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import { Link, Outlet } from "react-router-dom";
import { useStore } from '../../context/Shopping/Shopping.provider';
import { Divider } from '@mui/material';
import CustomButton from '../Button';
import CartModal from '../Cart/CartModal';
import EmptyCart from '../Cart/Empty';

const Navigation = styled('ul')(({ theme }) => ({
  display: "flex",
  color: theme.palette.primary.dark,
  gap: "1rem",
  listStyle: "none",
  alignItems: "center",
  justifyContent: "center",
  "& li": {
    cursor: "pointer",
    fontSize: "0.85rem"
  },
  [theme.breakpoints.down('md')]: {
    display: "none"
  },
}))

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: 26,
  // backgroundColor: alpha(theme.palette.primary.main, 0.15),
  background: "transparent",
  border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.dark, 0.05),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: theme.palette.primary.main,
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const debounce = (fn: Function, delay: number) => {
  let timeout: any;

  return (...args: any) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn(...args);
    }, delay)
  }
}
const Header = () => {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [cart, setStore] = useStore((store) => store.cart);

  const getCartCount = () => cart.reduce((accum, current) => accum += current.quantity, 0);
  const onKeywordChanged = (nextValue: string) => {
    setStore({
      keyword: nextValue
    })
  }

  const searchFieldRef = useRef<any>(null)
  const searchFieldChanged = () => {
    onKeywordChanged(searchFieldRef?.current?.value ?? "");
  }

  const debouncedSearchChanged = debounce(searchFieldChanged, 200);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: any) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton
          size="medium" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <EmailOutlinedIcon color='primary' />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="medium"
          // aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={getCartCount()} color="error">
            <ShoppingCartOutlinedIcon color="primary" />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="medium"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircleOutlinedIcon color="primary" />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <React.Fragment>
      <AppBar
        elevation={0}
        position="sticky" style={{ background: "rgba(255,255,255,0.8)", backdropFilter: "blur(8px)", border: "none", borderBottomWidth: "thin", borderColor: "#E7EBF0", borderStyle: "solid" }}>
        <Toolbar>
          <IconButton
            size="medium"
            edge="start"
            color="primary"
            aria-label="open drawer"
            sx={{ display: { sm: 'flex', md: 'none' }, mr: 2 }}
          >
            <MenuIcon fontSize='small' />
          </IconButton>
          <Box style={{ flex: 1, display: "flex", alignItems: "center" }}>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: 'none', sm: 'block' } }}
              color="primary"
            >
              <StorefrontTwoToneIcon />
            </Typography>
            <Search>
              <SearchIconWrapper>
                <SearchIcon color='primary' fontSize='small' />
              </SearchIconWrapper>
              <StyledInputBase
                onChange={debouncedSearchChanged}
                inputRef={searchFieldRef}
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                style={{ width: 300, fontSize: "0.85rem", fontWeight: 600 }}
              />
            </Search>
          </Box>
          <Box sx={{ flex: 2 }}>
            <Navigation>
              <li>
                <Link to={{ pathname: "/home" }}>Home</Link>
              </li>
              <hr color='#c0ccda' style={{ height: "0.7rem", marginInline: "unset", border: "unset", width: 1 }} />
              <li>
                <Link to={{ pathname: "/products" }}>Products</Link>
              </li>
              <hr color='#c0ccda' style={{ height: "0.7rem", marginInline: "unset", border: "unset", width: 1 }} />
              <li>
                <Link to={{ pathname: "/promos" }}>Promos</Link>
              </li>
              <hr color='#c0ccda' style={{ height: "0.7rem", marginInline: "unset", border: "unset", width: 1 }} />
              <li>
                <Link to={{ pathname: "/contact_us" }}>Contact Us</Link>
              </li>
            </Navigation>
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, flex: { lg: 1, md: "unset" }, justifyContent: "end", alignItems: "center" }}>
            <IconButton
              size="medium" aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="error">
                <EmailOutlinedIcon color="primary" fontSize='small' />
              </Badge>
            </IconButton>
            <IconButton
              size="medium"
              color="inherit"
            >
              <StorefrontOutlinedIcon color="primary" fontSize='small' />
            </IconButton>
            <PopupState variant="popover" popupId="demo-popup-popover">
              {popupState => (
                <React.Fragment>
                  <IconButton
                    size="medium"
                    color="inherit"
                    {...bindTrigger(popupState)}
                  >
                    <Badge badgeContent={getCartCount()} color="error">
                      <ShoppingCartOutlinedIcon color="primary" fontSize='small' />
                    </Badge>
                  </IconButton>
                  <Popover
                    {...bindPopover(popupState)}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    PaperProps={{
                      elevation: 0,
                      style: {
                        minWidth: 400,
                        minHeight: 500,
                        border: "1px solid #ccc",
                        padding: "1rem",
                        display: "flex",
                        flexDirection: "column",
                        // background: "rgba(255,255,255,0.9)",
                        // backdropFilter: "blur(12px)"
                      }
                    }}
                  >
                    <Box marginBottom="1rem" display={"flex"} alignItems="center" justifyContent="space-between">
                      <Typography variant='subtitle1' fontWeight={600}>
                        Checkout Items{" "}
                        <Typography component="span" variant='subtitle1' color="GrayText">(3)</Typography>
                      </Typography>
                      <Typography variant='subtitle2' fontWeight={600} color="primary">View details</Typography>
                    </Box>
                    <Box sx={{ flex: 1, maxHeight: "400px", overflowY: "auto", position: "relative" }}>
                      {cart?.length
                        ? <CartModal />
                        : <EmptyCart />}
                    </Box>
                    <Divider />
                    <Box>
                      <div style={{ paddingBlock: "1rem" }}>
                        <Box display="flex" alignItems="center" justifyContent="space-between">
                          <Typography variant="subtitle2">Delivery</Typography>
                          <Typography variant="subtitle1" fontWeight={600} color="grey">$1.00</Typography>
                        </Box>
                        <Box display="flex" alignItems="center" justifyContent="space-between">
                          <Typography variant="subtitle1" fontWeight={600}>Grand Total</Typography>
                          <Typography variant="subtitle1" fontWeight={600} color="primary">$60.00</Typography>
                        </Box>
                      </div>
                      <CustomButton variant="contained" disableElevation fullWidth style={{ fontSize: "1rem" }}>Checkout</CustomButton>
                    </Box>
                  </Popover>
                </React.Fragment>
              )}
            </PopupState>
            <hr color='#c0ccda' style={{ height: "1rem", marginInline: "0.7rem", border: "unset", width: 1 }} />
            <IconButton
              size="medium"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircleOutlinedIcon color="primary" fontSize='small' />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="medium"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon color='primary' />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </React.Fragment>
  );
}
export default function AppLayout() {
  return <div>
    <Header />
    <Outlet />
  </div>
}
