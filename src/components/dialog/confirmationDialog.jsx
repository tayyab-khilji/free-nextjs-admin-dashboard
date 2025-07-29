import React, { useState } from 'react';
import toast from 'react-hot-toast';
import PropTypes from 'prop-types';
import {
    Box,
    DialogTitle,
    DialogContent,
    Stack,
    Typography,
    DialogActions,
    Button,
    IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';


ConfirmationDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    btnCancel: PropTypes.string.isRequired,
    btnConfirm: PropTypes.string.isRequired,
    confirmationClicked: PropTypes.func.isRequired
};


export default function ConfirmationDialog({ title, message, btnCancel, btnConfirm, onClose, confirmationClicked }) {

    const handleConfirm = () => {
        confirmationClicked();
        onClose();
    };


    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <DialogTitle sx={{ fontWeight: 'bold', p: 0 }}>{title}</DialogTitle>
                <IconButton onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            </Box>
            <DialogContent sx={{ pb: '16px !important' }}>
                {/* <DialogContentText>{deleteMessage}</DialogContentText> */}

                <Stack spacing={1} width={1} sx={{ alignItems: 'center' }}>
                    <Typography variant="body" color="text.primary">
                        {message}
                    </Typography>

                </Stack>
            </DialogContent>

            {/* <DialogActions sx={{ pt: '8px !important' }}>
                <Button onClick={onClose}>{btnCancel}</Button>
                <Button variant="contained" onClick={handleConfirm} >
                    {btnConfirm}
                </Button>
            </DialogActions> */}

            <DialogActions sx={{ display: 'flex', justifyContent: 'space-between', mb: 1, px: 2 }}>
                <Button
                    variant="outlined"
                    onClick={onClose}
                    sx={{
                        flex: 1,
                        borderRadius: '50px',
                        fontWeight: 'bold',
                        borderColor: '#004225',
                        color: '#004225',
                        py: 1.5,
                        mr: 1, // space between buttons
                        '&:hover': {
                            borderColor: '#004225',
                            backgroundColor: '#f5f5f5'
                        }
                    }}
                >
                    {btnCancel}
                </Button>
                <Button
                    variant="contained"
                    onClick={handleConfirm}
                    sx={{
                        flex: 1,
                        borderRadius: '50px',
                        backgroundColor: '#52D726',
                        fontWeight: 'bold',
                        py: 1.5,
                        ml: 1, // space between buttons
                        '&:hover': {
                            backgroundColor: '#45c222'
                        }
                    }}
                >
                    {btnConfirm}
                </Button>
            </DialogActions>
        </>
    );
}
