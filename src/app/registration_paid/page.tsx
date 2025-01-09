'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaCheckCircle } from 'react-icons/fa';

export default function RegistrationPaidPage() {
  const router = useRouter();
  const [paymentDetails, setPaymentDetails] = useState({
    amount: 0,
    timestamp: '',
  });

  useEffect(() => {
    const mockPaymentDetails = {
      amount: 250.00,
      timestamp: new Date().toLocaleString(),
    };
    setPaymentDetails(mockPaymentDetails);
  }, []);

  const handleReturnHome = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-700 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-lg max-w-md w-full">
        <div className="text-center">
          <div className="mb-4 sm:mb-6">
            <FaCheckCircle className="mx-auto h-12 w-12 sm:h-16 sm:w-16 text-green-500 dark:text-green-400" />
          </div>
          
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
            Registration Payment Successful!
          </h2>
          
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-6">
            Thank you for registering for the tournament. Your payment has been processed successfully.
          </p>
         
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
            <div className="text-left space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                  <span className="font-semibold dark:text-gray-200">Amount Paid:</span>
                </p>
                <p className="text-lg font-medium text-gray-900 dark:text-white">
                  ${paymentDetails.amount.toFixed(2)}
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                  <span className="font-semibold dark:text-gray-200">Date:</span>
                </p>
                <p className="text-base text-gray-900 dark:text-white">
                  {paymentDetails.timestamp}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <button
              onClick={handleReturnHome}
              className="w-full sm:w-auto inline-flex justify-center items-center px-6 py-2.5 border border-transparent 
                text-base font-medium rounded-md text-white bg-[#ED2939] hover:bg-[#C62631] 
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ED2939] 
                transition-colors duration-200 ease-in-out dark:focus:ring-offset-gray-800"
            >
              Return to Homepage
            </button>
          </div>
         
          <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
            A confirmation email has been sent to your registered email address
          </p>
        </div>
      </div>
    </div>
  );
}