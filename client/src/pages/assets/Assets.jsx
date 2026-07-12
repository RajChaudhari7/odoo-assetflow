import { useEffect, useState } from "react";

import AssetTable from "../../components/assets/AssetTable";
import AssetModal from "../../components/assets/AssetModal";

import {
    getAssets,
    createAsset,
    updateAsset,
    deleteAsset
} from "../../services/assetService";


const Assets = () => {


    const [assets, setAssets] = useState([]);

    const [loading, setLoading] = useState(false);


    const [openModal, setOpenModal] = useState(false);


    const [selectedAsset, setSelectedAsset] = useState(null);


    const [search, setSearch] = useState("");

    const [status, setStatus] = useState("");

    const [condition, setCondition] = useState("");



    // Fetch Assets

    const fetchAssets = async () => {

        try {

            setLoading(true);


            const res = await getAssets({

                search,
                status,
                condition

            });


            setAssets(res.assets || []);


        }
        catch (error) {

            console.log(error);

        }
        finally {

            setLoading(false);

        }


    };



    useEffect(() => {

        fetchAssets();

    }, [search, status, condition]);




    // Create / Update

    const handleSubmit = async (form) => {


        try {


            if (selectedAsset) {

                await updateAsset(
                    selectedAsset._id,
                    form
                );

            }
            else {

                await createAsset(form);

            }


            setOpenModal(false);

            setSelectedAsset(null);

            fetchAssets();


        }
        catch (error) {

            console.log(error);

        }


    };




    // Delete

    const handleDelete = async (id) => {


        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete this asset?"
            );


        if (!confirmDelete)
            return;



        try {


            await deleteAsset(id);

            fetchAssets();


        }
        catch (error) {

            console.log(error);

        }


    };




    const handleEdit = (asset) => {

        setSelectedAsset(asset);

        setOpenModal(true);

    };




    return (

        <div className="p-6">


            <div className="
flex justify-between items-center mb-6
">


                <h1 className="text-2xl font-bold">
                    Asset Management
                </h1>



                <button

                    onClick={() => {

                        setSelectedAsset(null);

                        setOpenModal(true);

                    }}

                    className="
bg-blue-600
text-white
px-4 py-2
rounded-lg
"

                >

                    + Add Asset

                </button>


            </div>





            {/* Filters */}


            <div className="
grid grid-cols-3 gap-4 mb-5
">


                <input

                    placeholder="Search Asset Name / ID / Serial"

                    value={search}

                    onChange={(e) => setSearch(e.target.value)}

                    className="
border p-3 rounded-lg
"

                />



                <select

                    value={status}

                    onChange={(e) => setStatus(e.target.value)}

                    className="
border p-3 rounded-lg
"

                >

                    <option value="">
                        All Status
                    </option>

                    <option>
                        Available
                    </option>

                    <option>
                        Allocated
                    </option>

                    <option>
                        Maintenance
                    </option>

                    <option>
                        Retired
                    </option>


                </select>




                <select

                    value={condition}

                    onChange={(e) => setCondition(e.target.value)}

                    className="
border p-3 rounded-lg
"

                >


                    <option value="">
                        All Condition
                    </option>

                    <option>
                        New
                    </option>


                    <option>
                        Good
                    </option>


                    <option>
                        Fair
                    </option>


                    <option>
                        Damaged
                    </option>


                </select>



            </div>






            {

                loading ?

                    (

                        <p>
                            Loading assets...
                        </p>

                    )

                    :

                    (

                        <AssetTable

                            assets={assets}

                            onEdit={handleEdit}

                            onDelete={handleDelete}

                        />

                    )

            }







            <AssetModal

                open={openModal}

                close={() => {

                    setOpenModal(false);

                    setSelectedAsset(null);

                }}

                asset={selectedAsset}

                onSubmit={handleSubmit}

            />





        </div>


    )

}


export default Assets;