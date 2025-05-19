import React from 'react';
import { Mail } from 'lucide-react';

const Footer = () => (
    <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                    <h3 className="text-xl font-bold mb-4">Contact Us</h3>
                    <div className="flex items-center gap-2">
                        <Mail size={20} />
                        <a href="mailto:aidbridge@charity.org" className="hover:text-blue-300">aidbridge@charity.org</a>
                    </div>
                </div>
                <div>
                    <h3 className="text-xl font-bold mb-4">Quick Links</h3>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:text-blue-300">About Us</a></li>
                        <li><a href="#" className="hover:text-blue-300">FAQ</a></li>
                        <li><a href="#" className="hover:text-blue-300">Privacy Policy</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-xl font-bold mb-4">Follow Us</h3>
                    <div className="flex space-x-4">
                        <a href="#" className="hover:text-blue-300">Twitter</a>
                        <a href="#" className="hover:text-blue-300">Facebook</a>
                        <a href="#" className="hover:text-blue-300">Instagram</a>
                    </div>
                </div>
            </div>
        </div>
    </footer>
);

export default Footer;