import React from 'react';
import {Grid} from '@material-ui/core';
import {PushToTalkButton,PushToTalkButtonContainer,ErrorPanel} from '@speechly/react-ui';
import Details from './components/Details/details';
import MainComponent from './components/Main/main';
import useStyles from './style';
const app = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const classes=useStyles();
    return (
       <Grid className={classes.grid} container spacing={0} alignItems="center" justify="center" style={{height:'100vh'}}>
           <Grid item xs={12} sm={3}>
                <Details title="Income"/>
           </Grid>
           <Grid item xs={12} sm={3}>
                <MainComponent/>
           </Grid>
           <Grid item xs={12} sm={3}>
                <Details title="Expense"/>
           </Grid>
           <Grid item xs={12}>
               <PushToTalkButtonContainer>
                     <PushToTalkButton/>
                    <ErrorPanel/>
               </PushToTalkButtonContainer>
           </Grid>
       </Grid>
    )
}

export default app
