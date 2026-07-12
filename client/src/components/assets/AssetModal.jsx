import { useEffect, useState } from "react";

import { getCategories } from "../../services/categoryService";
import { getDepartments } from "../../services/departmentService";


const AssetModal = ({ open, close, onSubmit, asset }) => {


    const [categories, setCategories] = useState([]);

    const [departments, setDepartments] = useState([]);



    const [form, setForm] = useState({

        assetName: "",
        serialNumber: "",
        category: "",
        department: "",
        purchaseDate: "",
        purchaseCost: "",
        vendor: "",
        warrantyExpiry: "",
        condition: "New",
        remarks: "",

    });



    // Load Categories and Departments

    useEffect(() => {


        const loadData = async () => {

            try {


                const categoryResponse = await getCategories();

                const departmentResponse = await getDepartments();



                console.log(
                    "Category Response:",
                    categoryResponse
                );


                console.log(
                    "Department Response:",
                    departmentResponse
                );




                setCategories(

                    categoryResponse.data?.categories ||

                    categoryResponse.data ||

                    categoryResponse.categories ||

                    []

                );




                setDepartments(

                    departmentResponse.data?.departments ||

                    departmentResponse.data ||

                    departmentResponse.departments ||

                    []

                );



            }
            catch(error) {


                console.log(
                    "Dropdown loading error:",
                    error
                );


            }


        };



        if(open){

            loadData();

        }



    }, [open]);







    // Edit Asset Data

    useEffect(() => {


        if(asset){


            setForm({

                assetName:
                asset.assetName || "",


                serialNumber:
                asset.serialNumber || "",



                category:
                asset.category?._id ||
                asset.category ||
                "",



                department:
                asset.department?._id ||
                asset.department ||
                "",



                purchaseDate:
                asset.purchaseDate
                ?
                asset.purchaseDate.substring(0,10)
                :
                "",




                purchaseCost:
                asset.purchaseCost || "",



                vendor:
                asset.vendor || "",



                warrantyExpiry:
                asset.warrantyExpiry
                ?
                asset.warrantyExpiry.substring(0,10)
                :
                "",



                condition:
                asset.condition || "New",



                remarks:
                asset.remarks || "",


            });


        }
        else{


            setForm({

                assetName:"",
                serialNumber:"",
                category:"",
                department:"",
                purchaseDate:"",
                purchaseCost:"",
                vendor:"",
                warrantyExpiry:"",
                condition:"New",
                remarks:"",

            });


        }



    },[asset]);








    const handleChange = (e)=>{


        setForm({

            ...form,

            [e.target.name]:
            e.target.value,

        });


    };







    const handleSubmit = (e)=>{

        e.preventDefault();


        onSubmit(form);


    };






    if(!open)

        return null;








    return (

        <div
        className="
        fixed inset-0
        bg-black/40
        flex items-center
        justify-center
        z-50
        "
        >




        <form

        onSubmit={handleSubmit}

        className="
        bg-white
        p-6
        rounded-xl
        w-[500px]
        space-y-3
        max-h-[90vh]
        overflow-y-auto
        "

        >




        <h2 className="text-xl font-bold">

        {
            asset
            ?
            "Edit Asset"
            :
            "Add Asset"
        }

        </h2>








        <input

        name="assetName"

        placeholder="Asset Name"

        value={form.assetName}

        onChange={handleChange}

        className="border p-2 w-full"

        />







        <input

        name="serialNumber"

        placeholder="Serial Number"

        value={form.serialNumber}

        onChange={handleChange}

        className="border p-2 w-full"

        />









        <select

        name="category"

        value={form.category}

        onChange={handleChange}

        className="border p-2 w-full"

        >



        <option value="">
            Select Category
        </option>




        {
            categories.map((category)=>(


                <option

                key={category._id}

                value={category._id}

                >

                    {category.name}

                </option>


            ))
        }



        </select>









        <select

        name="department"

        value={form.department}

        onChange={handleChange}

        className="border p-2 w-full"

        >




        <option value="">
            Select Department
        </option>





        {
            departments.map((department)=>(


                <option

                key={department._id}

                value={department._id}

                >

                    {department.name}

                </option>



            ))
        }



        </select>









        <input

        type="date"

        name="purchaseDate"

        value={form.purchaseDate}

        onChange={handleChange}

        className="border p-2 w-full"

        />









        <input

        type="number"

        name="purchaseCost"

        placeholder="Purchase Cost"

        value={form.purchaseCost}

        onChange={handleChange}

        className="border p-2 w-full"

        />









        <input

        name="vendor"

        placeholder="Vendor"

        value={form.vendor}

        onChange={handleChange}

        className="border p-2 w-full"

        />









        <input

        type="date"

        name="warrantyExpiry"

        value={form.warrantyExpiry}

        onChange={handleChange}

        className="border p-2 w-full"

        />









        <select

        name="condition"

        value={form.condition}

        onChange={handleChange}

        className="border p-2 w-full"

        >



        <option value="New">
            New
        </option>


        <option value="Good">
            Good
        </option>


        <option value="Fair">
            Fair
        </option>


        <option value="Damaged">
            Damaged
        </option>



        </select>









        <textarea

        name="remarks"

        placeholder="Remarks"

        value={form.remarks}

        onChange={handleChange}

        className="border p-2 w-full"

        />









        <div>


        <button

        className="
        bg-blue-600
        text-white
        px-4
        py-2
        rounded
        "

        >

        Save Asset

        </button>





        <button

        type="button"

        onClick={close}

        className="
        ml-3
        px-4
        py-2
        "

        >

        Cancel

        </button>



        </div>





        </form>



        </div>

    );


};


export default AssetModal;