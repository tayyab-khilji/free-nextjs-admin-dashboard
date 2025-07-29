'use client';
import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, Paper, IconButton, Box, Collapse } from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useRouter, usePathname } from 'next/navigation';

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [openReturnsRefunds, setOpenReturnsRefunds] = useState(false);
  const theme = useTheme();

  const isMobile = useMediaQuery('(max-width:640px)');
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = () => {
    setOpen(!open);
  };

  const handleListItemClick = (index, path, isSubItem = false) => {
    setSelectedIndex(index);
    if (path) {
      router.push(path);
    }
    if (isMobile && !isSubItem) {
      setOpen(false);
    }
  };

  const handleReturnsRefundsClick = () => {
    setOpenReturnsRefunds(!openReturnsRefunds);
  };

  const menuItems = [
    { text: 'Overview', path: '/account/profile' },
    { text: 'My wishlist', path: '/account/wishlist' },
    {
      text: 'Address book',
      path: '/account/address-book',
      subPaths: ['/account/add-address', '/account/edit-address']
    },
    { text: 'Notifications', path: '/account/notifications' },
    { text: 'Manage orders', path: '/account/manage-orders' },


    // {
    //   text: 'Returns and refunds',
    //   path: '',
    //   children: [
    //     { text: 'Refund request', path: '/account/return_and_refund/Refund-request' },
    //     { text: 'Return-request', path: '/account/Return-request' }
    //   ]
    // }
  ];

  useEffect(() => {
    let activeIndex = null;
    let found = false;

    menuItems.forEach((item, index) => {
      if (item.path && pathname.startsWith(item.path)) {
        activeIndex = index;
        found = true;
      }
      if (item.subPaths && item.subPaths.some((subPath) => pathname.startsWith(subPath))) {
        activeIndex = index;
        found = true;
      }
      if (item.children) {
        item.children.forEach((child) => {
          if (pathname.startsWith(child.path)) {
            activeIndex = index;
            setOpenReturnsRefunds(true);
            found = true;
          }
        });
      }
    });

    setSelectedIndex(found ? activeIndex : null);
  }, [pathname]);

  return (
    <>
      {/* Desktop Sidebar */}
      {!isMobile && (
        <Paper className="paper_space" sx={{ padding: 2, width: '100%', backgroundColor: 'white', height: '100%' }}>
          <ListItem className="sidebar_icon">
            <h1>Account</h1>
          </ListItem>
          <List>
            {menuItems.map((item, index) => (
              <React.Fragment key={item.text}>
                {item.children ? (
                  <>
                    <ListItem
                      button
                      onClick={handleReturnsRefundsClick}
                      selected={
                        selectedIndex === index && !item.children.some((child) => pathname.startsWith(child.path))
                      }
                      sx={{
                        '&.Mui-selected': {
                          backgroundColor: theme.palette.action.selected
                        },
                        '&:hover': {
                          backgroundColor: 'transparent'
                        }
                      }}
                    >
                      <ListItemText primary={item.text} />
                      <IconButton disableRipple>{openReturnsRefunds ? <ExpandLess /> : <ExpandMore />}</IconButton>
                    </ListItem>
                    <Collapse in={openReturnsRefunds} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        {item.children.map((child) => {
                          const isActive = pathname.startsWith(child.path);
                          return (
                            <ListItem
                              button
                              key={child.text}
                              onClick={() => handleListItemClick(index, child.path, true)}
                              sx={{
                                pl: 4,
                                color: isActive ? '#65D235' : 'inherit',
                                backgroundColor: isActive ? theme.palette.action.selected : 'transparent',
                                '&:hover': {
                                  backgroundColor: theme.palette.action.hover
                                }
                              }}
                            >
                              <ListItemText primary={child.text} />
                            </ListItem>
                          );
                        })}
                      </List>
                    </Collapse>
                  </>
                ) : (
                  <ListItem
                    button
                    key={item.text}
                    selected={selectedIndex === index}
                    onClick={() => handleListItemClick(index, item.path)}
                    sx={{
                      '&.Mui-selected': {
                        backgroundColor: theme.palette.action.selected
                      },
                      '&:hover': {
                        backgroundColor: 'transparent'
                      }
                    }}
                  >
                    <ListItemText primary={item.text} />
                  </ListItem>
                )}
              </React.Fragment>
            ))}
          </List>
        </Paper>
      )}

      {/* Mobile Dropdown Overlay Menu */}
      {isMobile && (
        <Paper
          className="paper_space"
          sx={{
            position: 'relative',
            padding: 2,
            width: '100%',
            backgroundColor: 'white'
          }}
        >
          <ListItem
            className="sidebar_icon"
            onClick={handleClick}
            sx={{ justifyContent: 'space-between', cursor: 'pointer' }}
          >
            <h1>Account</h1>
            <IconButton>{open ? <ExpandLess /> : <ExpandMore />}</IconButton>
          </ListItem>

          <Box
            sx={{
              position: 'absolute',
              top: '100%',
              left: 0,
              width: '100%',
              zIndex: 1000,
              backgroundColor: 'white',
              boxShadow: theme.shadows[4]
            }}
          >
            <Collapse in={open}>
              <List>
                {menuItems.map((item, index) => (
                  <React.Fragment key={item.text}>
                    {item.children ? (
                      <>
                        <ListItem
                          button
                          onClick={handleReturnsRefundsClick}
                          selected={
                            selectedIndex === index && !item.children.some((child) => pathname.startsWith(child.path))
                          }
                          sx={{
                            '&.Mui-selected': {
                              backgroundColor: theme.palette.action.selected
                            },
                            '&:hover': {
                              backgroundColor: 'transparent'
                            }
                          }}
                        >
                          <ListItemText primary={item.text} />
                          <IconButton disableRipple>{openReturnsRefunds ? <ExpandLess /> : <ExpandMore />}</IconButton>
                        </ListItem>
                        <Collapse in={openReturnsRefunds} timeout="auto" unmountOnExit>
                          <List component="div" disablePadding>
                            {item.children.map((child) => {
                              const isActive = pathname.startsWith(child.path);
                              return (
                                <ListItem
                                  button
                                  key={child.text}
                                  onClick={() => handleListItemClick(index, child.path, true)}
                                  sx={{
                                    pl: 4,
                                    color: isActive ? 'green' : 'inherit',
                                    backgroundColor: isActive ? theme.palette.action.selected : 'transparent',
                                    '&:hover': {
                                      backgroundColor: theme.palette.action.hover
                                    }
                                  }}
                                >
                                  <ListItemText primary={child.text} />
                                </ListItem>
                              );
                            })}
                          </List>
                        </Collapse>
                      </>
                    ) : (
                      <ListItem
                        button
                        key={item.text}
                        selected={selectedIndex === index}
                        onClick={() => handleListItemClick(index, item.path)}
                        sx={{
                          '&.Mui-selected': {
                            backgroundColor: theme.palette.action.selected
                          },
                          '&:hover': {
                            backgroundColor: 'transparent'
                          }
                        }}
                      >
                        <ListItemText primary={item.text} />
                      </ListItem>
                    )}
                  </React.Fragment>
                ))}
              </List>
            </Collapse>
          </Box>
        </Paper>
      )}
    </>
  );
};

export default Sidebar;
