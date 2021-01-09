import React, { useContext } from 'react';
import { ExpenseTrackerContext } from './../../../context/context';
import { Avatar, List as MUIList, ListItem, ListItemAvatar, ListItemText, ListItemSecondaryAction, IconButton, Slide } from '@material-ui/core'
import { Delete, MoneyOff } from '@material-ui/icons'
import useStyles from './style';
const list = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const classes = useStyles();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { deleteTransactions, transactions } = useContext(ExpenseTrackerContext);

    return (
        <MUIList dense={false} className={classes.list}>
            {
                transactions.map((transaction) => (
                    <Slide direction="down" in mountOnEnter unmountOnExit key={transaction.id}>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar className={transaction.type === "Income" ? classes.avatarIncome : classes.avatarExpense}>
                                    <MoneyOff />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={transaction.category} secondary={`$${transaction.amount} - ${transaction.date}`}>

                            </ListItemText>
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="delete" onClick={()=> deleteTransactions(transaction.id)}>
                                    <Delete />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    </Slide>
                ))
            }
        </MUIList>
    )
}

export default list
