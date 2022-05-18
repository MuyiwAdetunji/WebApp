import { Box, Button, Paper, Stack, Typography } from '@mui/material'
import HTMLEllipsis from 'react-lines-ellipsis/lib/html'
import CircleIcon from '@mui/icons-material/Circle'
import { useHistory } from 'react-router-dom'
import moment from 'moment'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const JobsListCard = ({ job, onClick, buttonText }) => {
  const naira = '\u20A6'
  const { user } = useSelector((state) => ({ ...state }))

  return (
    <Paper sx={{ p: 2, my: 2 }}>
      <Stack spacing={1}>
        <Typography variant='subtitle2' component='p'>
          {job?.title}
        </Typography>
        <Typography variant='body2' component='p'>
          {`Type: ${job?.jobType}`}{' '}
          <CircleIcon sx={{ fontSize: 5, color: 'black' }} />{' '}
          {job?.minSalary !== null
            ? `Salary Range: ${naira}${job?.minSalary
                ?.toString()
                .replace(
                  /\B(?=(\d{3})+(?!\d))/g,
                  ','
                )} -  ${naira}${job?.maxSalary
                ?.toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
            : `Salary Range: N/A`}
        </Typography>
        <Typography variant='body2' component='p'>
          {moment(job?.createdAt).fromNow()}{' '}
          <CircleIcon sx={{ fontSize: 5, color: 'black' }} />{' '}
          {job?.user?.storeName}{' '}
          <CircleIcon sx={{ fontSize: 5, color: 'black' }} />{' '}
          {job?.workLocation}
        </Typography>
        <Typography variant='body2' component='p'>
          <HTMLEllipsis
            unsafeHTML={job?.description}
            maxLine='1'
            ellipsis='...'
            basedOn='letters'
          />
        </Typography>

        <Button fullWidth variant='primary' onClick={onClick}>
          {buttonText}
        </Button>
      </Stack>
    </Paper>
  )
}

export default JobsListCard
