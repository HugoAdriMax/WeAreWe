"use client";

import { Send } from 'lucide-react';

const RawForm = () => {
  return (
    <form 
      action="https://formspree.io/f/xovqqyog"
      method="POST"
      className="bg-gray-100 p-8 rounded-lg shadow-lg"
    >
      <div className="mb-6">
        <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
          Nom
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-secondary"
          required
        />
      </div>

      <div className="mb-6">
        <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-secondary"
          required
        />
      </div>

      <div className="mb-6">
        <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-secondary"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-secondary text-primary px-6 py-3 rounded-lg 
                 font-semibold hover:bg-accent transition duration-300 
                 ease-in-out transform hover:-translate-y-1 hover:shadow-lg
                 flex items-center justify-center"
      >
        Envoyer
        <Send className="ml-2 h-5 w-5" />
      </button>
    </form>
  );
};

export default RawForm;