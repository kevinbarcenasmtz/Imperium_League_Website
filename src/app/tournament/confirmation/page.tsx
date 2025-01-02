"use client";
import { useSearchParams } from "next/navigation";
import { Container } from "@/components/Container";
import { FaCheckCircle, FaCopy } from "react-icons/fa";
import { useState } from "react";

export default function ConfirmationPage() {
  const searchParams = useSearchParams();
  const teamName = searchParams.get("team");
  const captain = searchParams.get("captain");
  const [copied, setCopied] = useState(false);

  const zelleInfo = {
    email: "empirefootballgroupllc@gmail.com",  // Replace with your actual Zelle email
    amount: "$300.00",  // Replace with your actual amount
    description: `Team Registration Fee - ${teamName}`
  };

  const handleCopyZelle = () => {
    navigator.clipboard.writeText(zelleInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Container>
      <div className="max-w-3xl mx-auto py-12">
        {/* Success Message */}
        <div className="text-center mb-10">
          <div className="flex justify-center mb-6">
            <FaCheckCircle className="text-green-500 text-6xl" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Registration Successful!
          </h1>
          <p className="text-xl text-gray-600">
            Thank you for registering {teamName}!
          </p>
        </div>

        {/* Registration Details */}
        <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-6">Registration Details</h2>
          <div className="space-y-4">
            <div>
              <p className="text-gray-600">Team Name</p>
              <p className="text-lg font-medium">{teamName}</p>
            </div>
            <div>
              <p className="text-gray-600">Team Captain</p>
              <p className="text-lg font-medium">{captain}</p>
            </div>
          </div>
        </div>

        {/* Payment Instructions */}
        <div className="bg-[#fef9f9] border border-[#ED2939]/20 rounded-lg p-8">
          <h2 className="text-2xl font-semibold mb-6">Complete Your Registration</h2>
          
          <div className="space-y-6">
            <p className="text-gray-700">
              To confirm your team&apos;s registration, please send the registration fee via Zelle:
            </p>

            <div className="bg-white rounded-lg p-6 space-y-4">
              <div>
                <p className="text-gray-600 mb-2">Zelle Email</p>
                <div className="flex items-center gap-3">
                  <input 
                    type="text" 
                    value={zelleInfo.email} 
                    readOnly 
                    className="bg-gray-50 px-4 py-2 rounded flex-grow"
                  />
                  <button
                    onClick={handleCopyZelle}
                    className="flex items-center gap-2 px-4 py-2 bg-[#ED2939] text-white rounded-lg hover:bg-[#C62631] transition-colors"
                  >
                    <FaCopy />
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>
              </div>
              
              <div>
                <p className="text-gray-600 mb-2">Amount</p>
                <p className="text-xl font-semibold">{zelleInfo.amount}</p>
              </div>
              
              <div>
                <p className="text-gray-600 mb-2">Description (include in payment)</p>
                <p className="bg-gray-50 px-4 py-2 rounded">{zelleInfo.description}</p>
              </div>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg">
              <p className="text-yellow-800">
                <strong>Important:</strong> Please ensure you include your team name in the Zelle payment description 
                for proper registration tracking.
              </p>
            </div>

            <div className="text-gray-600">
              <p>After sending the payment:</p>
              <ul className="list-disc ml-6 mt-2 space-y-2">
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