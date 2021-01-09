import React, { useState,useEffect,useContext } from 'react'
import { TextField, Typography, Grid, Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import useStyles from './styles';
import { ExpenseTrackerContext } from './../../../context/context';
import { v4 as uuidv4 } from 'uuid';
import { incomeCategories, expenseCategories } from './../../../consts/categories';
import { formatDate } from './../../../util/formatDate';
import { useSpeechContext } from '@speechly/react-client'

const form = () => {

    const intialState = {
        amount: '',
        category: '',
        type: 'Income',
        date: formatDate(new Date())
    }
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [formData, setFormData] = useState(intialState);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { addTransactions } = useContext(ExpenseTrackerContext);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {segment}=useSpeechContext();
    const createTransactions = () => {
        const transactionId = uuidv4();
        const transaction = { ...formData, amount: Number(formData.amount), id: transactionId };
        addTransactions(transaction);
        setFormData(intialState);
    }

    const selectedCategories = formData.type === 'Income' ? incomeCategories : expenseCategories;

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(()=>{
        if(segment)
        {
            // console.log(segment.intent.intent);
            if(segment.intent.intent === 'add_expense')
            {
                setFormData({...formData,type:"Expense"})
            }
            else if(segment.intent.intent === 'add_income')
            {
                setFormData({...formData,type:"Income"})
            }
            else if(segment.isFinal && segment.intent.intent === 'create_transaction')
            {
                return createTransactions();
            }
            else if(segment.isFinal && segment.intent.intent === 'delete_transaction')
            {
                console.log("Cancel transaction is called");
                setFormData(intialState);
            }
            segment.entities.forEach((e)=>{
                console.log("entites are");
                console.log(e.type);
                
                const category=`${e.value.charAt(0)}${e.value.slice(1).toLowerCase()}`
                console.log(category);
                // eslint-disable-next-line default-case
                switch(e.type)
                {
                    case 'amount':
                        console.log("Amount is called");
                        setFormData({...formData,amount:e.value});
                        break;
                    case 'date':
                        console.log("date is called");
                        setFormData({...formData,date:e.value});
                        break;
                    case 'category':
                        console.log("Category is called");
                        setFormData({...formData,category});
                        break;
                    default:
                        console.log("Not clear");

                }
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[segment])

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const classes = useStyles();
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography align="center" variant="subtitle2" gutterBottom>
                    {segment && segment.words.map((w)=> w.value).join(" ")}
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth>
                    <InputLabel>Type</InputLabel>
                    <Select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })}>
                        <MenuItem value="Income">Income</MenuItem>
                        <MenuItem value="Expense">Expense</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
                        {
                            selectedCategories.map((category) => (
                                <MenuItem key={category.type} value={category.type}>{category.type}</MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <TextField type="number" label="Amount" fullWidth value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })} />
            </Grid>
            <Grid item xs={6}>
                <TextField type="date" label="Date" fullWidth value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: formatDate(e.target.value) })} />
            </Grid>
            <Button className={classes.button} variant="outlined" color="primary" fullWidth onClick={createTransactions}>
                Create
            </Button>
        </Grid>
    )
}

export default form
