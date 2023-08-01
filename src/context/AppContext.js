import React, { createContext, useReducer } from 'react';

// 5. The reducer - this is used to update the state, based on the action
export const AppReducer = (state, action) => {
    let new_expenses = [];
    switch (action.type) {

        case 'ADD_QUANTITY':
           // let updatedqty = false;
            state.expenses.map((expense)=>{
                if(expense.name === action.payload.name) {
                    expense.quantity = expense.quantity + action.payload.quantity;
                    //updatedqty = true;
                }
                new_expenses.push(expense);
                return true;
            })
            state.expenses = new_expenses;
            action.type = "DONE";

            state.SpentValue= state.expenses.reduce((total, item) => {
                return (total += (item.unitprice * item.quantity));
            }, 0);

          state.RemainingValue= state.BudgetValue-state.SpentValue;

            if(action.payload.quantity > state.BudgetValue){
                alert("Allocation cannot be more then budget");
            }
            return {
                ...state,
            };

            case 'RED_QUANTITY':
                state.expenses.map((expense)=>{
                    if(expense.name === action.payload.name) {
                        expense.quantity = expense.quantity - action.payload.quantity;
                    }
                    expense.quantity = expense.quantity < 0 ? 0: expense.quantity;
                    new_expenses.push(expense);
                    return true;
                })
                state.expenses = new_expenses;
                action.type = "DONE";
                return {
                    ...state,
                };
       
                case 'DELETE_ITEM':
           
                state.expenses.map((expense)=>{
                    if(expense.name === action.payload.name) {
                      
                        expense.quantity = expense.quantity -10;
                        //updatedqty = true;
                    }
                    state.SpentValue= state.expenses.reduce((total, item) => {
                        return (total += (item.unitprice * item.quantity));
                    }, 0);
        
                  state.RemainingValue= state.BudgetValue-state.SpentValue;
                    new_expenses.push(expense);
                    return true;
                })
                state.expenses = new_expenses;
           
              
            action.type = "DONE";
            return {
                ...state,
            };

            case 'ADD_ITEM':
           
            state.expenses.map((expense)=>{
                if(expense.name === action.payload.name) {
                  
                    expense.quantity = expense.quantity +10;
                    //updatedqty = true;
                }
                state.SpentValue= state.expenses.reduce((total, item) => {
                    return (total += (item.unitprice * item.quantity));
                }, 0);
    
              state.RemainingValue= state.BudgetValue-state.SpentValue;
                new_expenses.push(expense);
                return true;
            })
            state.expenses = new_expenses;
       
          
        action.type = "DONE";
        return {
            ...state,
        };
    
            case 'CHG_LOCATION':
            action.type = "DONE";
            state.Location = action.payload;
            return {
                ...state
            }

            case 'ADD_BUDGET':
                action.type="DONE";
                state.BudgetValue=action.payload;
                if(state.BudgetValue>20000){
                    alert("Value cannot exceed 20000");
                }
                if(state.BudgetValue <state.SpentValue){
                    alert("Value cannot be lower then allocated budget");
                }
                return {
                    ...state
                }
               
        default:
            return state;
            
    }
};

// 1. Sets the initial state when the app loads
const initialState = {
    expenses: [
        { id: "Shirt", name: 'Shirt', quantity: 0, unitprice: 1 },
        { id: "Jeans", name: 'Jeans', quantity: 0, unitprice: 1 },
        { id: "Dress", name: 'Dress', quantity: 0, unitprice: 1 },
        { id: "Dinner set", name: 'Dinner set', quantity: 0, unitprice: 1 },
        { id: "Bags", name: 'Bags', quantity: 0, unitprice: 1 },
    ],
    Location: '$',
    BudgetValue: 0,
    RemainingValue: 0,
    SpentValue:0
    
};

// 2. Creates the context this is the thing our components import and use to get the state
export const AppContext = createContext();

// 3. Provider component - wraps the components we want to give access to the state
// Accepts the children, which are the nested(wrapped) components
export const AppProvider = (props) => {
    // 4. Sets up the app state. takes a reducer, and an initial state
    const [state, dispatch] = useReducer(AppReducer, initialState);

    const totalExpenses = state.expenses.reduce((total, item) => {
        return (total = total + (item.unitprice*item.quantity));
    }, 0);
state.CartValue = totalExpenses;

    return (
        <AppContext.Provider
            value={{
                expenses: state.expenses,
                CartValue: state.CartValue,
                dispatch,
                Location: state.Location,
                BudgetValue : state.BudgetValue,
                RemainingValue: state.RemainingValue,
                SpentValue: state.SpentValue
                
            }}
        >
            {props.children}
        </AppContext.Provider>
    );
};