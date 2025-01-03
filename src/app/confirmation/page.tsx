"use client";
import { useSearchParams } from "next/navigation";
import { Container } from "@/components/Container";
import { FaCheckCircle } from "react-icons/fa";
import { Suspense } from "react";

function ConfirmationContent() {
  const paypalInfo = {
    email: "empirefootballgroupllc@gmail.com",
    qrCodeUrl: "/img/qrcode.png",
    amount: "300.00",
    description: "Team Registration Fee",
    link: "https://www.paypal.com/biz/profile/empirefootballgroup",
  };

  return (
    <Container>
      <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12 sm:px-6 lg:px-8">
        {/* Success Message */}
        <div className="text-center mb-8 sm:mb-10">
          <div className="flex justify-center mb-4 sm:mb-6">
            <FaCheckCircle className="text-green-500 dark:text-green-400 text-4xl sm:text-6xl" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-3 sm:mb-4">
            Registration Successful!
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300">
            Thank you for registering!
          </p>
        </div>

        {/* Payment Information */}
        <div className="bg-[#fef9f9] dark:bg-gray-800/50 border border-[#ED2939]/20 rounded-lg p-4 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 dark:text-white">
            Complete Your Registration
          </h2>
          <div className="space-y-4 sm:space-y-6">
            <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
              Please complete your payment using the PayPal information below:
            </p>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-3 sm:p-6 space-y-4">
              <div>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-1 sm:mb-2">PayPal Email</p>
                <p className="text-base sm:text-lg font-medium dark:text-white break-all">{paypalInfo.email}</p>
              </div>

              <div>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-1 sm:mb-2">Amount</p>
                <p className="text-lg sm:text-xl font-semibold dark:text-white">${paypalInfo.amount}</p>
              </div>

              <div>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-1 sm:mb-2">Description</p>
                <p className="bg-gray-50 dark:bg-gray-700 px-3 py-2 rounded dark:text-white">
                  {paypalInfo.description}
                </p>
              </div>

              <div>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-1 sm:mb-2">QR Code</p>
                <div className="flex justify-center">
                  <img src={paypalInfo.qrCodeUrl} alt="PayPal QR Code" className="rounded-lg w-48 sm:w-64" />
                </div>
              </div>

              <div>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-1 sm:mb-2">Public Profile</p>
                <p className="text-base sm:text-lg font-medium dark:text-white break-all">{paypalInfo.link}</p>
              </div>
            </div>

            <div className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
              <p>After completing the payment:</p>
              <ul className="list-disc ml-5 mt-2 space-y-2">
                <li>Keep your transaction confirmation for your records</li>
                <li>You will receive a confirmation email within 24 hours</li>
                <li>For any questions, contact us at empirefootballgroupllc@gmail.com</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={
      <Container>
        <div className="max-w-3xl mx-auto py-8 sm:py-12 text-center dark:text-white">
          Loading...
        </div>
      </Container>
    }>
      <ConfirmationContent />
    </Suspense>
  );
}