import React from 'react'
import { useAppContext } from '../context/AppContext'
import { useParams } from 'react-router-dom'
import { categories } from '../assets/assets'
import ProductCard from '../components/ProductCard'

const ProductCategory = () => {
    const { products } = useAppContext()
    const { category } = useParams()

    // Match the URL param with the `path` field of categories
    const searchCategory = categories.find(
        (item) => item.path.toLowerCase() === category.toLowerCase()
    )

    // If no valid category found, show message
    if (!searchCategory) {
        return (
            <div className='mt-16 flex items-center justify-center h-[60vh]'>
                <p className='text-xl text-red-500 font-medium'>
                    Invalid category: "{category}"
                </p>
            </div>
        )
    }

    // Filter products where product.category matches searchCategory.path
    const filterProducts = products.filter(
        (product) =>
            product.category &&
            product.category.toLowerCase() === searchCategory.path.toLowerCase()
    )

    return (
        <div className='mt-16'>
            <div className='flex flex-col items-end w-max'>
                <p className='text-2xl font-medium'>
                    {searchCategory.text.toUpperCase()}
                </p>
                <div className='w-16 h-0.5 bg-primary rounded-full'></div>
            </div>

            {filterProducts.length > 0 ? (
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6 mt-6'>
                    {filterProducts.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            ) : (
                <div className='flex items-center justify-center h-[60vh]'>
                    <p className='text-2xl font-medium text-primary'>
                        No products found in this category
                    </p>
                </div>
            )}
        </div>
    )
}

export default ProductCategory
