"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Send, 
  MessageSquare, 
  User, 
  Phone, 
  Building,
  CheckCircle2
} from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  message: string;
  budget: string;
  service: string;
}

const initialFormData: FormData = {
  name: "",
  email: "",
  company: "",
  phone: "",
  message: "",
  budget: "",
  service: ""
};

export function Contact() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const services = [
    "Site Web",
    "E-commerce",
    "SEO",
    "Marketing Digital",
    "Réseaux Sociaux",
    "Autre"
  ];

  const budgets = [
    "< 5k€",
    "5k€ - 10k€",
    "10k€ - 20k€",
    "20k€ - 50k€",
    "> 50k€"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://formspree.io/f/xovqqyog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setIsSuccess(true);
        setFormData(initialFormData);
        setTimeout(() => {
          setIsSuccess(false);
          setCurrentStep(1);
        }, 5000);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* En-tête */}
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-secondary font-semibold mb-4 block"
            >
              CONTACTEZ-NOUS
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl font-bold text-primary mb-4"
            >
              Démarrons votre projet
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-gray-600 max-w-2xl mx-auto"
            >
              Parlez-nous de votre projet et découvrez comment nous pouvons vous aider à atteindre vos objectifs
            </motion.p>
          </div>

          {/* Carte de contact */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            {/* Étapes */}
            <div className="flex justify-between mb-8 relative">
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2 z-0">
                <div 
                  className="h-full bg-secondary transition-all duration-300"
                  style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
                />
              </div>
              {[1, 2, 3].map((step) => (
                <div 
                  key={step}
                  className={`relative z-10 flex items-center justify-center w-10 h-10 rounded-full 
                           ${currentStep >= step ? 'bg-secondary text-white' : 'bg-gray-200 text-gray-500'} 
                           transition-colors duration-300`}
                >
                  {step}
                </div>
              ))}
            </div>

            {/* Formulaire */}
            <form onSubmit={handleSubmit}>
              {/* Étape 1 */}
              <div className={`space-y-6 ${currentStep === 1 ? 'block' : 'hidden'}`}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Nom complet</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:border-secondary 
                                 focus:ring-2 focus:ring-secondary/20 transition-colors"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:border-secondary 
                                 focus:ring-2 focus:ring-secondary/20 transition-colors"
                        placeholder="john@exemple.com"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Entreprise</label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:border-secondary 
                                 focus:ring-2 focus:ring-secondary/20 transition-colors"
                        placeholder="Votre entreprise"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Téléphone</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:border-secondary 
                                 focus:ring-2 focus:ring-secondary/20 transition-colors"
                        placeholder="06 12 34 56 78"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Étape 2 */}
              <div className={`space-y-6 ${currentStep === 2 ? 'block' : 'hidden'}`}>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Service souhaité</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {services.map((service) => (
                      <label
                        key={service}
                        className={`flex items-center justify-center p-4 rounded-lg border cursor-pointer
                                ${formData.service === service 
                                  ? 'border-secondary bg-secondary/5 text-secondary' 
                                  : 'border-gray-200 hover:border-secondary/50'}`}
                      >
                        <input
                          type="radio"
                          name="service"
                          value={service}
                          checked={formData.service === service}
                          onChange={handleChange}
                          className="hidden"
                        />
                        <span>{service}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Budget estimé</label>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {budgets.map((budget) => (
                      <label
                        key={budget}
                        className={`flex items-center justify-center p-4 rounded-lg border cursor-pointer
                                ${formData.budget === budget 
                                  ? 'border-secondary bg-secondary/5 text-secondary' 
                                  : 'border-gray-200 hover:border-secondary/50'}`}
                      >
                        <input
                          type="radio"
                          name="budget"
                          value={budget}
                          checked={formData.budget === budget}
                          onChange={handleChange}
                          className="hidden"
                        />
                        <span>{budget}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Étape 3 */}
              <div className={`space-y-6 ${currentStep === 3 ? 'block' : 'hidden'}`}>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Votre message</label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:border-secondary 
                               focus:ring-2 focus:ring-secondary/20 transition-colors"
                      placeholder="Décrivez votre projet..."
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Navigation et Soumission */}
              <div className="flex justify-between mt-8">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={() => setCurrentStep(prev => prev - 1)}
                    className="px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    Retour
                  </button>
                )}
                <div className="ml-auto">
                  {currentStep < 3 ? (
                    <button
                      type="button"
                      onClick={() => setCurrentStep(prev => prev + 1)}
                      className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary/90 
                               transition-colors flex items-center gap-2"
                    >
                      Suivant
                      <Send className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-secondary text-primary px-8 py-3 rounded-lg hover:bg-secondary/90 
                               transition-colors flex items-center gap-2 disabled:opacity-50 
                               disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        'Envoi en cours...'
                      ) : (
                        <>
                          Envoyer
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </form>

            {/* Message de succès */}
            {isSuccess && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 bg-green-50 text-green-800 px-6 py-4 rounded-lg flex items-center gap-3"
              >
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                Message envoyé avec succès ! Nous vous recontacterons très rapidement.
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;