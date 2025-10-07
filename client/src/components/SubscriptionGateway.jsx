import React, { useState } from "react";
import { X, CreditCard, Lock, Check, Star,Shield,Zap,Crown,ArrowRight} from "lucide-react";
import { AlertTriangle } from "lucide-react";
import { useSubscribeToPremium, useCancelSubscription } from "../hook/useSubscription";

// mode: 'subscribe' | 'cancel'
const SubscriptionGateway = ({ isOpen, onClose, onSubscribe, mode = "subscribe" }) => {
  if (isOpen) {
    console.log('[Gateway] Open with mode:', mode);
  }
  const [selectedPlan, setSelectedPlan] = useState("monthly");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("card");
  const subscribeToPremium = useSubscribeToPremium();
  const cancelSubscription = useCancelSubscription();

  const plans = {
    monthly: {
      price: 12,
      period: "month",
      originalPrice: null,
      savings: null
    },
    yearly: {
      price: 96,
      period: "year",
      originalPrice: 144,
      savings: 48
    }
  };

  const features = [
    "Unlimited AI-powered content generation",
    "Advanced image editing tools",
    "Priority customer support",
    "Export in multiple formats",
    "Commercial usage rights",
    "API access for developers"
  ];

  const paymentMethods = [
    { id: "card", name: "Credit/Debit Card", icon: CreditCard },
    { id: "paypal", name: "PayPal", icon: CreditCard },
    { id: "apple", name: "Apple Pay", icon: CreditCard },
    { id: "google", name: "Google Pay", icon: CreditCard }
  ];

  const handleSubscribe = async () => {
    subscribeToPremium.mutate(
      {
        plan: selectedPlan,
        paymentMethod: selectedPaymentMethod
      },
      {
        onSuccess: () => {
          onSubscribe(selectedPlan, selectedPaymentMethod);
        }
      }
    );
  };

  const handleCancel = () => {
    cancelSubscription.mutate(undefined, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black z-40 transition-opacity duration-500 ${
          isOpen ? 'bg-opacity-50' : 'bg-opacity-0'
        }`}
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className={`fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-500 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center gap-2">
              
              <h2 className="text-xl font-semibold text-gray-900">{mode === "subscribe" ? "Upgrade to Premium" : "Manage Subscription"}</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-all duration-300 hover:scale-110 hover:rotate-90"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto animate-in slide-in-from-right-2 duration-700">
            {mode === "subscribe" ? (
              <>
                {/* Plan Selection */}
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Choose your billing cycle</h3>
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <button
                      onClick={() => setSelectedPlan("monthly")}
                      className={`p-4 rounded-lg border-2 transition-all duration-300 hover:scale-105 ${
                        selectedPlan === "monthly"
                          ? "border-blue-500 bg-blue-50 shadow-md"
                          : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
                      }`}
                    >
                      <div className="text-center">
                        <div className="text-sm font-medium text-gray-900">Monthly</div>
                        <div className="text-2xl font-bold text-gray-900">$12</div>
                        <div className="text-xs text-gray-500">per month</div>
                      </div>
                    </button>
                    <button
                      onClick={() => setSelectedPlan("yearly")}
                      className={`p-4 rounded-lg border-2 transition-all duration-300 hover:scale-105 relative ${
                        selectedPlan === "yearly"
                          ? "border-blue-500 bg-blue-50 shadow-md"
                          : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
                      }`}
                    >
                      <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                        Save 33%
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-medium text-gray-900">Yearly</div>
                        <div className="text-2xl font-bold text-gray-900">$96</div>
                        <div className="text-xs text-gray-500">per year</div>
                        <div className="text-xs text-green-600 font-medium">$8/month</div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Features */}
                <div className="px-6 mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Premium Features</h3>
                  <div className="space-y-3">
                    {features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                          <Check className="w-3 h-3 text-green-600" />
                        </div>
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="px-6 mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Method</h3>
                  <div className="space-y-2">
                    {paymentMethods.map((method) => {
                      const IconComponent = method.icon;
                      return (
                        <button
                          key={method.id}
                          onClick={() => setSelectedPaymentMethod(method.id)}
                          className={`w-full p-3 rounded-lg border-2 transition-all duration-300 hover:scale-[1.02] flex items-center gap-3 ${
                            selectedPaymentMethod === method.id
                              ? "border-blue-500 bg-blue-50 shadow-md"
                              : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
                          }`}
                        >
                          <IconComponent className="w-5 h-5 text-gray-600" />
                          <span className="text-sm font-medium text-gray-900">{method.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Security Badge */}
                <div className="px-6 mb-6">
                  <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                    <Shield className="w-5 h-5 text-green-600" />
                    <span className="text-sm text-gray-700">
                      Your payment is secure and encrypted
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Cancel Premium</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-red-50 rounded-xl border border-red-200">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-red-800">Are you sure you want to cancel?</h4>
                        <p className="text-sm text-red-700 mt-1">You'll immediately lose access to premium features.</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <Shield className="w-4 h-4 text-gray-600" />
                      You can re-upgrade anytime.
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-200 bg-gray-50">
            {mode === "subscribe" ? (
              <>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-sm text-gray-600">Total</div>
                    <div className="text-2xl font-bold text-gray-900">
                      ${plans[selectedPlan].price}
                    </div>
                    <div className="text-xs text-gray-500">
                      {selectedPlan === "yearly" && (
                        <span className="text-green-600">
                          You save ${plans[selectedPlan].savings} per year
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Lock className="w-4 h-4" />
                    <span>Secure</span>
                  </div>
                </div>
                
                <button
                  onClick={handleSubscribe}
                  disabled={subscribeToPremium.isPending}
                  className={`w-full bg-gray-900 text-white py-3 px-4 rounded-md font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                    subscribeToPremium.isPending 
                      ? 'opacity-70 cursor-not-allowed' 
                      : 'hover:bg-black/90 hover:scale-[1.01]'
                  }`}
                >
                  {subscribeToPremium.isPending ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Zap className="w-5 h-5" />
                      Subscribe Now
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
                
                <p className="text-xs text-gray-500 text-center mt-3">
                  Cancel anytime. No commitment required.
                </p>
              </>
            ) : (
              <button
                onClick={handleCancel}
                disabled={cancelSubscription.isPending}
                className={`w-full bg-red-600 text-white py-3 px-4 rounded-md font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                  cancelSubscription.isPending 
                    ? 'opacity-70 cursor-not-allowed' 
                    : 'hover:bg-red-700 hover:scale-[1.01]'
                }`}
              >
                {cancelSubscription.isPending ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Cancelling...
                  </>
                ) : (
                  <>
                    <X className="w-5 h-5" />
                    Confirm Cancel
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SubscriptionGateway;
