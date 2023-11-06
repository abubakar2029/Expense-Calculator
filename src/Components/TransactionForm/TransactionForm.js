import { useForm } from "react-hook-form"
import axios from "axios";

function TransactionForm() {
    const { register, handleSubmit } = useForm()
    const onSubmit= (data) => {
        // console.log(data)
        axios.post("/newTransaction", data);
    };
    return (
        <div>TransactionForm
            <div id="transactionInput" className="grid grid-cols-1 justify-items-center">
                <h1>Add New Transaction</h1>
                <hr className="bg-Slate-900 w-full" />
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 justify-items-center">
                        <label className="font-semibold">Description</label>
                        <input {...register("description")} className="border border-gray-300 text-base	 rounded-lg  block w-full  py-1  pl-2"
                            placeholder="Detail of Transaction" />
                        <label className="font-semibold">Transaction Amount</label>
                        <input {...register("transactionAmount")}
                            className="border border-gray-300 text-base rounded-lg  block w-full  pr-5 py-1  pl-2"
                            placeholder="Dollar value of Transaction" />
                        <input type="submit" className="bg-blue-300 hover:bg-blue-400 text-white font-bold rounded px-20 py-1 mt-2 cursor-pointer" />
                    </div>
                </form>
            </div>
        </div>
    )
}
export { TransactionForm }