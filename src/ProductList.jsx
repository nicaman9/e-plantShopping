import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from './CartSlice';
import './ProductList.css';
import CartItem from './CartItem';

function ProductList() {
    const [showCart, setShowCart] = useState(false);
    const [showPlants, setShowPlants] = useState(true);
    const dispatch = useDispatch();

    const plantsArray = [
        {
            category: "Air Purifying Plants",
            plants: [
                {
                    name: "Snake Plant",
                    image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg",
                    description: "Produces oxygen at night, improving air quality.",
                    cost: "$15"
                },
                {
                    name: "Spider Plant",
                    image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg",
                    description: "Filters formaldehyde and xylene from the air.",
                    cost: "$12"
                }
            ]
        },
        {
            category: "Aromatic Fragrant Plants",
            plants: [
                {
                    name: "Lavender",
                    image: "https://images.unsplash.com/photo-1611909023032-2d6b3134ecba?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    description: "Calming scent, used in aromatherapy.",
                    cost: "$20"
                }
            ]
        }
    ];

    const handleAddToCart = (product) => {
        dispatch(addItem({ ...product, quantity: 1 }));
    };

    const handleCartClick = () => {
        setShowCart(true);
        setShowPlants(false);
    };

    const handlePlantsClick = () => {
        setShowPlants(true);
        setShowCart(false);
    };

    const handleContinueShopping = () => {
        setShowCart(false);
        setShowPlants(true);
    };

    return (
        <div>
            {/* Navbar */}
            <div className="navbar" style={{
                backgroundColor: '#4CAF50',
                color: '#fff',
                padding: '15px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '20px'
            }}>
                <div className="luxury" style={{ display: 'flex', alignItems: 'center' }}>
                    <img src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_1280.png" alt="logo" width="50" />
                    <div>
                        <h3 style={{ color: 'white', margin: 0 }}>Paradise Nursery</h3>
                        <i style={{ color: 'white' }}>Where Green Meets Serenity</i>
                    </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ cursor: 'pointer', color: 'white', fontSize: '20px' }} onClick={handlePlantsClick}>
                        Plants
                    </div>
                    <div style={{ cursor: 'pointer' }} onClick={handleCartClick}>
                        🛒 {/* Keeping the original cart icon as it was */}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            {!showCart ? (
                <div className="product-grid">
                    {showPlants &&
                        plantsArray.map((category) => (
                            <div key={category.category} className="category">
                                <h2>{category.category}</h2>
                                <div className="category-grid">
                                    {category.plants.map((plant) => (
                                        <div className="product-card" key={plant.name} style={{
                                            border: '1px solid #ddd',
                                            borderRadius: '10px',
                                            padding: '15px',
                                            textAlign: 'center',
                                            backgroundColor: '#f9f9f9',
                                            width: '250px'
                                        }}>
                                            <img src={plant.image} alt={plant.name} style={{ width: '100%', borderRadius: '10px' }} />
                                            <h3>{plant.name}</h3>
                                            <p>{plant.description}</p>
                                            <p style={{ fontWeight: 'bold' }}>{plant.cost}</p>
                                            <button onClick={() => handleAddToCart(plant)} style={{
                                                backgroundColor: '#4CAF50',
                                                color: 'white',
                                                border: 'none',
                                                padding: '10px',
                                                cursor: 'pointer',
                                                borderRadius: '5px'
                                            }}>
                                                Add to Cart
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))
                    }
                </div>
            ) : (
                <CartItem onContinueShopping={handleContinueShopping} />
            )}
        </div>
    );
}

export default ProductList;
