import { useState } from 'react';
import './InfoPages.css';

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What materials are your T-shirts made from?",
      answer: "Our T-shirts are crafted from 100% premium cotton. We source only the finest materials to ensure maximum comfort, durability, and breathability. Each shirt is pre-shrunk to maintain its shape wash after wash."
    },
    {
      question: "How do I choose the right size?",
      answer: "We recommend checking our Size Guide page for detailed measurements. Our T-shirts have a relaxed, unisex fit. If you're between sizes, we suggest sizing up for a more comfortable fit or sizing down for a more fitted look."
    },
    {
      question: "How long does shipping take?",
      answer: "Standard shipping takes 5-7 business days. Express shipping (2-3 business days) is available at checkout for an additional fee."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for unworn items in original condition with tags attached. Simply visit our Returns page to initiate a return. Refunds are processed within 5-7 business days after we receive your item."
    },
    {
      question: "Do you offer exchanges?",
      answer: "Yes! If you need a different size or color, you can request an exchange within 30 days of purchase. The easiest way is to return your item for a refund and place a new order for the desired item."
    },
    {
      question: "How should I care for my Tavero T-shirt?",
      answer: "For best results, machine wash cold with similar colors. Tumble dry low or hang to dry. Avoid bleach and ironing directly on any prints. Following these care instructions will help your T-shirt maintain its quality and color."
    },
    {
      question: "Are your T-shirts true to size?",
      answer: "Yes, our T-shirts are designed to fit true to standard US sizing. However, we recommend checking the size guide for exact measurements as fit preferences vary. Our unisex design works well for all body types."
    },
    {
      question: "Where do you ship?",
      answer: "We currently ship within Europe. You can see the exact shipping cost at checkout before completing your purchase."
    },
    {
      question: "How can I track my order?",
      answer: "Once your order ships, you'll receive an email with a tracking number. You can use this number to track your package on the carrier's website. Orders typically ship within 1-2 business days."
    },
    {
      question: "Do you offer gift wrapping?",
      answer: "Currently, we don't offer gift wrapping services. However, all orders come in our premium packaging which makes for a great presentation. We're considering adding gift options in the future!"
    }
  ];

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="info-page">
      <div className="info-header">
        <h1>Frequently Asked Questions</h1>
        <p>Find answers to common questions about our products and services</p>
      </div>

      <div className="info-content">
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`faq-item ${openIndex === index ? 'open' : ''}`}
            >
              <button 
                className="faq-question"
                onClick={() => toggleFaq(index)}
              >
                <span>{faq.question}</span>
                <svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                  className="faq-icon"
                >
                  <path d="M6 9l6 6 6-6"/>
                </svg>
              </button>
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="info-cta">
          <h3>Still have questions?</h3>
          <p>Our customer support team is here to help.</p>
          <a href="/contact" className="btn btn-primary">Contact Us</a>
        </div>
      </div>
    </div>
  );
}

export default FAQ;
