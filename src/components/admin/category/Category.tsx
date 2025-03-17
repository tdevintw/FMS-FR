
const Category = () => {
    const cartItems = [
        {
            id: 1,
            image: "https://www.excelkiddzfoundation.com.ng/wp-content/uploads/2023/09/Fruits-1-1.webp",
            title: "Fruits",

        },
        {
            id: 2,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQriYLnaTLPDqPpKFcjPrl4PVWTuqdeBreO8A&s",
            title: "Vegetables",
        },
    ];

    return (
                <table className="w-full border border-gray-200 text-left">
                    <thead>
                    <tr className="bg-gray-100">
                        <th style={{textAlign : 'center',width : '20rem'}} className="p-3">Image</th>
                        <th style={{textAlign : 'center'}} className="p-3 w-25">Category</th>
                        <th style={{textAlign : 'center'}} className="p-3">Edit</th>
                        <th style={{textAlign : 'center'}} className="p-3">Remove</th>
                    </tr>
                    </thead>
                    <tbody>
                    {cartItems.map((item) => (
                        <tr key={item.id} className="border-t">
                            <td className="p-3 text-center">
                                <img style={{width : '7rem'}} src={item.image} alt={item.title} className="w-16" />
                            </td>
                            <td className="p-3 ">
                                {item.title}
                            </td>
                            <td className="p-3 text-red-500 cursor-pointer"><img style={{width : '2rem'}} src={"https://cdn-icons-png.flaticon.com/128/2782/2782988.png"} /></td>
                            <td className="p-3 text-red-500 cursor-pointer"><img style={{width : '2rem'}} src={"https://cdn-icons-png.flaticon.com/128/1827/1827933.png"} /></td>

                        </tr>
                    ))}
                    </tbody>
                </table>

    );
};

export default Category;
