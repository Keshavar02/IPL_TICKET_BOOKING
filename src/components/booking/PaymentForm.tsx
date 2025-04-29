import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Ticket, Payment } from '../../types';
import { CreditCard, Calendar, Lock, User } from 'lucide-react';

interface PaymentFormProps {
  ticket: Ticket;
  amount: number;
  onPaymentComplete: (payment: Payment) => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ ticket, amount, onPaymentComplete }) => {
  const navigate = useNavigate();
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!cardNumber.trim() || !/^\d{16}$/.test(cardNumber.replace(/\s/g, ''))) {
      newErrors.cardNumber = 'Please enter a valid 16-digit card number';
    }
    
    if (!cardName.trim()) {
      newErrors.cardName = 'Please enter the name on card';
    }
    
    if (!expiryDate.trim() || !/^\d{2}\/\d{2}$/.test(expiryDate)) {
      newErrors.expiryDate = 'Please enter a valid expiry date (MM/YY)';
    }
    
    if (!cvv.trim() || !/^\d{3}$/.test(cvv)) {
      newErrors.cvv = 'Please enter a valid 3-digit CVV';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      const mockPayment: Payment = {
        payment_id: Math.floor(Math.random() * 1000),
        user_id: 1, // Assuming user_id is 1 for demo
        ticket_id: ticket.ticket_id,
        amount,
        payment_status: 'Completed',
        payment_date: new Date().toISOString()
      };
      
      onPaymentComplete(mockPayment);
      setIsProcessing(false);
      navigate(`/ticket/${ticket.ticket_id}`);
    }, 2000);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-blue-900">Payment</h2>
        <p className="text-gray-600">Please enter your payment details</p>
      </div>
      
      <div className="flex justify-center mb-6">
        <div className="flex space-x-2">
          <div className="w-12 h-8 bg-blue-900 rounded"></div>
          <div className="w-12 h-8 bg-orange-500 rounded"></div>
          <div className="w-12 h-8 bg-gray-300 rounded"></div>
          <div className="w-12 h-8 bg-gray-200 rounded"></div>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1">
            Card Number
          </label>
          <div className="relative">
            <input
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
              maxLength={19}
              placeholder="1234 5678 9012 3456"
              className={`w-full pl-10 pr-3 py-2 border rounded-md ${errors.cardNumber ? 'border-red-500' : 'border-gray-300'}`}
            />
            <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          </div>
          {errors.cardNumber && <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>}
        </div>
        
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1">
            Name on Card
          </label>
          <div className="relative">
            <input
              type="text"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
              placeholder="John Doe"
              className={`w-full pl-10 pr-3 py-2 border rounded-md ${errors.cardName ? 'border-red-500' : 'border-gray-300'}`}
            />
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          </div>
          {errors.cardName && <p className="text-red-500 text-xs mt-1">{errors.cardName}</p>}
        </div>
        
        <div className="flex space-x-4">
          <div className="w-1/2">
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Expiry Date
            </label>
            <div className="relative">
              <input
                type="text"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                placeholder="MM/YY"
                maxLength={5}
                className={`w-full pl-10 pr-3 py-2 border rounded-md ${errors.expiryDate ? 'border-red-500' : 'border-gray-300'}`}
              />
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            </div>
            {errors.expiryDate && <p className="text-red-500 text-xs mt-1">{errors.expiryDate}</p>}
          </div>
          
          <div className="w-1/2">
            <label className="block text-gray-700 text-sm font-medium mb-1">
              CVV
            </label>
            <div className="relative">
              <input
                type="password"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                placeholder="123"
                maxLength={3}
                className={`w-full pl-10 pr-3 py-2 border rounded-md ${errors.cvv ? 'border-red-500' : 'border-gray-300'}`}
              />
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            </div>
            {errors.cvv && <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>}
          </div>
        </div>
        
        <div className="bg-blue-50 p-3 rounded-md flex justify-between">
          <span className="text-blue-800 font-medium">Total Amount:</span>
          <span className="text-blue-800 font-bold">₹{amount.toLocaleString()}</span>
        </div>
        
        <button
          type="submit"
          disabled={isProcessing}
          className={`w-full py-2 px-4 rounded-md font-medium text-white transition-colors
            ${isProcessing ? 'bg-gray-400' : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'}`}
        >
          {isProcessing ? 'Processing...' : 'Pay Now'}
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;