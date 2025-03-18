
const Food = () => {
    const cartItems = [
        {
            id: 1,
            image: "https://img-3.journaldesfemmes.fr/a5LFTZ3qU2fUVOmwIVKDJawBJXA=/1500x/smart/83c0e4f55dd846dea2be0be27e715dcd/ccmcms-jdf/10662446.jpg",
            title: "Orange",
            category : "Fruits",

        },
        {
            id: 2,
            image: "https://organicmandya.com/cdn/shop/files/Apples_bf998dd2-0ee8-4880-9726-0723c6fbcff3.jpg?v=1721368465&width=1000",
            title: "Apple",
            category : "Fruits",
        },
    ];

    return (
        <table className="w-full border border-gray-200 text-left">
            <thead>
            <tr className="bg-gray-100">
                <th style={{textAlign : 'center',width : '20rem' , border : '1px solid gray'}} className="p-3">Image</th>
                <th style={{textAlign : 'center', border : '1px solid gray'}} className="p-3 w-25">Food</th>
                <th style={{textAlign : 'center', border : '1px solid gray'}} className="p-3 w-25">Category</th>
                <th style={{textAlign : 'center', border : '1px solid gray'}} className="p-3">Edit</th>
                <th style={{textAlign : 'center', border : '1px solid gray'}} className="p-3">Remove</th>
            </tr>
            </thead>
            <tbody>
            {cartItems.map((item) => (
                <tr key={item.id} className="border-t">
                    <td className="p-3 text-center" style={{border : '1px solid gray'}}>
                        <img style={{width : '7rem'}} src={item.image} alt={item.title} className="w-16" />
                    </td>
                    <td className="p-3 " style={{border : '1px solid gray'}}>
                        {item.title}
                    </td>
                    <td className="p-3 " style={{border : '1px solid gray'}}>
                        {item.category}
                    </td>
                    <td className="p-3 text-red-500 cursor-pointer" style={{border : '1px solid gray',width: '10rem'}}><img style={{width : '1.5rem'}} src={"https://cdn-icons-png.flaticon.com/128/2782/2782988.png"} /></td>
                    <td className="p-3 text-red-500 cursor-pointer" style={{border : '1px solid gray',width:'10rem'}}><img style={{width : '1.5rem'}} src={"https://cdn-icons-png.flaticon.com/128/1827/1827933.png"} /></td>

                </tr>
            ))}
            </tbody>
        </table>

    );
};

export default Food;
