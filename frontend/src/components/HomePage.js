import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    const galleryImages = [
        { src: '../assets/impact_1.jpg', alt: 'Impact Image 1' },
        { src: '../assets/impact_2.jpg', alt: 'Impact Image 2' },
        { src: '../assets/impact_3.jpg', alt: 'Impact Image 3' },
        { src: '../assets/impact_4.jpg', alt: 'Impact Image 4' }
    ];

    return (
        <div className="space-y-12 py-8">
            {/* Hero Section */}
            <div className="bg-blue-400 text-white py-16">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">Make a Difference Today</h1>
                    <p className="text-xl mb-8">Your generosity can change lives. Join us in making the world a better place.</p>
                    <Link to="/donate" className="hover:text-blue-500">
                        <button className="bg-white text-blue-900 px-8 py-3 rounded-full font-bold hover:bg-blue-100">
                            Start Donating
                        </button>
                    </Link>
                </div>
            </div>

            {/* About Us Section */}
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold mb-6 text-center pb-10">About Us</h2> {/* Added padding */}
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                        <p className="text-gray-600 leading-relaxed">
                            We are dedicated to making a positive impact in our community through the power of giving.
                            Our platform connects generous donors with those in need, ensuring that your contributions
                            make the maximum impact where they're needed most.
                        </p>
                    </div>
                    <div className="bg-gray-200 h-64 rounded-lg">
                        <div className="w-full h-full flex items-center justify-center text-gray-500">
                            <img src="../assets/water.jpg" alt="Water" className="w-full h-auto object-cover" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Photo Gallery */}
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold mb-6 text-center">Our Impact</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {galleryImages.map((image, i) => (
                        <div key={i} className="bg-gray-200 h-48 rounded-lg overflow-hidden">
                            <img src={image.src} alt={image.alt} className="w-full h-full object-cover" />
                        </div>
                    ))}
                </div>
            </div>
        </div >
    );
};

export default HomePage;