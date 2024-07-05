import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"

const StripeIntegrationAccelerator = () => {
  const [annualRevenue, setAnnualRevenue] = useState(1000000);
  const [currentProcessingFee, setCurrentProcessingFee] = useState(2.9);
  const [estimatedGrowth, setEstimatedGrowth] = useState(10);
  const [simulationResult, setSimulationResult] = useState(null);

  const calculateROI = () => {
    const currentCost = annualRevenue * (currentProcessingFee / 100);
    const stripeCost = annualRevenue * 0.029; // Stripe's 2.9% fee
    const initialSavings = currentCost - stripeCost;
    
    const growthRevenue = annualRevenue * (1 + estimatedGrowth / 100);
    const futureCurrentCost = growthRevenue * (currentProcessingFee / 100);
    const futureStripeCost = growthRevenue * 0.029;
    const futureSavings = futureCurrentCost - futureStripeCost;
    
    const totalBenefit = futureSavings - initialSavings;
    
    return totalBenefit.toFixed(2);
  };

  const runStripeSimulation = async () => {
    const stripe = await loadStripe('pk_test_51MvTClB0dKThY86MTqSXIqIvJ5zWDwmTRhr9cPKlRb4iXaU83QcrqFlko7NLET3ZESE804QtSx7jO9gL8nkrRZdM00190LVREe');
    
    try {
      const { error } = await stripe.createPaymentMethod({
        type: 'card',
        card: {
          number: '4242424242424242',
          exp_month: 12,
          exp_year: 2024,
          cvc: '123',
        },
      });

      if (error) {
        throw new Error(error.message);
      }
      
      setSimulationResult({
        success: true,
        message: `Payment method created successfully.`,
      });
    } catch (error) {
      setSimulationResult({
        success: false,
        message: `Error: ${error.message}`,
      });
    }
  };

  return (
    <Card className="w-[800px]">
      <CardHeader>
        <CardTitle>Stripe Enterprise Integration Accelerator</CardTitle>
        <CardDescription>Simulate Stripe integration and calculate ROI</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="sandbox">
          <TabsList>
            <TabsTrigger value="sandbox">Integration Sandbox</TabsTrigger>
            <TabsTrigger value="roi">ROI Calculator</TabsTrigger>
            <TabsTrigger value="team">Dedicated Team</TabsTrigger>
          </TabsList>
          <TabsContent value="sandbox">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Stripe Integration Sandbox</h3>
              <p>Simulate Stripe integration with your existing systems:</p>
              <Button onClick={runStripeSimulation}>Run Simulation</Button>
              {simulationResult && (
                <div className={`mt-4 p-4 rounded ${simulationResult.success ? 'bg-green-100' : 'bg-red-100'}`}>
                  {simulationResult.message}
                </div>
              )}
            </div>
          </TabsContent>
          <TabsContent value="roi">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">ROI Calculator</h3>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="annualRevenue">Annual Revenue ($)</Label>
                <Input
                  type="number"
                  id="annualRevenue"
                  value={annualRevenue}
                  onChange={(e) => setAnnualRevenue(Number(e.target.value))}
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="currentFee">Current Processing Fee (%)</Label>
                <Input
                  type="number"
                  id="currentFee"
                  value={currentProcessingFee}
                  onChange={(e) => setCurrentProcessingFee(Number(e.target.value))}
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="growth">Estimated Growth with Stripe (%)</Label>
                <Input
                  type="number"
                  id="growth"
                  value={estimatedGrowth}
                  onChange={(e) => setEstimatedGrowth(Number(e.target.value))}
                />
              </div>
              <p className="text-lg font-medium">Estimated Annual ROI: ${calculateROI()}</p>
            </div>
          </TabsContent>
          <TabsContent value="team">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Request a Dedicated Integration Team</h3>
              <p>Our expert team will ensure a smooth onboarding process and minimize time-to-value.</p>
              <Button>Request Dedicated Team</Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-gray-500">This is a prototype. Actual integration process and ROI may vary.</p>
      </CardFooter>
    </Card>
  );
};

export default StripeIntegrationAccelerator;