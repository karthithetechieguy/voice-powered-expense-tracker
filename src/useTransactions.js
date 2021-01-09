import {
    useContext
} from 'react';
import {
    ExpenseTrackerContext
} from './context/context'
import {
    incomeCategories,
    expenseCategories,
    resetCategories
} from './consts/categories';

const useTransaction = (title) => {
    resetCategories();
    const {
        transactions
    } = useContext(ExpenseTrackerContext);
    const transactionsPerType = transactions.filter((t) => t.type === title);
    const total=transactionsPerType.reduce((acc,currVal)=> acc+=currVal.amount,0);
    const categories= title === 'Income' ? incomeCategories : expenseCategories;

    transactionsPerType.forEach((t)=>{
        const category=t.category;
        categories.map((c)=>{
            if(c.type === category)
            {c.amount+=t.amount;}
        });
    })
    const filteredCategories=categories.filter((c)=> c.amount > 0);
    console.log({filteredCategories,total,categories,transactions});
    const chartData={
        datasets:[{
            data:filteredCategories.map((c)=>c.amount),
            backgroundColor:filteredCategories.map((c)=>c.color)
        }],
        labels:filteredCategories.map((c)=>c.type)
    }

    return { filteredCategories,total,chartData}

}

export default useTransaction;