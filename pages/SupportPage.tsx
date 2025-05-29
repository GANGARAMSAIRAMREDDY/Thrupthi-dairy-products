
import React from 'react';
import ChatWindow from '../components/ChatWindow';
import { HELPLINE_NUMBER } from '../constants';

const SupportPage: React.FC = () => {
  return (
    <div className="space-y-8">
      <header className="text-center">
        <h1 className="text-3xl font-semibold text-textPrimary mb-2">Customer Support</h1>
        <p className="text-textSecondary">We're here to help you with any questions or concerns.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <ChatWindow />
        </div>
        <div className="lg:col-span-1 bg-surface p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-textPrimary mb-4">Contact Information</h2>
          <div className="space-y-3">
            <div>
              <h3 className="text-lg font-medium text-primary">Helpline Number</h3>
              <a href={`tel:${HELPLINE_NUMBER}`} className="text-textPrimary hover:text-secondary text-xl transition-colors">
                <PhoneIcon className="hero-icon h-5 w-5 mr-2 inline-block" />
                {HELPLINE_NUMBER}
              </a>
            </div>
            <div>
              <h3 className="text-lg font-medium text-primary">Email Support</h3>
              <a href="mailto:support@thrupthydairy.com" className="text-textPrimary hover:text-secondary transition-colors">
                <EnvelopeIcon className="hero-icon h-5 w-5 mr-2 inline-block" />
                support@thrupthydairy.com
              </a>
            </div>
            <div>
              <h3 className="text-lg font-medium text-primary">Operating Hours</h3>
              <p className="text-textPrimary">Monday - Saturday: 8:00 AM - 6:00 PM</p>
              <p className="text-textPrimary">Sunday: Closed</p>
            </div>
          </div>
           <p className="mt-6 text-sm text-textSecondary">
            For quick answers, try our AI-powered chat assistant. If you need further help, don't hesitate to call or email us.
          </p>
        </div>
      </div>
    </div>
  );
};


const PhoneIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
  </svg>
);

const EnvelopeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
  </svg>
);

export default SupportPage;
    