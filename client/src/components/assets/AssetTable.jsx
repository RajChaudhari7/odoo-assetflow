const AssetTable = ({
    assets,
    onEdit,
    onDelete
}) => {


    return (

        <div className="overflow-x-auto">

            <table className="w-full text-sm">

                <thead className="bg-gray-100">

                    <tr>

                        <th className="p-3 text-left">
                            Asset ID
                        </th>

                        <th className="p-3 text-left">
                            Name
                        </th>

                        <th className="p-3 text-left">
                            Category
                        </th>

                        <th className="p-3 text-left">
                            Department
                        </th>

                        <th className="p-3 text-left">
                            Status
                        </th>

                        <th className="p-3 text-left">
                            Condition
                        </th>

                        <th className="p-3">
                            Action
                        </th>


                    </tr>

                </thead>


                <tbody>


                    {
                        assets.map(asset => (

                            <tr
                                key={asset._id}
                                className="border-b"
                            >


                                <td className="p-3">
                                    {asset.assetId}
                                </td>


                                <td className="p-3">
                                    {asset.assetName}
                                </td>


                                <td className="p-3">
                                    {asset.category?.name}
                                </td>


                                <td className="p-3">
                                    {asset.department?.name}
                                </td>



                                <td className="p-3">


                                    <span
                                        className="
px-3 py-1 rounded-full
bg-blue-100 text-blue-700
"
                                    >

                                        {asset.status}

                                    </span>


                                </td>



                                <td className="p-3">

                                    {asset.condition}

                                </td>



                                <td className="p-3 flex gap-2">


                                    <button
                                        onClick={() => onEdit(asset)}
                                        className="
px-3 py-1 bg-yellow-500 text-white rounded
"
                                    >
                                        Edit
                                    </button>


                                    <button
                                        onClick={() => onDelete(asset._id)}
                                        className="
px-3 py-1 bg-red-500 text-white rounded
"
                                    >
                                        Delete
                                    </button>


                                </td>



                            </tr>


                        ))
                    }


                </tbody>

            </table>

        </div>

    )

}


export default AssetTable;