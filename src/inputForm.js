import React, { useState } from "react";
import './inputForm.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";

const ExpenseTracker = () => {
    const [expenseList, setExpenseList] = useState([]);
    const [expense, setExpense] = useState({
        name: '',
        amount: '',
    });
    let [totalExpense, setTotalExpense] = useState(0);
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
        if(budget.trim() === '') return;
        setTotalBudget(totalBudget + Number.parseInt(budget));
        setDisabled(true);
        setEmptyField();
    }

    const resetBudget = () => {
        setBudget('');
        setDisabled(false);
    }

    const removeExpense = (index) => {
        const updateList = [...expenseList];
        setTotalExpense(totalExpense -= updateList[index].amount);
        updateList.splice(index, 1);
        setExpenseList(updateList);
    }

    return (
        <>
            <div className="main_content">
                <div className="content_head">
                    <div className="content_title">
                        <p>EXPENSE TRACKER</p>
                    </div>
                    <div className="total-expense">
                        <p>Total Expense: {totalExpense}</p>
                    </div>
                </div>
                <div className="content_body">
                    <div className="input_content">
                        <div className="card card-head">
                            <div className="card-body">
                                <h5 className="card-title">ADD EXPENSE</h5>
                                <div className="inputContainer">
                                    <div>
                                        <input
                                            className="border border-3 border-dark rounded-2 inputExpense"
                                            type="text"
                                            placeholder="Expense Name"
                                            value={expense.name} onChange={(e) => setExpense({ ...expense, name: e.target.value })} />
                                    </div>
                                    <div>
                                        <input
                                            className="border border-3 border-dark rounded-2 inputExpenseAmt"
                                            type="number"
                                            placeholder="Enter Amount"
                                            min={0}
                                            value={expense.amount} onChange={(e) => setExpense({ ...expense, amount: e.target.value })} />
                                    </div>
                                </div>
                                <div className="btn_add">
                                    <button className="btn btn-primary border border-2 border-dark add_btn" onClick={addExpense}>ADD</button>
                                </div>
                                <div className="content_foot">
                                    {emptyField === '' ? (
                                        <center>Enter Budget!</center>
                                    ) : (
                                        <></>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="card card-headBudget">
                            <div className="card-body">
                                <h5 className="card-title">SET BUDGET</h5>
                                <div className="inputContainer">
                                    <input
                                        className="border border-3 border-dark rounded-2 inputBudgetAmt"
                                        disabled={disabled}
                                        type="number"
                                        placeholder="Enter budget"
                                        min={0}
                                        value={budget} onChange={(e) => setBudget(e.target.value)} />
                                </div>
                                <div className="btn_budget">
                                    <div>
                                        <button className="btn btn-primary border border-2 border-dark  btn_set" onClick={addBudget}>SET</button>
                                    </div>
                                    <div className="mx-2">
                                        <button className="btn btn-danger border border-2 border-dark  btn_set" onClick={resetBudget}>RESET</button>
                                    </div>
                                </div>
                                <div className="notify_set">
                                    {disabled && budget > 0 ? (
                                        <>
                                            <p className="displayBudget">Current Balance: 	&#8377;{budget}</p>
                                        </>
                                    ) : (
                                        <></>
                                    )}
                                </div>
                                <div className="msg-exceed">
                                    {totalExpense > totalBudget ? (
                                        <p>Budget Exceeded!</p>
                                    ) : (
                                        <></>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="expenseListContainer">
                        <ul className="list-group" id="expense-list">
                            {expenseList.map((expense, index) => (
                                <li key={index} className="expenseLists">
                                    <div className="card p-2 listContainer">
                                        <div className="card-body cardBody">
                                            <p className="card-text expenseName"><span>Expense Name:</span> {expense.name}</p>
                                            <p className="card-text expenseAmount"><span>Amount:</span> {expense.amount}</p>
                                            <div className="btnRemove">
                                                <FontAwesomeIcon onClick={() => removeExpense(index)} icon={faTrashCan} size="2x" style={{ color: "#eb051c", }} className="removeBtn" />
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ExpenseTracker;