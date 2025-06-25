import React, { useState, useRef, useEffect } from 'react';
import { Plus, Trash2, Download, Upload, Receipt, Building, User, Phone, MapPin, Calendar, Hash, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const ReceiptTemplate3 = () => {
    const [logo, setLogo] = useState(null);
    const [companyName, setCompanyName] = useState('');
    const [companyAddress, setCompanyAddress] = useState('');
    const [companyPhone, setCompanyPhone] = useState('');
    const [receiptNumber, setReceiptNumber] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

    const [customerName, setCustomerName] = useState('');
    const [customerAddress, setCustomerAddress] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');

    const [items, setItems] = useState([]);
    const [taxRate, setTaxRate] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [thankYouMessage, setThankYouMessage] = useState('Thank you for choosing us!');
    const [notes, setNotes] = useState('');
    const [librariesLoaded, setLibrariesLoaded] = useState(false);
    const [currency, setCurrency] = useState('USD');
    const [receiptColor, setReceiptColor] = useState('#ffffff');

    const receiptRef = useRef(null);

    useEffect(() => {
        // Load required libraries
        const loadLibraries = async () => {
            try {
                // Load html2canvas
                if (!window.html2canvas) {
                    const html2canvasScript = document.createElement('script');
                    html2canvasScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
                    document.head.appendChild(html2canvasScript);

                    await new Promise((resolve) => {
                        html2canvasScript.onload = resolve;
                    });
                }

                // Load jsPDF
                if (!window.jsPDF) {
                    const jsPDFScript = document.createElement('script');
                    jsPDFScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
                    document.head.appendChild(jsPDFScript);

                    await new Promise((resolve) => {
                        jsPDFScript.onload = resolve;
                    });
                }

                setLibrariesLoaded(true);
            } catch (error) {
                console.error('Error loading libraries:', error);
            }
        };

        loadLibraries();
    }, []);

    const addItem = () => {
        setItems([...items, {
            id: Date.now(),
            name: '',
            description: '',
            quantity: 1,
            price: 0
        }]);
    };

    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setLogo(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleItemChange = (id, field, value) => {
        setItems(items.map(item =>
            item.id === id
                ? {
                    ...item,
                    [field]: field === 'quantity' || field === 'price'
                        ? parseFloat(value) || 0
                        : value
                }
                : item
        ));
    };

    const removeItem = (id) => {
        setItems(items.filter(item => item.id !== id));
    };

    const subtotal = items.reduce((sum, item) => sum + item.quantity * item.price, 0);
    const discountAmount = (subtotal * discount) / 100;
    const taxableAmount = subtotal - discountAmount;
    const taxAmount = (taxableAmount * taxRate) / 100;
    const total = taxableAmount + taxAmount;

    const downloadReceipt = async () => {
        if (!librariesLoaded) {
            alert('PDF libraries are still loading. Please try again in a moment.');
            return;
        }
        const receiptElement = receiptRef.current;
        if (!receiptElement) return;

        // Hide edit panel and other non-print elements
        const editPanel = document.querySelector('.bg-slate-50.border-t');
        const headerElement = document.querySelector('.text-center.mb-8');
        const buttons = receiptElement.querySelectorAll('.no-print');
        const hiddenElementsOriginalStyles = [];

        [editPanel, headerElement, ...buttons].forEach((el, index) => {
            if (el) {
                hiddenElementsOriginalStyles[index] = el.style.display;
                el.style.display = 'none';
            }
        });

        // Force desktop layout for consistent PDF output
        const originalStyles = {
            minHeight: receiptElement.style.minHeight,
            height: receiptElement.style.height,
            width: receiptElement.style.width,
            maxWidth: receiptElement.style.maxWidth,
            transform: receiptElement.style.transform,
            position: receiptElement.style.position
        };

        // Apply desktop-width styles temporarily
        receiptElement.style.minHeight = 'auto';
        receiptElement.style.height = 'auto';
        receiptElement.style.width = '1024px'; // Fixed desktop width
        receiptElement.style.maxWidth = '1024px';
        receiptElement.style.transform = 'scale(1)';
        receiptElement.style.position = 'relative';

        // Wait for any potential layout shifts
        await new Promise(resolve => setTimeout(resolve, 100));

        try {
            // Get the actual rendered dimensions
            const rect = receiptElement.getBoundingClientRect();
            const scrollHeight = receiptElement.scrollHeight;
            const actualHeight = Math.max(rect.height, scrollHeight);

            const canvas = await window.html2canvas(receiptElement, {
                scale: 2,
                useCORS: true,
                allowTaint: true,
                backgroundColor: null,
                scrollX: 0,
                scrollY: 0,
                width: 1024, // Fixed width for consistency
                height: actualHeight,
                windowWidth: 1024, // Simulate desktop viewport
                windowHeight: actualHeight
            });

            const imgData = canvas.toDataURL('image/png');
            const { jsPDF } = window.jspdf;

            // Calculate dimensions to fit content exactly
            const imgWidth = canvas.width;
            const imgHeight = canvas.height;

            // Convert pixels to points (1 pixel = 0.75 points)
            const pdfWidth = imgWidth * 0.75;
            const pdfHeight = imgHeight * 0.75;

            // Ensure minimum PDF dimensions (prevent too small PDFs)
            const minWidth = 400;
            const minHeight = 500;
            const finalWidth = Math.max(pdfWidth, minWidth);
            const finalHeight = Math.max(pdfHeight, minHeight);

            // Create PDF with custom dimensions that match your content
            const pdf = new jsPDF({
                orientation: finalWidth > finalHeight ? 'landscape' : 'portrait',
                unit: 'pt',
                format: [finalWidth, finalHeight]
            });

            // Center the image if PDF is larger than content
            const xOffset = (finalWidth - pdfWidth) / 2;
            const yOffset = (finalHeight - pdfHeight) / 2;

            // Add image to PDF
            pdf.addImage(imgData, 'PNG', xOffset, yOffset, pdfWidth, pdfHeight);
            pdf.save(`invoice-${receiptNumber || Date.now()}.pdf`);

        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('Error generating PDF. Please try again.');
        } finally {
            // Restore all original styles
            Object.keys(originalStyles).forEach(key => {
                receiptElement.style[key] = originalStyles[key];
            });

            [editPanel, headerElement, ...buttons].forEach((el, index) => {
                if (el) {
                    el.style.display = hiddenElementsOriginalStyles[index] || '';
                }
            });
        }
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency
        }).format(amount);
    };

    return (
        <div className="min-h-screen bg-green-950 p-4">
            <div>
                <Link to="/select-design" className="inline-flex items-center p-2 text-white hover:text-green-900 border-2 border-white hover:border-green-900 rounded-full mt-10 ml-5">
                    <ArrowLeft className="w-6 h-6" />
                </Link>
            </div>
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8 mt-10">
                    <h1 className="text-3xl font-bold text-white mb-2">Invoice Generator</h1>
                    <p className="text-white">Create professional Invoice with ease</p>
                </div>
                {/* Floating elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-br from-amber-200 to-orange-300 rounded-full opacity-20 animate-pulse"></div>
                    <div className="absolute top-32 right-20 w-16 h-16 bg-gradient-to-br from-red-200 to-pink-300 rounded-full opacity-15 animate-pulse delay-1000"></div>
                    <div className="absolute bottom-20 left-32 w-12 h-12 bg-gradient-to-br from-orange-200 to-red-200 rounded-full opacity-25 animate-pulse delay-500"></div>
                </div>
                {/* Main Content */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    {/* Receipt Preview */}
                    <div ref={receiptRef} className="receipt-content">
                        <div className="bg-slate-900 text-white p-8 max-w-5xl mx-auto relative overflow-hidden">
                            {/* Geometric background pattern */}
                            <div className="absolute inset-0 opacity-5">
                                <div className="absolute top-0 left-0 w-32 h-32 border-2 border-white rotate-45 transform -translate-x-16 -translate-y-16"></div>
                                <div className="absolute top-20 right-20 w-24 h-24 border border-white rounded-full"></div>
                                <div className="absolute bottom-20 left-20 w-16 h-16 bg-white transform rotate-45"></div>
                                <div className="absolute bottom-0 right-0 w-40 h-40 border-2 border-white transform translate-x-20 translate-y-20"></div>
                            </div>

                            {/* Company Header */}
                            <div className="relative z-10 border-l-4 border-emerald-400 pl-8 mb-12">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        {logo ? (
                                            <img src={logo} alt="Company Logo" className="h-[100px]  w-auto mb-6  invert" />
                                        ) : (
                                            <div className="h-16 w-16 bg-emerald-400 rounded-none flex items-center justify-center mb-6 transform rotate-">
                                                <Building className="h-8 w-8 text-slate-900" />
                                            </div>
                                        )}
                                        <h1 className="text-4xl font-light text-white mb-4 tracking-wide">
                                            {companyName || 'YOUR COMPANY'}
                                        </h1>
                                        <div className="space-y-1 text-slate-300">
                                            {companyAddress && <p className="text-sm uppercase tracking-widest">{companyAddress}</p>}
                                            {companyPhone && <p className="text-sm uppercase tracking-widest">{companyPhone}</p>}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="mb-6">
                                            <p className="text-xs uppercase tracking-[3px] text-slate-400 mb-2">Invoice</p>
                                            <p className="text-3xl font-light text-emerald-400 font-mono">{receiptNumber || '001'}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs uppercase tracking-[3px] text-slate-400 mb-2">Date</p>
                                            <p className="text-lg font-light">{new Date(date).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Customer Information */}
                            <div className="relative z-10 mb-12">
                                <div className="flex items-center mb-6">
                                    <div className="w-8 h-0.5 bg-emerald-400 mr-4"></div>
                                    <h2 className="text-xs uppercase tracking-[4px] text-slate-400 flex items-center">
                                        <User className="h-3 w-3 mr-3" />
                                        Client Details
                                    </h2>
                                </div>
                                <div className="border-l border-slate-700 pl-8">
                                    <p className="text-2xl font-light text-white mb-2">{customerName || 'Client Name'}</p>
                                    <div className="space-y-1 text-slate-300">
                                        {customerAddress && <p className="text-sm">{customerAddress}</p>}
                                        {customerPhone && <p className="text-sm">{customerPhone}</p>}
                                    </div>
                                </div>
                            </div>

                            {/* Items Table */}
                            <div className="relative z-10 mb-12 px-4 sm:px-6 lg:px-0">
                                <div className="flex items-center mb-8">
                                    <div className="w-8 h-0.5 bg-emerald-400 mr-4"></div>
                                    <h2 className="text-xs sm:text-sm uppercase tracking-[4px] text-slate-400">Services & Products</h2>
                                </div>

                                <div className="space-y-0">
                                    {/* Table Header */}
                                    <div className="grid grid-cols-12 gap-2 sm:gap-4 py-4 border-b border-slate-700">
                                        <div className="col-span-6 sm:col-span-6 text-xs uppercase tracking-[2px] text-slate-400">Description</div>
                                        <div className="col-span-3 sm:col-span-2 text-xs uppercase tracking-[2px] text-slate-400 text-center">Quantity</div>
                                        <div className="col-span-3 sm:col-span-2 text-xs uppercase tracking-[2px] text-slate-400 text-right hidden sm:block">Rate</div>
                                        <div className="col-span-3 sm:col-span-2 text-xs uppercase tracking-[2px] text-slate-400 text-right">Amount</div>
                                    </div>

                                    {/* Table Body */}
                                    {items.length === 0 ? (
                                        <div className="py-16 text-center">
                                            <div className="w-12 h-12 border border-slate-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                                <Building className="h-6 w-6 text-slate-500" />
                                            </div>
                                            <p className="text-slate-500 text-sm uppercase tracking-wider">No items added</p>
                                        </div>
                                    ) : (
                                        <div className="space-y-0">
                                            {items.map((item, index) => (
                                                <div key={item.id} className="grid grid-cols-12 gap-2 sm:gap-4 py-4 sm:py-6 border-b border-slate-800 hover:bg-slate-800/30 transition-colors">
                                                    <div className="col-span-6 sm:col-span-6">
                                                        <p className="text-white font-light text-base sm:text-lg mb-1">{item.name || 'Service Name'}</p>
                                                        {item.description && (
                                                            <p className="text-slate-400 text-xs sm:text-sm">{item.description}</p>
                                                        )}
                                                    </div>
                                                    <div className="col-span-3 sm:col-span-2 text-center">
                                                        <div className="inline-block w-8 h-8 border border-slate-600 rounded-full flex items-center justify-center">
                                                            <span className="text-xs sm:text-sm font-mono text-emerald-400">{item.quantity}</span>
                                                        </div>
                                                    </div>
                                                    <div className="col-span-3 sm:col-span-2 text-right hidden sm:block">
                                                        <span className="text-slate-300 font-mono text-sm sm:text-base">{formatCurrency(item.price)}</span>
                                                    </div>
                                                    <div className="col-span-3 sm:col-span-2 text-right">
                                                        <span className="text-white font-mono text-base sm:text-lg">{formatCurrency(item.quantity * item.price)}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Totals */}
                            <div className="relative z-10 mb-12">
                                <div className="flex justify-end">
                                    <div className="w-80 space-y-4">
                                        <div className="flex justify-between py-3 border-b border-slate-700">
                                            <span className="text-slate-400 uppercase tracking-wider text-sm">Subtotal</span>
                                            <span className="text-white font-mono">{formatCurrency(subtotal)}</span>
                                        </div>
                                        {discount > 0 && (
                                            <div className="flex justify-between py-3 border-b border-slate-700">
                                                <span className="text-emerald-400 uppercase tracking-wider text-sm">Discount ({discount}%)</span>
                                                <span className="text-emerald-400 font-mono">-{formatCurrency(discountAmount)}</span>
                                            </div>
                                        )}
                                        {taxRate > 0 && (
                                            <div className="flex justify-between py-3 border-b border-slate-700">
                                                <span className="text-slate-400 uppercase tracking-wider text-sm">Tax ({taxRate}%)</span>
                                                <span className="text-white font-mono">{formatCurrency(taxAmount)}</span>
                                            </div>
                                        )}
                                        <div className="flex justify-between py-6 border-t-2 border-emerald-400">
                                            <span className="text-xl font-light uppercase tracking-[3px] text-white">Total</span>
                                            <span className="text-3xl font-light text-emerald-400 font-mono">{formatCurrency(total)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="relative z-10 text-center border-t border-slate-700 pt-8">
                                <p className="text-xl font-light text-white mb-4 tracking-wide">
                                    {thankYouMessage}
                                </p>
                                {notes && (
                                    <div className="max-w-2xl mx-auto">
                                        <div className="w-8 h-0.5 bg-slate-600 mx-auto mb-4"></div>
                                        <p className="text-sm text-slate-400 leading-relaxed uppercase tracking-wider">{notes}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Edit Panel */}
                    <div className="bg-slate-50 border-t p-6 ">
                        <div className="max-w-4xl mx-auto ">
                            <h2 className="text-xl font-semibold mb-6 text-slate-800">Edit Invoice</h2>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Company Information */}
                                <div className="space-y-4">
                                    <h3 className="font-semibold text-slate-700 flex items-center">
                                        <Building className="h-4 w-4 mr-2" />
                                        Company Information
                                    </h3>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">
                                            Company Logo
                                        </label>
                                        <div className="flex items-center space-x-3">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleLogoChange}
                                                className="hidden"
                                                id="logo-upload"
                                            />
                                            <label
                                                htmlFor="logo-upload"
                                                className="flex items-center px-4 py-2 bg-white border border-slate-300 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors"
                                            >
                                                <Upload className="h-4 w-4 mr-2" />
                                                Upload Logo
                                            </label>
                                            {logo && <span className="text-sm text-green-600">✓ Logo uploaded</span>}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">
                                            Company Name
                                        </label>
                                        <input
                                            type="text"
                                            value={companyName}
                                            onChange={(e) => setCompanyName(e.target.value)}
                                            placeholder="Enter company name"
                                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">
                                            Company Address
                                        </label>
                                        <textarea
                                            value={companyAddress}
                                            onChange={(e) => setCompanyAddress(e.target.value)}
                                            placeholder="Enter company address"
                                            rows="2"
                                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">
                                            Company Phone
                                        </label>
                                        <input
                                            type="tel"
                                            value={companyPhone}
                                            onChange={(e) => setCompanyPhone(e.target.value)}
                                            placeholder="Enter phone number"
                                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                        />
                                    </div>
                                </div>

                                {/* Receipt Details */}
                                <div className="space-y-4">
                                    <h3 className="font-semibold text-slate-700 flex items-center">
                                        <Receipt className="h-4 w-4 mr-2" />
                                        Invoice Details
                                    </h3>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">
                                            Invoice Number
                                        </label>
                                        <input
                                            type="text"
                                            value={receiptNumber}
                                            onChange={(e) => setReceiptNumber(e.target.value)}
                                            placeholder="INV-001"
                                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">
                                            Date
                                        </label>
                                        <input
                                            type="date"
                                            value={date}
                                            onChange={(e) => setDate(e.target.value)}
                                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">
                                            Customer Name
                                        </label>
                                        <input
                                            type="text"
                                            value={customerName}
                                            onChange={(e) => setCustomerName(e.target.value)}
                                            placeholder="Enter customer name"
                                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">
                                            Customer Address
                                        </label>
                                        <textarea
                                            value={customerAddress}
                                            onChange={(e) => setCustomerAddress(e.target.value)}
                                            placeholder="Enter customer address"
                                            rows="2"
                                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">
                                            Customer Phone
                                        </label>
                                        <input
                                            type="tel"
                                            value={customerPhone}
                                            onChange={(e) => setCustomerPhone(e.target.value)}
                                            placeholder="Enter phone number"
                                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">
                                            Currency
                                        </label>
                                        <select
                                            value={currency}
                                            onChange={(e) => setCurrency(e.target.value)}
                                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                        >
                                            <option value="USD">USD - US Dollar</option>
                                            <option value="EUR">EUR - Euro</option>
                                            <option value="GBP">GBP - British Pound</option>
                                            <option value="JPY">JPY - Japanese Yen</option>
                                            <option value="CAD">CAD - Canadian Dollar</option>
                                            <option value="NGN">NGN - Nigerian Naira</option>
                                        </select>
                                    </div>
                                </div>
                            </div>


                            {/* Items Section */}
                            <div className="mt-8">
                                <h3 className="font-semibold text-slate-700 mb-4">Items</h3>

                                <div className="space-y-3">
                                    {items.map((item, index) => (
                                        <div key={item.id} className="bg-white p-4 rounded-lg border border-slate-200">
                                            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                                                <div>
                                                    <label className="block text-xs font-medium text-slate-700 mb-1">
                                                        Item Name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={item.name}
                                                        onChange={(e) => handleItemChange(item.id, 'name', e.target.value)}
                                                        placeholder="Item name"
                                                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-medium text-slate-700 mb-1">
                                                        Description
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={item.description}
                                                        onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
                                                        placeholder="Optional description"
                                                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-medium text-slate-700 mb-1">
                                                        Quantity
                                                    </label>
                                                    <input
                                                        type="number"
                                                        min="0"
                                                        step="1"
                                                        value={item.quantity}
                                                        onChange={(e) => handleItemChange(item.id, 'quantity', e.target.value)}
                                                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-medium text-slate-700 mb-1">
                                                        Price
                                                    </label>
                                                    <input
                                                        type="number"
                                                        min="0"
                                                        step="0.01"
                                                        value={item.price}
                                                        onChange={(e) => handleItemChange(item.id, 'price', e.target.value)}
                                                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                                    />
                                                </div>
                                                <div className="flex items-end">
                                                    <button
                                                        onClick={() => removeItem(item.id)}
                                                        className="w-full px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <button
                                    onClick={addItem}
                                    className="mt-3 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center"
                                >
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add Item
                                </button>
                            </div>

                            {/* Calculations */}
                            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Discount (%)
                                    </label>
                                    <input
                                        type="number"
                                        min="0"
                                        max="100"
                                        step="0.01"
                                        value={discount}
                                        onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
                                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Tax Rate (%)
                                    </label>
                                    <input
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        value={taxRate}
                                        onChange={(e) => setTaxRate(parseFloat(e.target.value) || 0)}
                                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    />
                                </div>
                                <div className="flex items-end">
                                    <div className="w-full bg-slate-100 p-3 rounded-lg">
                                        <p className="text-sm text-slate-600">Total Amount</p>
                                        <p className="text-xl font-bold text-slate-800">{formatCurrency(total)}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Footer Messages */}
                            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Thank You Message
                                    </label>
                                    <input
                                        type="text"
                                        value={thankYouMessage}
                                        onChange={(e) => setThankYouMessage(e.target.value)}
                                        placeholder="Thank you for your business!"
                                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Additional Notes
                                    </label>
                                    <input
                                        type="text"
                                        value={notes}
                                        onChange={(e) => setNotes(e.target.value)}
                                        placeholder="Optional notes"
                                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    />
                                </div>
                            </div>

                            {/* Download Button */}
                            <div className="mt-8 text-center">
                                <button
                                    onClick={downloadReceipt}
                                    disabled={!librariesLoaded}
                                    className={`px-6 py-3 rounded-lg transition-colors flex items-center mx-auto shadow-lg ${librariesLoaded
                                        ? 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
                                        : 'bg-gray-400 text-gray-200 cursor-not-allowed'
                                        }`}
                                >
                                    <Download className="h-5 w-5 mr-2" />
                                    {librariesLoaded ? 'Download PDF' : 'Loading PDF Libraries...'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReceiptTemplate3;