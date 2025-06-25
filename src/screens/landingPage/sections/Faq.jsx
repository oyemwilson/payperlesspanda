import { useState, useEffect } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import AOS from 'aos';

export default function Faq() {
  const [openItems, setOpenItems] = useState({});
    useEffect(() => {
        AOS.init({
            duration: 1000, 
            once: true, 
        });
    }, []);

  const faqData = [
    {
      id: 1,
      question: "Why choose Payperless Panda?",
      answer: "Payperless Panda is a free, simple, and customizable invoicing solution crafted specifically for freelancers and small- to medium-sized businesses. It empowers you to create and send professional invoices in seconds and get paid faster. With features like custom branding, multiple currencies,  you can streamline your financial workflow and focus on what truly matters: growing and thriving in your business."
    },
    {
      id: 2,
      question: "What is free invoicing software?",
      answer: "Payperless Panda is a free, user-friendly, and fully customizable invoicing platform designed to meet the unique needs of freelancers and small- to medium-sized businesses. It allows you to generate professional invoices effortlessly, and handle all your invoicing needs from any device. Plus, with no hidden fees, no limitations on invoice volume, and support for custom branding, your business can maintain a professional image and get paid on time—giving you the confidence to grow your business without the stress of traditional invoicing."
    },
    {
      id: 3,
      question: "Is this really FREE invoicing?",
      answer: "Yes! Our FREE Plan lets you manage up to 5 clients with unlimited invoicing and includes 3 professional invoice templates! You’re never forced to upgrade your account, but if you choose to, you’ll unlock unlimited clients plus powerful additional features to help grow your business!"
    },
    {
      id: 4,
      question: "How do I start invoicing online?",
      answer: "Create a FREE Payperless Panda account. Upload your logo, choose one of three invoice templates, and start creating clients, sending invoices, and getting paid—all in one place!"
    },
    {
      id: 5,
      question: "Can I upload my logo on invoices?",
      answer: "Upload or change your logo Navigate to Settings > Company Details, and click Logo to upload or change your company logo. This feature is available on all plans, including the free plan! 😊"
    },
    {
      id: 6,
      question: "Can I customize invoice templates?",
      answer: "Absolutely! You can customize invoice templates on all plans, including the free plan. Head to Settings > Invoice Templates to pick from three different styles. You can also add your logo, adjust colors, and include personalized messages to match your brand perfectly! 🚀"
    },

  ];

  const toggleItem = (id) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-green-950 to-black py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <HelpCircle className="w-12 h-12 text-green-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-200 ">Frequently Asked Questions</h1>
          </div>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            Find answers to common questions about our products and services. Click on any question to expand the answer.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"  data-aos="fade-up"  data-aos-duration="1000"
                                        data-aos-delay="200"
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              {/* Question Button */}
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full px-8 py-6 text-left focus:outline-none focus:ring-4 focus:ring-gray-100 hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 pr-8">
                    {item.question}
                  </h3>
                  <ChevronDown
                    className={`w-6 h-6 text-green-800 transition-transform duration-500 flex-shrink-0 ${
                      openItems[item.id] ? 'rotate-180' : 'rotate-0'
                    }`}
                  />
                </div>
              </button>

              {/* Answer Content */}
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openItems[item.id] 
                    ? 'max-h-96 opacity-100' 
                    : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-8 pb-6 pt-2">
                  <div className="border-t border-gray-100 pt-6">
                    <p className="text-gray-700 leading-relaxed text-base">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-16 text-center">
  <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
    <h3 className="text-2xl font-bold text-gray-900 mb-4">
      Ready to create a receipt?
    </h3>
    <p className="text-gray-600 mb-6">
      Get started in seconds — instantly generate, download, and print a professional receipt with ease.
    </p>
<div className="flex flex-col sm:flex-row gap-4 justify-center">
  <Link
    to="/select-design"
    className="bg-green-900 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-semibold transition-colors duration-200 shadow-lg hover:shadow-xl text-center"
  >
    Create a Receipt
  </Link>
</div>

  </div>
</div>

      </div>
    </div>
  );
}