import React from 'react'
import {Card,CardHeader,CardContent,Typography,Grid,Divider} from '@material-ui/core'
import useStyles from './styles';
import Form from './Form/form';
import List from './List/list';
const main = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const classes=useStyles();
    return (
        <Card>  
            <CardHeader title="Expense tracker" subheader="powered by Speechly"/>
            <CardContent>
                <Typography align="center" variant="h5">Total Balance $100</Typography>
                <Typography variant="subtitle1" style={{ lineHeight:`1.5em`,marginTop:`20px`}}>
                    {/* info card */}
                    Try saying: Add income for $100 in category salary for Monday...
                </Typography>
                <Divider/>
                <Form/>
            </CardContent>
            <CardContent className={classes.cardContent}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                            <List/>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default main
