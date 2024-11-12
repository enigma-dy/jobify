import React from "react";
import Footer from "../uicomponents/Footer";

const JobPlans = () => {
  const plans = [
    {
      name: "Basic",
      icon: "symbol symbol--rounded",
      description: "Perfect for startups and small businesses",
      price: "Free",
      features: [
        "1 job posting",
        "30-day listing duration",
        "Standard support",
      ],
      disabledFeatures: ["Featured listings", "Priority support"],
      buttonText: "Get Started",
      buttonColor: "default",
    },
    {
      name: "Professional",
      icon: "symbol",
      label: "Most Popular",
      description: "Ideal for growing companies and recruiters",
      price: "$199/month",
      features: [
        "10 job postings",
        "60-day listing duration",
        "Featured listings",
        "Priority support",
      ],
      disabledFeatures: [],
      buttonText: "Get Started",
      buttonColor: "pink",
    },
    {
      name: "Enterprise",
      icon: "",
      description: "Tailored for large enterprises and staffing agencies",
      price: "Custom Pricing",
      features: [
        "Unlimited job postings",
        "90-day listing duration",
        "Dedicated account manager",
        "Custom solutions",
      ],
      disabledFeatures: [],
      buttonText: "Contact Us",
      buttonColor: "white",
    },
  ];

  return (
    <section className="mt-20">
      <div className="max-w-screen-xl mx-auto p-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Job Posting Plans</h1>
          <p className="text-gray-600 mb-6">
            Find the right talent with our flexible plans.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`p-6 border rounded ${index !== 0 ? "md:border-l-0" : ""}`}>
              <div className="flex items-center mb-4">
                <div className={`w-12 h-12 mr-4 ${plan.icon}`}></div>
                <h2 className="text-xl font-semibold">{plan.name}</h2>
                {plan.label && (
                  <span className="bg-gray-200 text-gray-800 text-sm font-semibold px-2 rounded ml-2">
                    {plan.label}
                  </span>
                )}
              </div>
              <p className="text-gray-600 mb-4">{plan.description}</p>
              <p className="text-2xl font-semibold mb-6">{plan.price}</p>
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <span className="w-5 h-5 mr-2 bg-green-500"></span>
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
                {plan.disabledFeatures.length > 0 && (
                  <li className="text-gray-600">
                    <span className="w-5 h-5 mr-2 bg-red-500"></span>Not
                    Included: {plan.disabledFeatures.join(", ")}
                  </li>
                )}
              </ul>
              <button
                className={`bg-pink-500 text-white py-2 px-4 rounded ${plan.buttonColor === "pink" ? "bg-pink-600" : ""} ${plan.buttonColor === "white" ? "bg-white text-pink-500 border border-pink-500" : ""}`}>
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full mt-16">
        <Footer />
      </div>
    </section>
  );
};

export default JobPlans;
