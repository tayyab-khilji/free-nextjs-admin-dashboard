'use client'
import React from 'react';
import PropTypes from 'prop-types';
import { enUS } from 'date-fns/locale';
import { useRouter } from 'next-nprogress-bar';
import { styled } from '@mui/material/styles';
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Stack,
    Avatar,
    Tooltip,
    Divider,
    Paper,
    Skeleton,
    IconButton
} from '@mui/material';
import Label from 'src/components/label';
import { fDateShort } from 'src/utils/formatTime';
import { FiEye } from 'react-icons/fi';

const TABLE_HEAD = [
    { id: 'name', label: 'Name', alignRight: false, sort: true },
    { id: 'email', label: 'Email', alignRight: false, sort: true },
    { id: 'plan', label: 'Plan', alignRight: false, sort: false },
    { id: 'joined', label: 'Joining Date', alignRight: false, sort: true },
    { id: 'status', label: 'Status', alignRight: false, sort: true },
    { id: '', label: 'Actions', alignRight: true }
];

const data = {
    "data": [
        {
            "_id": "507f1f77bcf86cd799439011",
            "cover": {
                "url": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
            },
            "name": "john doe",
            "email": "john.doe@example.com",
            "plan": "Free",
            "status": "active",
            "createdAt": "2024-01-15T10:30:00.000Z"
        },
        {
            "_id": "507f1f77bcf86cd799439012",
            "cover": {
                "url": "https://images.unsplash.com/photo-1494790108755-2616b612b169?w=150&h=150&fit=crop&crop=face"
            },
            "name": "jane smith",
            "email": "jane.smith@example.com",
            "plan": "Monthly",
            "status": "blocked",
            "createdAt": "2024-02-20T14:45:00.000Z"
        },
        {
            "_id": "507f1f77bcf86cd799439013",
            "cover": null,
            "name": "mike johnson",
            "email": "mike.johnson@example.com",
            "plan": "Annual",
            "status": "suspended",
            "createdAt": "2024-03-10T09:15:00.000Z"
        },
        {
            "_id": "507f1f77bcf86cd799439014",
            "cover": {
                "url": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
            },
            "name": "sarah wilson",
            "email": "sarah.wilson@example.com",
            "plan": "Free",
            "status": "pending",
            "createdAt": "2023-12-05T16:20:00.000Z"
        },
        {
            "_id": "507f1f77bcf86cd799439015",
            "cover": {
                "url": "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop&crop=face"
            },
            "name": "david brown",
            "email": "david.brown@example.com",
            "plan": "Monthly",
            "status": "active",
            "createdAt": "2024-04-02T11:30:00.000Z"
        },
        {
            "_id": "507f1f77bcf86cd799439016",
            "cover": null,
            "name": "emily davis",
            "email": "emily.davis@example.com",
            "plan": "Annual",
            "status": "suspended",
            "createdAt": "2024-01-28T08:45:00.000Z"
        }
    ]
}

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:not(:last-child)': {
        borderBottom: `1px solid ${theme.palette.divider}`
    },
    '&:hover': {
        backgroundColor: theme.palette.action.hover
    }
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    padding: theme.spacing(2),
    border: 'none'
}));

const DashboardUserTable = ({ isLoading = false }) => {
    const router = useRouter();

    return (
        <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 1 }}>
            <Table>
                <TableHead sx={{ backgroundColor: 'black' }}>
                    <TableRow>
                        {TABLE_HEAD.map((headCell) => (
                            <StyledTableCell
                                key={headCell.id}
                                align={headCell.alignRight ? 'right' : 'left'}
                                sx={{ color: 'white', fontWeight: 'bold' }}
                            >
                                {headCell.label}
                            </StyledTableCell>
                        ))}
                    </TableRow>
                </TableHead>

                <TableBody>
                    {isLoading ? (
                        Array.from({ length: 5 }).map((_, index) => (
                            <StyledTableRow key={`skeleton-${index}`}>
                                {TABLE_HEAD.map((headCell) => (
                                    <StyledTableCell key={`skeleton-${headCell.id}-${index}`}>
                                        <Skeleton variant="text" width={headCell.id === 'plan' ? 80 : 'auto'} />
                                    </StyledTableCell>
                                ))}
                            </StyledTableRow>
                        ))
                    ) : (
                        data.data.map((row) => (
                            <React.Fragment key={row._id}>
                                <StyledTableRow hover>
                                    <StyledTableCell>
                                        <Box display="flex" alignItems="center">
                                            {/* {row.cover ? (
                                                <Avatar src={row.cover.url} alt={row.name} sx={{ mr: 2 }} />
                                            ) : (
                                                <Avatar sx={{ mr: 2 }}>
                                                    {row.name.charAt(0).toUpperCase()}
                                                </Avatar>
                                            )} */}
                                            <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
                                                {row.name}
                                            </Typography>
                                        </Box>
                                    </StyledTableCell>

                                    <StyledTableCell>{row.email}</StyledTableCell>

                                    <StyledTableCell>
                                        <Label
                                            variant="filled"
                                            sx={{
                                                width: 80,
                                                minWidth: 80,
                                                textAlign: 'center',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap'
                                            }}
                                        >
                                            {row.plan || 'N/A'}
                                        </Label>
                                    </StyledTableCell>

                                    <StyledTableCell>
                                        {fDateShort(row.createdAt, enUS)}
                                    </StyledTableCell>

                                    <StyledTableCell>
                                        <Label
                                            variant="filled"
                                            color={
                                                (row.status === 'blocked' && 'error') ||
                                                (row.status === 'pending' && 'warning') ||
                                                (row.status === 'active' && 'success') ||
                                                (row.status === 'suspended' && 'error') ||
                                                'default'
                                            }
                                        >
                                            {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
                                        </Label>
                                    </StyledTableCell>

                                    <StyledTableCell align="right">
                                        <Tooltip title="View">
                                            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                                View
                                            </Typography>
                                        </Tooltip>
                                    </StyledTableCell>
                                </StyledTableRow>
                            </React.Fragment>
                        ))
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

DashboardUserTable.propTypes = {
    isLoading: PropTypes.bool
};

export default DashboardUserTable;