import { Disclosure, DisclosureButton, DisclosurePanel, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";

const navigation = [
    { name: 'Home', to: 'home' },
    { name: 'Why us', to: 'why-us' },
    { name: 'Features', to: 'features' },
    { name: 'Faq', to: 'faq' },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

const Topnav = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    // Handle scroll effect for navbar background
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <Disclosure>
            {({ open }) => (
                <>
                    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
                        open || isScrolled ? 'bg-black/95 shadow-md' : 'bg-transparent'
                    }`}>
                        <div className="mx-auto w-full px-4 sm:px-6 lg:px-8">
                            <div className="flex h-16 items-center justify-between">
                                {/* Logo and navigation */}
                                <div className="flex flex-1 items-center md:items-stretch md:justify-start min-w-0">
                                    <div className="flex shrink-0 items-center min-w-0">
                                        <img
                                            alt="Your Company"
                                            src="/assets/images/Pandalogo2.png"
                                            className="h-8 w-auto flex-shrink-0"
                                        />
                                        <h1 className="text-white ml-2 text-lg md:text-xl font-bold truncate">Payperless Panda</h1>
                                    </div>
                                    
                                    {/* Desktop Navigation */}
                                    <div className="hidden md:flex md:justify-center sm:flex-1 lg:mr-20">
                                        <div className="flex lg:space-x-7">
                                            {navigation.map((item) => (
                                                <ScrollLink
                                                    key={item.name}
                                                    to={item.to}
                                                    smooth={true}
                                                    duration={500}
                                                    offset={-64}
                                                    className={classNames(
                                                        item.current ? "text-white" : "text-gray-300 hover:text-green-400",
                                                        "cursor-pointer rounded-md px-3 py-2 text-md font-medium"
                                                    )}
                                                >
                                                    {item.name}
                                                </ScrollLink>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Desktop Create Invoice Button */}
                                <div className="hidden md:flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                    <button
                                        type="button"
                                        className="relative rounded bg-green-400 px-3 py-2 text-white hover:bg-green-500 transition-colors"
                                    >
                                        <Link to="/select-design">Create Invoice</Link>
                                    </button>
                                </div>

                                {/* Mobile menu button */}
                                <div className="md:hidden flex-shrink-0 ml-2">
                                    <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-colors">
                                        <span className="sr-only">Open main menu</span>
                                        <Bars3Icon aria-hidden="true" className="block w-6 h-6 group-data-[open]:hidden" />
                                        <XMarkIcon aria-hidden="true" className="hidden w-6 h-6 group-data-[open]:block" />
                                    </DisclosureButton>
                                </div>
                            </div>
                        </div>
                    </nav>

                    {/* Mobile Side Navigation Overlay */}
                    <Transition
                        show={open}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        beforeEnter={() => {
                            document.body.style.overflow = 'hidden';
                        }}
                        afterLeave={() => {
                            document.body.style.overflow = 'unset';
                        }}
                    >
                        <div className="fixed inset-0 z-40 md:hidden">
                            {/* Background overlay */}
                            <div className="fixed inset-0 bg-black bg-opacity-50" />
                            
                            {/* Side navigation panel */}
                            <Transition
                                show={open}
                                enter="transition ease-in-out duration-300 transform"
                                enterFrom="-translate-x-full"
                                enterTo="translate-x-0"
                                leave="transition ease-in-out duration-300 transform"
                                leaveFrom="translate-x-0"
                                leaveTo="-translate-x-full"
                            >
                                <DisclosurePanel className="fixed left-0 top-0 h-full w-80 max-w-[85vw] bg-black shadow-xl">
                                    <div className="flex h-full flex-col">
                                        {/* Header */}
                                        <div className="flex items-center justify-between p-4 border-b border-gray-800">
                                            <div className="flex items-center">
                                                <img
                                                    alt="Your Company"
                                                    src="/assets/images/Pandalogo2.png"
                                                    className="h-8 w-auto"
                                                />
                                                <h1 className="text-white ml-2 text-lg font-bold">Payperless Panda</h1>
                                            </div>
                                            <DisclosureButton className="rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                                <XMarkIcon className="h-6 w-6" />
                                            </DisclosureButton>
                                        </div>

                                        {/* Navigation Links */}
                                        <div className="flex-1 px-4 py-6">
                                            <nav className="space-y-2">
                                                {navigation.map((item) => (
                                                    <ScrollLink
                                                        key={item.name}
                                                        to={item.to}
                                                        smooth={true}
                                                        duration={500}
                                                        offset={-64}
                                                        className={classNames(
                                                            item.current 
                                                                ? "bg-gray-900 text-white" 
                                                                : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                                            "group flex items-center px-3 py-3 text-base font-medium rounded-md cursor-pointer transition-colors"
                                                        )}
                                                        onClick={() => {
                                                            // Close the mobile menu when a link is clicked
                                                            setTimeout(() => {
                                                                document.querySelector('[data-headlessui-state="open"] button')?.click();
                                                            }, 100);
                                                        }}
                                                    >
                                                        {item.name}
                                                    </ScrollLink>
                                                ))}
                                            </nav>
                                        </div>

                                        {/* Create Invoice Button */}
                                        <div className="border-t border-gray-800 p-4">
                                            <button
                                                type="button"
                                                className="w-full rounded bg-green-400 px-4 py-3 text-white hover:bg-green-500 transition-colors font-medium"
                                            >
                                                <Link to="/select-design" className="block w-full h-full">
                                                    Create Invoice
                                                </Link>
                                            </button>
                                        </div>
                                    </div>
                                </DisclosurePanel>
                            </Transition>
                        </div>
                    </Transition>
                </>
            )}
        </Disclosure>
    );
};

export default Topnav;