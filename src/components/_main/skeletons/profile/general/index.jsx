import React from 'react';
// mui
import { Box, Card, Grid, Skeleton, Stack, Typography } from '@mui/material';

export default function index() {
  return (
    <Box
      sx={{
        mt: 3
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Card sx={{ p: 3 }}>


            <Stack spacing={3}>

              <Stack alignItems="center">
                <Skeleton variant="circular" width={162} height={162} />
              </Stack>

              {/* <Stack direction={{ md: 'row', xs: 'column' }} justifyContent="space-between" spacing={2}>
                <Skeleton variant="rounded" height={56} width="100%" />
                <Skeleton variant="rounded" height={56} width="100%" />
              </Stack> */}

              <Skeleton variant="rounded" height={56} />
              <Skeleton variant="rounded" height={56} />
              <Stack direction={{ md: 'row', xs: 'column' }} spacing={2}>
                <Box sx={{ width: { md: '33%', xs: '100%' } }} /> {/* Empty left cell taking 1/3 space */}
                <Box sx={{ width: { md: '66%', xs: '100%' }, display: 'flex', gap: 2 }}>
                  <Skeleton variant="rounded" height={56} width="100%" />
                  <Skeleton variant="rounded" height={56} width="100%" />
                </Box>
              </Stack>

            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
