const dataArray = [
    {
        id: '21',
        title: 'Thermal Winter Fleece Jacket',
        image: "./pics/men's-jacket.jpg",
        description: 'Machine washable, Cotton, Polyester Lining; Soft, Comfortable and Thermal',
        category: "men's clothing",
        price: '70',
    },
    {
        id: '22',
        title: 'Quilted Travel Coat',
        image: "./pics/men's-jacket.jpg",
        description: '100% Polyester, Fleece-lined Interior, Two Snap Flat Pockets, a Smart Phone and Passport Pocket, Machine Wash Cold',
        category: "men's clothing",
        price: '250',
    }
]

function getProductData(id) {
    const productData = dataArray.find(product => product.id === id);
    return productData !== undefined
        ? productData
        : (console.log(`Product data does not exist for Id ${id}`), null);
}

export default { dataArray, getProductData };