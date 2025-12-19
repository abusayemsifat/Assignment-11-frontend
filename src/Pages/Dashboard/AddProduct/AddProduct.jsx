import React, { useState } from 'react';

const AddProductForm = () => {

    const [showOnHome, setShowOnHome] = useState(false);

    const handleAddProduct = (e) => {
        e.preventDefault();
        const form = e.target;
        const productName = form.productName.value
        const description = form.description.value
        const category = form.category.value
        const price = form.price.value
        const quantity = form.quantity.value
        const moq = form.moq.value
        const productImage = form.productImage.value
        const paymentOption = form.paymentOption.value


        const formData = {
            productName,
            description,
            category,
            price,
            quantity,
            moq,
            productImage,
            paymentOption,
            showOnHome
        }

        console.log(formData)
    }

    return (
        <div className="max-w-3xl bg-white rounded-xl shadow p-6">
            <h2 className="text-2xl font-semibold mb-6">Add New Product</h2>

            <form onSubmit={handleAddProduct} className="space-y-5">

                {/* Product Name */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Product Name
                    </label>
                    <input
                        name='productName'
                        type="text"
                        placeholder="Enter product name"
                        className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>

                {/* Product Description */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Product Description
                    </label>
                    <textarea
                        name='description'
                        rows="4"
                        placeholder="Enter detailed description"
                        className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>

                {/* Category */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Category
                    </label>
                    <select name='category' className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none">
                        <option value="">Select Category</option>
                        <option value='Shirt'>Shirt</option>
                        <option value='Pant'>Pant</option>
                        <option value='Jacket'>Jacket</option>
                        <option value='Accessories'>Accessories</option>
                    </select>
                </div>

                {/* Price & Quantity */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Price
                        </label>
                        <input
                            name='price'
                            type="number"
                            placeholder="৳ Price"
                            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Available Quantity
                        </label>
                        <input
                            name='quantity'
                            type="number"
                            placeholder="Total stock"
                            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>
                </div>

                {/* MOQ */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Minimum Order Quantity (MOQ)
                    </label>
                    <input
                        name='moq'
                        type="number"
                        placeholder="Minimum order quantity"
                        className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>

                {/* Images Upload */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Product Images
                    </label>
                    <input
                        name='productImage'
                        type="file"
                        multiple
                        className="w-full border rounded-lg px-4 py-2"
                    />
                </div>

                {/* Payment Options */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Payment Options
                    </label>
                    <select name='paymentOption' className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none">
                        <option value="">Select payment option</option>
                        <option value="cod">Cash on Delivery</option>
                        <option value="payfirst">PayFirst</option>
                    </select>
                </div>

                {/* Show on Home Page */}
                <div className="border rounded-lg p-4 bg-gray-50">
                    <label className="flex items-start gap-3 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={showOnHome}
                            onChange={(e) => setShowOnHome(e.target.checked)}
                            className="mt-1 h-4 w-4"
                        />
                        <div>
                            <p className="font-medium text-sm">Show on Home Page</p>
                            <p className="text-xs text-gray-500">
                                Enable this to display the product on the homepage
                            </p>
                        </div>
                    </label>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    Add Product
                </button>

            </form>
        </div>
    );
};

export default AddProductForm;
