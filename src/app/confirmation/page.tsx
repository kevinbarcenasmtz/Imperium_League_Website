"use client";
import { Container } from "@/components/Container";
import { FaCheckCircle } from "react-icons/fa";
import { Suspense } from "react";

function PayPalButton() {
  return (
    <div className="w-full max-w-md mx-auto">
      <style jsx global>{`
        .pp-GNNV6JWM7GGVY {
          text-align: center;
          border: none;
          border-radius: 0.25rem;
          min-width: 11.625rem;
          width: 100%;
          max-width: 300px;
          padding: 0 2rem;
          height: 2.625rem;
          font-weight: bold;
          background-color: #FFD140;
          color: #000000;
          font-family: "Helvetica Neue", Arial, sans-serif;
          font-size: 1rem;
          line-height: 1.25rem;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }
        .pp-GNNV6JWM7GGVY:hover {
          background-color: #FFE180;
        }
        .payment-wrapper {
          display: inline-grid;
          justify-items: center;
          align-content: start;
          gap: 0.5rem;
          width: 100%;
        }
        .payment-wrapper img {
          max-width: 100%;
          height: auto;
        }
        .payment-wrapper section {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          color: #6B7280;
          font-size: 0.875rem;
        }
        .payment-wrapper section img {
          height: 0.875rem;
          vertical-align: middle;
        }
      `}</style>
      <form 
        action="https://www.paypal.com/ncp/payment/GNNV6JWM7GGVY" 
        method="post" 
        target="_top"
        className="payment-wrapper"
      >
        <input className="pp-GNNV6JWM7GGVY" type="submit" value="Pay Now" />
        <img src="https://www.paypalobjects.com/images/Debit_Credit_APM.svg" alt="Accepted payment methods" />
        <section>
          Powered by <img src="https://www.paypalobjects.com/paypal-ui/logos/svg/paypal-wordmark-color.svg" alt="PayPal" />
        </section>
      </form>
    </div>
  );
}

function ConfirmationContent() {
  return (
    <Container>
      <div className="w-full max-w-3xl mx-auto px-4 py-6 sm:py-8 lg:py-12">
        {/* Success Message */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex justify-center mb-3 sm:mb-4">
            <FaCheckCircle className="text-green-500 dark:text-green-400 text-3xl sm:text-5xl lg:text-6xl" />
          </div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 dark:text-white mb-2 sm:mb-3">
            Registration Successful!
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-300">
            Thank you for registering!
          </p>
        </div>

        {/* Payment Information */}
        <div className="bg-[#fef9f9] dark:bg-gray-800/50 border border-[#ED2939]/20 rounded-lg p-4 sm:p-6 lg:p-8">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-4 sm:mb-6 dark:text-white">
            Complete Your Registration
          </h2>
          <div className="space-y-4 sm:space-y-6">
            <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
              Please complete your registration by making the payment using the button below:
            </p>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-3 sm:p-4 lg:p-6">
              <PayPalButton />
            </div>
            <div className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
              <p className="font-medium mb-2">After completing the payment:</p>
              <ul className="list-disc ml-4 sm:ml-5 space-y-2 sm:space-y-3">
                <li className="pl-1">Keep your transaction confirmation for your records</li>
                <li className="pl-1">You will receive a confirmation email within 24 hours</li>
                <li className="pl-1 break-words">
                  For any questions, contact us at{' '}
                  <a 
                    href="mailto:empirefootballgroupllc@gmail.com"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    empirefootballgroupllc@gmail.com
                  </a>
                </li>
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
        <div className="w-full max-w-3xl mx-auto py-6 sm:py-8 text-center dark:text-white">
          Loading...
        </div>
      </Container>
    }>
      <ConfirmationContent />
    </Suspense>
  );
}