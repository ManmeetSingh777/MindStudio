import React from 'react';

const PaymentPage = ({ onSuccess, amount }) => {
  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const displayRazorpay = async () => {
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');

    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?');
      return;
    }

    const data = await fetch('/api/payment', { method: 'POST', body: JSON.stringify({ amount }), headers: { 'Content-Type': 'application/json' } }).then((t) =>
      t.json()
    );

    const options = {
      key: 'your-razorpay-key', // Enter the Key ID generated from the Dashboard
      amount: data.amount.toString(),
      currency: data.currency,
      name: 'Therapy Booking',
      description: 'Test Transaction',
      image: 'https://example.com/your_logo',
      order_id: data.id,
      handler: function (response) {
        alert('Payment Successful');
        onSuccess(response);
      },
      prefill: {
        name: 'Gaurav Kumar',
        email: 'gaurav.kumar@example.com',
        contact: '9999999999',
      },
      notes: {
        address: 'Razorpay Corporate Office',
      },
      theme: {
        color: '#F37254',
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div>
      <button onClick={displayRazorpay}>Pay Now</button>
    </div>
  );
};

export default PaymentPage;
