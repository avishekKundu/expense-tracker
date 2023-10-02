import React, { useState } from "react";

const ExpenseTracker = () => {
    const [expenseList, setExpenseList] = useState([]);
    const [expense, setExpense] = useState({
        name: '',
        amount: '',
    });
    const [totalExpense, setTotalExpense] = useState(0);
    const [budget, setBudget] = useState('');
    const [disabled, setDisabled] = useState(false);
    const [totalBudget, setTotalBudget] = useState(0);
    const [emptyField, setEmptyField] = useState();

    const addExpense = () => {
        if (expense.name.trim() === '' || expense.amount.trim() === '' || budget.trim() === '') {
            setEmptyField(budget);
            return;
        }
        const updateList = [...expenseList, expense];
        setTotalExpense(totalExpense + Number.parseInt(expense.amount));
        setExpenseList(updateList);
        setExpense({ name: '', amount: '' });
    }

    const addBudget = () => {
        setTotalBudget(totalBudget + Number.parseInt(budget));
        setDisabled(true);
    }

    const removeExpense = (index) => {
        const updateList = [...expenseList];
        updateList.splice(index, 1);
        setExpenseList(updateList);
    }

    return (
        <>
            <div className="container-fluid p-3 border border-dark border-2">
                <div className="container p-3 border border-dark border-2 d-flex justify-content-center">
                    <div class="card mr-2">
                        <div class="card-body">
                            <h5 class="card-title">ADD EXPENSE</h5>
                            <div className="container-fluid p-3 inputContainer">
                                <div className="mb-3 expenseName">
                                    <input
                                        className="border border-3 border-dark rounded-2"
                                        type="text"
                                        placeholder="Expense Name"
                                        value={expense.name} onChange={(e) => setExpense({ ...expense, name: e.target.value })} />
                                </div>
                                <div className="expenseAmount">
                                    <input
                                        className="border border-3 border-dark rounded-2"
                                        type="number"
                                        placeholder="Enter Amount"
                                        value={expense.amount} onChange={(e) => setExpense({ ...expense, amount: e.target.value })} />
                                </div>
                            </div>
                            <button class="btn btn-primary" onClick={addExpense}>ADD</button>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">SET BUDGET</h5>
                            <div className="container-fluid p-3 inputContainer">
                                <input
                                    className="border border-3 border-dark rounded-2"
                                    disabled={disabled}
                                    type="number"
                                    placeholder="Enter budget"
                                    value={budget} onChange={(e) => setBudget(e.target.value)} />
                            </div>
                            <button class="btn btn-primary" onClick={addBudget}>SET</button>
                            {disabled && budget > 0 ? (
                                <>
                                    <p className="displayBudget">Current Budget: 	&#8377;{budget}</p>
                                </>
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>
                </div>
                <div className="container-fluid expenseListContainer">
                    <ul className="list-group expense-list">
                        {expenseList.map((expense, index) => (
                            <li key={index} className="expenseLists">
                                <div className="card p-2 listContainer">
                                    <div className="card-body cardBody">
                                        <p className="card-text expenseName"><span>Expense Name:</span> {expense.name}</p>
                                        <p className="card-text expenseAmount"><span>Amount:</span> {expense.amount}</p>
                                        <button onClick={() => removeExpense(index)} className="btn btn-danger border border-3 btnRemove">Delete</button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <center className="totalExpense">Total Expense: {totalExpense}</center>
                {totalExpense > totalBudget ? (
                    <center className="exceedMessage">Budget Exceeded!</center>
                ) : (
                    <></>
                )}
                {emptyField === ''? (
                    <center>Enter Budget!</center>
                ) : (
                    <></>
                )}
            </div>
        </>
    )
}

export default ExpenseTracker;