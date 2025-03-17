
const Country = () => {
    const cartItems = [
        {
            id: 1,
            country : "Morocco"

        },
        {
            id: 2,
            country : "France"

        },
    ];

    return (
        <table className="w-full border border-gray-200 text-left">
            <thead>
            <tr className="bg-gray-100">
                <th style={{textAlign : 'center', width : '20rem'}} className="p-3">Country</th>
                <th style={{textAlign : 'center'}} className="p-3">Edit</th>
                <th style={{textAlign : 'center'}} className="p-3">Remove</th>
            </tr>
            </thead>
            <tbody>
            {cartItems.map((item) => (
                <tr key={item.id} className="border-t">
                    <td className="p-3 ">
                        {item.country}
                    </td>
                    <td className="p-3 text-red-500 cursor-pointer"><img style={{width : '2rem'}} src={"https://cdn-icons-png.flaticon.com/128/2782/2782988.png"} /></td>
                    <td className="p-3 text-red-500 cursor-pointer"><img style={{width : '2rem'}} src={"https://cdn-icons-png.flaticon.com/128/1827/1827933.png"} /></td>

                </tr>
            ))}
            </tbody>
        </table>

    );
};

export default Country;
