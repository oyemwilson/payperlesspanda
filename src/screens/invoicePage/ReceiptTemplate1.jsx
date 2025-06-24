import React, { useState, useRef, useEffect } from 'react';
import { Plus, Trash2, Download, Upload, Receipt, Building, User, Phone, MapPin, Calendar, Hash } from 'lucide-react';

const ReceiptTemplate = () => {
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
    
    const originalStyles = [];
    [editPanel, headerElement, ...buttons].forEach((el, index) => {
      if (el) {
        originalStyles[index] = el.style.display;
        el.style.display = 'none';
      }
    });

    try {
      const canvas = await window.html2canvas(receiptElement, { 
        scale: 2,
        useCORS: true,
        allowTaint: true
      });
      const imgData = canvas.toDataURL('image/png');
      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF('p', 'pt', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`receipt-${receiptNumber || Date.now()}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    } finally {
      // Restore original display styles
      [editPanel, headerElement, ...buttons].forEach((el, index) => {
        if (el) {
          el.style.display = originalStyles[index] || '';
        }
      });
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Receipt Generator</h1>
          <p className="text-slate-600">Create professional receipts with ease</p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Receipt Preview */}
          <div ref={receiptRef} className="receipt-content">
            <div className="bg-white p-8 max-w-2xl mx-auto">
              {/* Company Header */}
              <div className="border-b-2 border-slate-200 pb-6 mb-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    {logo ? (
                      <img src={logo} alt="Company Logo" className="h-16 w-auto mb-4" />
                    ) : (
                      <div className="h-16 w-16 bg-slate-100 rounded-lg flex items-center justify-center mb-4">
                        <Building className="h-8 w-8 text-slate-400" />
                      </div>
                    )}
                    <h1 className="text-2xl font-bold text-slate-800 mb-2">
                      {companyName || 'Your Company Name'}
                    </h1>
                    {companyAddress && <p className="text-slate-600 mb-1">{companyAddress}</p>}
                    {companyPhone && <p className="text-slate-600">{companyPhone}</p>}
                  </div>
                  <div className="text-right">
                    <div className="bg-slate-50 px-4 py-2 rounded-lg">
                      <p className="text-sm text-slate-500 mb-1">Receipt #</p>
                      <p className="font-mono font-semibold">{receiptNumber || 'REC-001'}</p>
                    </div>
                    <div className="mt-3 bg-slate-50 px-4 py-2 rounded-lg">
                      <p className="text-sm text-slate-500 mb-1">Date</p>
                      <p className="font-semibold">{new Date(date).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Customer Information */}
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-slate-800 mb-3 flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Bill To
                </h2>
                <div className="bg-slate-50 p-4 rounded-lg">
                  <p className="font-semibold text-slate-800">{customerName || 'Customer Name'}</p>
                  {customerAddress && <p className="text-slate-600">{customerAddress}</p>}
                  {customerPhone && <p className="text-slate-600">{customerPhone}</p>}
                </div>
              </div>

              {/* Items Table */}
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-slate-800 mb-3">Items</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-slate-200">
                        <th className="text-left py-3 text-slate-700 font-semibold">Description</th>
                        <th className="text-center py-3 text-slate-700 font-semibold w-20">Qty</th>
                        <th className="text-right py-3 text-slate-700 font-semibold w-24">Price</th>
                        <th className="text-right py-3 text-slate-700 font-semibold w-24">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.length === 0 ? (
                        <tr>
                          <td colSpan="4" className="text-center py-8 text-slate-500">
                            No items added yet
                          </td>
                        </tr>
                      ) : (
                        items.map(item => (
                          <tr key={item.id} className="border-b border-slate-100">
                            <td className="py-3">
                              <div>
                                <p className="font-medium text-slate-800">{item.name || 'Item Name'}</p>
                                {item.description && (
                                  <p className="text-sm text-slate-500">{item.description}</p>
                                )}
                              </div>
                            </td>
                            <td className="text-center py-3 text-slate-700">{item.quantity}</td>
                            <td className="text-right py-3 text-slate-700">{formatCurrency(item.price)}</td>
                            <td className="text-right py-3 font-semibold text-slate-800">
                              {formatCurrency(item.quantity * item.price)}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Totals */}
              <div className="border-t-2 border-slate-200 pt-4">
                <div className="flex justify-end">
                  <div className="w-64">
                    <div className="flex justify-between py-2">
                      <span className="text-slate-600">Subtotal:</span>
                      <span className="font-semibold">{formatCurrency(subtotal)}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between py-2 text-green-600">
                        <span>Discount ({discount}%):</span>
                        <span>-{formatCurrency(discountAmount)}</span>
                      </div>
                    )}
                    {taxRate > 0 && (
                      <div className="flex justify-between py-2">
                        <span className="text-slate-600">Tax ({taxRate}%):</span>
                        <span className="font-semibold">{formatCurrency(taxAmount)}</span>
                      </div>
                    )}
                    <div className="flex justify-between py-3 border-t border-slate-300 text-lg font-bold">
                      <span>Total:</span>
                      <span>{formatCurrency(total)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-8 relative bottom-0 text-center">
                <p className="text-slate-700 font-medium mb-2">
                  {thankYouMessage}
                </p>
                {notes && (
                  <p className="text-sm text-slate-500">{notes}</p>
                )}
              </div>
            </div>
          </div>

          {/* Edit Panel */}
          <div className="bg-slate-50 border-t p-6 ">
            <div className="max-w-4xl mx-auto ">
              <h2 className="text-xl font-semibold mb-6 text-slate-800">Edit Receipt</h2>
              
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
                    Receipt Details
                  </h3>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Receipt Number
                    </label>
                    <input
                      type="text"
                      value={receiptNumber}
                      onChange={(e) => setReceiptNumber(e.target.value)}
                      placeholder="REC-001"
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
                  className={`px-6 py-3 rounded-lg transition-colors flex items-center mx-auto shadow-lg ${
                    librariesLoaded 
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

export default ReceiptTemplate;