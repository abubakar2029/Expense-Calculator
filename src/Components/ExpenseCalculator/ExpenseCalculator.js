// import axios from "axios";
// import { useForm } from "react-hook-form"
// import { useState } from "react";
// function ExpenseCalculator() {

//     let [totalAmount, setTotalAmount] = useState(0);
//     let [totalIncome, setTotalIncome] = useState(0);
//     let [totalExpense, setTotalExpense] = useState(0);
//     let [currentData1, setcurrentData] = useState(0);
//     const { register, handleSubmit } = useForm()
//     let [transactionHistory, settransactionHistory] = useState([]);


//     const onSubmit = (data) => {
//         const description = data.description
//         const amount = Number(data.transactionAmount)
//         setTotalAmount(totalAmount += amount);
//         if (amount >= 0) {
//             setTotalIncome(totalIncome += amount);
//         } else {
//             setTotalExpense(totalExpense += amount);
//         }
//         const currentRecord = { description, amount, totalAmount, totalIncome, totalExpense };
//         settransactionHistory([...transactionHistory, currentRecord])
//         // axios.post("/newTransaction", currentRecord);
//         console.log(currentRecord);
//         setcurrentData(currentRecord)
//         console.log(transactionHistory);
//     }


//     /* form-data */
//     return (
//         <div className="grid grid-cols-1 place-items-center ">
//             <h1 className="font-semibold text-xl uppercase">Current Balance</h1>
//             <p className="font-semibold text-3xl ">$ {currentData1.totalAmount != undefined ? currentData1.totalAmount : 0}</p>

//             <div className="grid grid-cols-2 uppercase divide-x bg-white pt-2 pb-5 px-16 gap-10 my-2">
//                 <div>
//                     <div >
//                         <h1 className="font-semibold text-lg uppercase">Income</h1>
//                     </div>
//                     <p className="font-semibold text-2xl text-yellow-600 ">$ {currentData1.totalIncome != undefined ? currentData1.totalIncome : 0}</p>
//                 </div>
//                 <div>
//                     <div>
//                         <h1 className="font-semibold text-lg uppercase">Expense</h1>
//                     </div>
//                     <p className="text-teal-400 font-semibold text-2xl">$ {currentData1.totalExpense != undefined ? currentData1.totalExpense : 0}</p>
//                 </div>
//             </div>
//             <div>
//                 <h1 className="font-semibold text-lg">Transaction History</h1>
//                 <hr className="bg-Slate-900 w-full" />
//                 <div className="grid grid-cols-2 ">
//                     {
//                         transactionHistory.map((record, index) => {

//                             if (record.amount >= 0) {
//                                 return <>
//                                     <button onClick={(index) => {
//                                         // setTotalAmount(totalAmount += transactionHistory[index].totalAmount);
//                                         // setTotalIncome(totalIncome += transactionHistory[index].totalIncome);
//                                         // setTotalExpense(totalExpense += transactionHistory[index].totalExpense);
//                                         transactionHistory.splice(index, 1)
//                                     }}>&#xd7;</button>
//                                     <div>{record.description}</div>
//                                     <div>{record.amount}</div>
//                                 </>
//                             } else {
//                                 return <div>
//                                     <button onClick={(index) => {
//                                         // totalAmount += transactionHistory[index].totalAmount;
//                                         // totalIncome += transactionHistory[index].totalIncome;
//                                         // totalExpense += transactionHistory[index].totalExpense;
//                                         transactionHistory.splice(index, 1);
//                                     }}>&#xd7;</button>
//                                     <div>{record.description}</div>
//                                     <div>{record.amount}</div>
//                                 </div>
//                             }

//                         })
//                     }
//                 </div>

//             </div>
//             <div>
//                 <div id="transactionInput" className="grid grid-cols-1 justify-items-start items-stretch gap-y-2">
//                     <h1 className="font-semibold text-lg">Add New Transaction</h1>
//                     <hr className="bg-Slate-900 w-full" />
//                     <form onSubmit={handleSubmit(onSubmit)}>
//                         <div className="grid grid-cols-1">

//                             <label className="font-semibold mt-2">Description</label>
//                             <input {...register("description")} className="border border-gray-300 text-base	 rounded-lg  block w-full  py-1  pl-2 "
//                                 placeholder="Detail of Transaction" />
//                             <label className="font-semibold mt-2">Transaction Amount</label>
//                             <input {...register("transactionAmount")}
//                                 className="border border-gray-300 text-base rounded-lg  block w-full  pr-5 py-1  pl-2"
//                                 placeholder="Dollar value of Transaction" />
//                             <input type="submit" className="bg-blue-300 hover:bg-blue-400 text-white font-bold rounded px-20 py-1 mt-2 cursor-pointer" />
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     )
// }
// export { ExpenseCalculator }
import React, { useState } from "react";
import { useForm } from "react-hook-form";

function ExpenseCalculator() {
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [currentData1, setCurrentData] = useState({});
  const { register, handleSubmit, reset } = useForm();
  const [transactionHistory, setTransactionHistory] = useState([]);

  const onSubmit = (data) => {
    const description = data.description;
    const amount = Number(data.transactionAmount);

    // Calculate new totals
    const newTotalAmount = totalAmount + amount;
    const newTotalIncome = amount >= 0 ? totalIncome + amount : totalIncome;
    const newTotalExpense = amount < 0 ? totalExpense + amount : totalExpense;

    // Create a new transaction record
    const newTransaction = {
      description,
      amount,
      totalAmount: newTotalAmount,
      totalIncome: newTotalIncome,
      totalExpense: newTotalExpense,
    };

    // Update state
    setTotalAmount(newTotalAmount);
    setTotalIncome(newTotalIncome);
    setTotalExpense(newTotalExpense);
    setCurrentData(newTransaction);
    setTransactionHistory([...transactionHistory, newTransaction]);

    // Reset the form
    reset();
  };

  const handleRemoveTransaction = (index) => {
    // Get the transaction to be removed
    const removedTransaction = transactionHistory[index];

    // Calculate new totals after removing the transaction
    const newTotalAmount = totalAmount - removedTransaction.amount;
    const newTotalIncome =
      removedTransaction.amount >= 0
        ? totalIncome - removedTransaction.amount
        : totalIncome;
    const newTotalExpense =
      removedTransaction.amount < 0
        ? totalExpense - removedTransaction.amount
        : totalExpense;

    // Update state
    setTotalAmount(newTotalAmount);
    setTotalIncome(newTotalIncome);
    setTotalExpense(newTotalExpense);

    // Remove the transaction from the history
    const updatedTransactionHistory = [...transactionHistory];
    updatedTransactionHistory.splice(index, 1);
    setTransactionHistory(updatedTransactionHistory);
  };

  return (
    <div className="grid grid-cols-1 place-items-center">
      <h1 className="font-semibold text-xl uppercase">Current Balance</h1>
      <p className="font-semibold text-3xl">
        $ {currentData1.totalAmount != undefined ? currentData1.totalAmount : 0}
      </p>

      <div className="grid grid-cols-2 uppercase divide-x bg-white pt-2 pb-5 px-16 gap-10 my-2">
        <div>
          <div>
            <h1 className="font-semibold text-lg uppercase">Income</h1>
          </div>
          <p className="font-semibold text-2xl text-yellow-600">
            $ {currentData1.totalIncome != undefined ? currentData1.totalIncome : 0}
          </p>
        </div>
        <div>
          <div>
            <h1 className="font-semibold text-lg uppercase">Expense</h1>
          </div>
          <p className="text-teal-400 font-semibold text-2xl">
            $ {currentData1.totalExpense != undefined ? currentData1.totalExpense : 0}
          </p>
        </div>
      </div>
      <div>
        <h1 className="font-semibold text-lg">Transaction History</h1>
        <hr className="bg-Slate-900 w-full" />
        <div className="grid grid-cols-2">
          {transactionHistory.map((record, index) => (
            <div key={index}>
              <button onClick={() => handleRemoveTransaction(index)}>&#xd7;</button>
              <div>{record.description}</div>
              <div>{record.amount}</div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div id="transactionInput" className="grid grid-cols-1 justify-items-start items-stretch gap-y-2">
          <h1 className="font-semibold text-lg">Add New Transaction</h1>
          <hr className="bg-Slate-900 w-full" />
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1">
              <label className="font-semibold mt-2">Description</label>
              <input
                {...register("description")}
                className="border border-gray-300 text-base	 rounded-lg  block w-full  py-1  pl-2"
                placeholder="Detail of Transaction"
              />
              <label className="font-semibold mt-2">Transaction Amount</label>
              <input
                {...register("transactionAmount")}
                className="border border-gray-300 text-base rounded-lg  block w-full  pr-5 py-1  pl-2"
                placeholder="Dollar value of Transaction"
              />
              <input
                type="submit"
                className="bg-blue-300 hover:bg-blue-400 text-white font-bold rounded px-20 py-1 mt-2 cursor-pointer"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export { ExpenseCalculator };
