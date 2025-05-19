import { DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';

const DonatePage = () => {
    const donationTypes = [
        { icon: <DollarSign size={32} />, title: 'Money', description: 'Make a monetary contribution' },
        { icon: '💍', title: 'Gold', description: 'Donate precious metals and jewellery' },
        { icon: '👕', title: 'Cloth', description: 'Donate clothes in good condition' },
        { icon: '🍎', title: 'Food', description: 'Contribute non-perishable food items' },
        { icon: '📦', title: 'Others', description: 'Other valuable items' },
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold mb-8 text-center">Make a Donation</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {donationTypes.map((type) => (
                    <div key={type.title} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                        <div className="flex flex-col items-center text-center">
                            <div className="text-4xl mb-4">{type.icon}</div>
                            <h3 className="text-xl font-bold mb-2">{type.title}</h3>
                            <p className="text-gray-600 mb-4">{type.description}</p>
                            <Link to={`/donate/${type.title.toLowerCase()}`}>
                                <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
                                    Donate {type.title}
                                </button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DonatePage;
