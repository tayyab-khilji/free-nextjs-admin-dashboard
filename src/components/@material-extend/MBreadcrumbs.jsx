import React from 'react';
import PropTypes from 'prop-types';
import NextLink from 'next/link';
import { last } from 'lodash';
// mui
import { Typography, Box, Link, Breadcrumbs } from '@mui/material';

function LinkItem({ link, admin }) {
  const { href, name, icon } = link;
  return (
    <Link 
      component={NextLink}
      key={name}
      href={href}
      passHref
      variant={'h6'}
      sx={{
        lineHeight: 2,
        display: 'flex',
        alignItems: 'center',
        color: '#A0AEC0',
        '& > div': { display: 'inherit' },
      }}
    >
      {icon && (
        <Box 
          sx={{
            mr: 1,
            '& svg': {
              width: admin ? 30 : 20,
              height: admin ? 30 : 20,
              color: '#A0AEC0'
            }
          }}
        >
          {icon}
        </Box>
      )}
      {name}
    </Link>
  );
}

LinkItem.propTypes = {
  link: PropTypes.shape({
    href: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    icon: PropTypes.node
  }).isRequired,
  admin: PropTypes.bool.isRequired
};

function MBreadcrumbs({ links, admin, activeLast = false, ...other }) {
  const currentLink = last(links)?.name;

  const listDefault = links.map((link) => <LinkItem  key={link.name} link={link} admin={admin} />);
  const listActiveLast = links.map((link) => (
    <div className='bcwidth'  key={link.name}>
      {link.name !== currentLink ? (
        <LinkItem link={link} admin={admin} />
      ) : (
        <Typography className='bdtext'
          variant={admin ? 'body1' : 'body1'}
          sx={{
            maxWidth: 260,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            color: admin ? 'text.disabled' : 'common.black',
            textOverflow: 'ellipsis',
            fontWeight: 'bold' // <-- This makes the text bold
          }}
        >
          {currentLink}
        </Typography>
      )}
    </div>
  ));

  return (
    <Breadcrumbs separator="›" {...other}>
      {activeLast ? listDefault : listActiveLast}
    </Breadcrumbs>
  );
}

MBreadcrumbs.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      href: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      icon: PropTypes.node
    })
  ).isRequired,
  admin: PropTypes.bool.isRequired,
  icon: PropTypes.node,
  activeLast: PropTypes.bool
};

export default MBreadcrumbs;
