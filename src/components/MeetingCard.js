import React from 'react';
import { Card, Typography, makeStyles, Button, ButtonGroup, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { deleteMeeting } from '../actions/actions.meeting';
import { PlayArrow, Delete, Edit } from '@material-ui/icons';
import { setFormDialogState } from '../actions/actions.setFormDialogState';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    padding: theme.spacing(1, 1, 1, 1),
    borderTop: `0.25em solid ${theme.palette.primary.main}`,

    '&:not(:last-child)': {
      marginBottom: theme.spacing(2),
    },
    '& Button': {
      backgroundColor: theme.palette.primary.main,
      borderRadius: '5em',
      height: '2em',
      width: '50%',
      marginTop: theme.spacing(1),
      color: 'white',
      '&.MuiButton-outlined': {
        border: '1px solid rgba(255, 255, 255, 0.23)',
      },
    },
  },
  meetingWrapper: {
    width: '100%',
  },
  deleteButton: {
    position: 'absolute',
    right: theme.spacing(0.3),
    top: theme.spacing(0.3),
    color: theme.palette.error.main,
  },
  editButton: {
    position: 'absolute',
    right: theme.spacing(4),
    top: theme.spacing(0.3),
  },
  meetingName: {
    fontWeight: 'bold',
  },
  joinButton: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: '5em',
    height: '2em',
  },
  joinIcon: {
    marginRight: theme.spacing(0.5),
  },
}));

const MeetingCard = ({ meeting, day }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const getDeleteConfirm = () => {
    const confirmed = window.confirm('Are you sure?');
    if (confirmed) {
      dispatch(deleteMeeting(meeting, day));
    }
  };

  const openDialogForMeetingEdit = () => {
    dispatch(
      setFormDialogState({
        open: true,
        onClose: closeDialog,
        mode: 'edit',
        meeting: {
          day,
          ...meeting,
        },
      })
    );
  };

  const closeDialog = () => {
    dispatch(
      setFormDialogState({
        open: false,
        onClose: () => {},
        mode: 'create',
        meeting: {},
      })
    );
  };

  const join = async () => {
    await navigator.clipboard.writeText(meeting.password);
    window.open(meeting.link, '_blank');
  };

  return (
    <Card className={classes.root}>
      <Grid container direction="column" justify="center" alignContent="center">
        <Typography className={classes.meetingName}>{meeting.name}</Typography>
        <Button className={classes.joinButton} onClick={join} size="large">
          <PlayArrow className={classes.joinIcon} />
          Join
        </Button>
        <ButtonGroup className={classes.metaButtons} size="large">
          <Button onClick={openDialogForMeetingEdit}>
            <Edit />
          </Button>
          <Button onClick={getDeleteConfirm}>
            <Delete />
          </Button>
        </ButtonGroup>
        <Typography>Password: {meeting.password}</Typography>
      </Grid>
    </Card>
  );
};

export default MeetingCard;
