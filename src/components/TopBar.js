import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import PropTypes from 'prop-types';
import {
    styled,
    Box,
    Button,
    Popover
} from '@mui/material';
import TopBarOption from '../components/TopBarOption'
import Logo from '../components/Logo'
import SearchIcon from '@mui/icons-material/Search';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LoginDialog from '../components/LoginDialog';
import DownArrow from '../assets/DownArrowProfile.svg';
import { adminAuthSignOut } from '../redux/adminAuth/adminAuthAction'

const Root = styled(Box)(({ theme }) => ({
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 100,
    display: 'flex',
    backgroundColor: 'rgba(26, 26, 26, 0.7)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderTop: 'none',
    borderLeft: 'none',
    borderRight: 'none',
    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: '12px 10% 12px 10%',
    transition: 'all 0.3s ease-in-out',
    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(135deg, rgba(26, 26, 26, 0.4), rgba(15, 15, 15, 0.6))',
        borderRadius: 'inherit',
        zIndex: -1,
    },
    [theme.breakpoints.down('sm')]: {
        display: 'block',
        padding: '10px 5% 10px 5%',
    }
}));

const OptionBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    '& > *': {
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
            transform: 'translateY(-1px)',
            filter: 'brightness(1.1)',
        }
    },
    [theme.breakpoints.down('sm')]: {
        margin: '5% 0 1% 0',
        gap: '6px',
    }
}));

const TopBar = ({ user, admin, adminAuthSignOut }) => {
    const pathname = usePathname();
    const router = useRouter();

    // For Logout PopOver
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const openPopover = Boolean(anchorEl);
    const id = openPopover ? 'simple-popover' : undefined;

    // For Login Dialog
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        setAnchorEl(null);
    };

    const [writePublish, setWritePublish] = useState(false)

    useEffect(() => {
        if (pathname.includes('write')) {
            setWritePublish(true)
        } else {
            setWritePublish(false)
        }
    }, [user, pathname])

    return (
        <Root>
            {/* Logo Section */}
            <Link href="/" style={{ display: 'flex' }}>
                <Logo />
            </Link>

            {/* Actions Section */}
            {
                admin.length || admin.email
                    ?
                    <Box style={{ 
                        display: 'flex', 
                        alignItems: 'center',
                        backgroundColor: 'rgba(26, 26, 26, 0.6)',
                        backdropFilter: 'blur(10px)',
                        WebkitBackdropFilter: 'blur(10px)',
                        borderRadius: '12px',
                        padding: '6px 12px',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        boxShadow: '0 4px 16px 0 rgba(0, 0, 0, 0.2)',
                        transition: 'all 0.2s ease-in-out',
                        cursor: 'pointer',
                        '&:hover': {
                            backgroundColor: 'rgba(26, 26, 26, 0.8)',
                            transform: 'translateY(-1px)',
                        }
                    }}>
                        <TopBarOption avatar={true} alt={admin.displayName} src={admin.photoURL} />
                        <Image src={DownArrow} alt="Down Arrow" width={16} height={16} onClick={handleClick} style={{ cursor: 'pointer' }} />
                        <Popover
                            id={id}
                            open={openPopover}
                            anchorEl={anchorEl}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                            PaperProps={{
                                style: {
                                    backgroundColor: 'rgba(26, 26, 26, 0.8)',
                                    backdropFilter: 'blur(20px)',
                                    WebkitBackdropFilter: 'blur(20px)',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    borderRadius: '12px',
                                    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
                                    marginTop: '8px',
                                }
                            }}
                        >
                            <Button 
                                onClick={() => { adminAuthSignOut(router) }} 
                                style={{ 
                                    textTransform: 'none', 
                                    color: '#ffffff',
                                    fontWeight: '500',
                                    padding: '8px 16px',
                                    borderRadius: '8px',
                                    transition: 'all 0.2s ease-in-out',
                                    '&:hover': {
                                        backgroundColor: 'rgba(84, 110, 122, 0.1)',
                                        transform: 'translateY(-1px)',
                                    }
                                }} 
                            >Logout</Button>
                        </Popover>
                    </Box>
                    :
                    <OptionBox>
                        {/* Search Icon */}
                        <Link href="/search">
                            <TopBarOption Icon={SearchIcon} />
                        </Link>

                        {/* Notification Icon
                        <TopBarOption Icon={NotificationsIcon} onClick={handleClickOpen} /> */}

                        {/* Bookmarked Section */}
                        {
                            user.length || user.user ?
                                <Link href="/bookmarked">
                                    <TopBarOption Icon={BookmarkIcon} />
                                </Link>
                                :
                                <TopBarOption Icon={BookmarkIcon} onClick={handleClickOpen} />
                        }

                        {/* Write/Publish Button */}
                        {
                            user.length || user.user ?
                                writePublish === true ?
                                    // <TopBarOption button={true} buttonVariant='contained' buttonValue='Publish' />
                                    null
                                    :
                                    <Link href="/write">
                                        <TopBarOption button={true} buttonVariant='outlined' buttonValue='Write' />
                                    </Link>
                                :
                                <TopBarOption button={true} buttonVariant='outlined' buttonValue='Write' onClick={handleClickOpen} />
                        }

                        {/* Profile Avatar */}
                        {
                            user.length || user.user ?
                                <Link href="/profile">
                                    <TopBarOption avatar={true} alt={user.user.displayName} src={user.user.photoURL} />
                                </Link>
                                :
                                <TopBarOption avatar={true} onClick={handleClickOpen} />
                        }

                    </OptionBox>
            }

            {open ? <LoginDialog open={open} onClose={handleClose} /> : null}
        </Root>
    );
};

TopBar.propTypes = {
    className: PropTypes.string
};

const mapStateToProps = (state) => {
    return {
        user: state.auth.authState,
        admin: state.adminAuth.adminAuthState
    };
};

const mapDispatchToProps = dispatch => {
    return {
        adminAuthSignOut: (navigate) => dispatch(adminAuthSignOut(navigate))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TopBar);
