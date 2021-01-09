import React from 'react';
import {Card,CardHeader,CardContent,Typography} from '@material-ui/core';
import {Doughnut} from 'react-chartjs-2'
import useStyles from './styles';
import useTransaction from './../../useTransactions';

const details = ({title}) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const classes=useStyles();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {total,chartData}=useTransaction(title);
    return (
        <Card className={title == "Income" ? classes.income : classes.expense}>
            <CardHeader title={title} />
            <CardContent>
                    <Typography variant="h5">${total}</Typography>
                    <Doughnut data={chartData}></Doughnut>
            </CardContent>
        </Card>
    )
}

export default details
