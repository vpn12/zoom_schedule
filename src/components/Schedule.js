import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {loadMeetings} from '../actions/actions.loadMeetings';
import {LOAD_MEETINGS} from '../actions/actions.loadMeetings';
import { setLoggedInState } from '../actions/actions.setLoggedInState';

import {DaysContainer} from '.';
import {Query} from '@redux-requests/react';
import { Typography } from '@material-ui/core';

const RequestError = () => (
  <Typography>Ein Fehler ist aufgetaucht. Bitte versuche es erneut.</Typography>
);

const Spinner = () => (
  <Typography>Lädt...</Typography>
)

const Schedule = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadMeetings()).then(({error}) => {
      const errResStatus = error?.response?.status;
      const errorMessage = error?.response?.data;

      if(errResStatus === 403 && errorMessage === 'invalid Cookie or session expired' && process.env.NODE_ENV !== 'development'){
        dispatch(setLoggedInState(false));
      }else{
        dispatch(setLoggedInState(true));
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  // use dummy data in development mode 
  if(process.env.NODE_ENV === 'development'){
    return <DaysContainer days={[{"name":"Monday","meetings":[{"_id":"606ef8bc7fe20230958101d7","name":"New Meeting","link":"https://randomlink.com","password":"Password"}]},{"name":"Tuesday","meetings":[{"_id":"606ef8c27fe20230958101da","name":"New Meeting","link":"https://randomlink.com","password":"Password"}]},{"name":"Wedensday"},{"name":"Thursday","meetings":[{"_id":"606ef8c77fe20230958101dd","name":"New Meeting","link":"https://randomlink.com","password":"Password"}]},{"name":"Friday","meetings":[{"_id":"606ef8cb7fe20230958101e0","name":"New Meeting","link":"https://randomlink.com","password":"Password"},{"_id":"606ef8cb7fe20230958101e3","name":"New Meeting","link":"https://randomlink.com","password":"Password"}]},{"name":"Saturday"}]} />;
  }

  return (
    <Query
      type={LOAD_MEETINGS}
      errorComponent={RequestError}
      loadingComponent={Spinner}
      noDataMessage={<p>There is no entity currently.</p>}>
      {({data}) => {
        return <DaysContainer days={data} />;
      }}
    </Query>
  );
};
export default Schedule;
