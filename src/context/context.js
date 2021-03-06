import React,{useReducer,createContext} from 'react';

import contextReducer from './contextReducer';

const initialState=[];

export const ExpenseTrackerContext=createContext(initialState);

export const Provider=({children})=>{
    const [transactions, dispatch] = useReducer(contextReducer, initialState)

    // Actions Creators
    const deleteTransactions=(id)=> dispatch({type:'DELETE_TRANSACTION',payload:id});

    const addTransactions=(transaction)=>dispatch({type:'ADD_TRANSACTION',payload:transaction});

    return (
        <ExpenseTrackerContext.Provider value={{
            deleteTransactions,addTransactions,transactions
        }}>
            {children}
        </ExpenseTrackerContext.Provider>
    )
}
