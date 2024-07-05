import React from 'react';
import StripeIntegrationAccelerator from '../components/StripeIntegrationAccelerator';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow flex justify-center items-center bg-gray-100">
        <StripeIntegrationAccelerator />
      </main>
      <footer className="py-4 text-center text-sm text-gray-500">
        © 2023 Stripe Integration Accelerator. All rights reserved.
      </footer>
    </div>
  );
}