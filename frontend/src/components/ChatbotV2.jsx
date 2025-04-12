import { useState, useContext, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../contexts/AppContext';

const symptomOptions = [
  'Fever/Cold',
  'Headache/Migraine',
  'Stomach Pain/Diarrhea',
  'Skin Issues',
  'Child Health',
  'Women\'s Health'
];

const symptomMapping = {
  'Fever/Cold': 'General physician',
  'Headache/Migraine': 'Neurologist',
  'Stomach Pain/Diarrhea': 'Gastroenterologist',
  'Skin Issues': 'Dermatologist',
  'Child Health': 'Pediatrician',
  'Women\'s Health': 'Gynecologist'
};

const responses = {
  greeting: "Hello! I'm your health assistant. Please select from these common health concerns:",
  fallback: "I can help you find the right doctor for your symptoms. Please select from the options above.",
  doctorRedirect: "Would you like me to show available {specialty} doctors?"
};

const Chatbot = () => {
  const { doctors } = useContext(AppContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [pendingSpecialty, setPendingSpecialty] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    setShowWelcome(true);
  }, []);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{
        text: responses.greeting,
        sender: 'bot',
        options: symptomOptions
      }]);
    }
    scrollToBottom();
  }, [isOpen, messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;
    
    const userMessage = { text: inputValue, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Handle "yes" response for doctor redirection
    if (pendingSpecialty && inputValue.toLowerCase().includes('yes')) {
      handleDoctorNavigation(pendingSpecialty);
      setPendingSpecialty(null);
      return;
    }

    // Check if message matches any symptom
    const matchedSymptom = symptomOptions.find(option => 
      inputValue.toLowerCase().includes(option.toLowerCase())
    );

    if (matchedSymptom) {
      const specialty = symptomMapping[matchedSymptom];
      setPendingSpecialty(specialty);
      setMessages(prev => [...prev, { 
        text: responses.doctorRedirect.replace('{specialty}', specialty),
        sender: 'bot',
        options: ['Yes', 'No']
      }]);
    } else {
      setMessages(prev => [...prev, { 
        text: responses.fallback,
        sender: 'bot',
        options: symptomOptions
      }]);
    }
  };

  const handleDoctorNavigation = (specialty) => {
    const availableDoctors = doctors.filter(
      doctor => doctor.speciality === specialty && doctor.available
    );
    
    navigate(`/doctors/${encodeURIComponent(specialty)}`, {
      state: { availableDoctors }
    });
    setIsOpen(false);
  };

  const handleOptionSelect = (option) => {
    const newMessage = { text: option, sender: 'user' };
    setMessages(prev => [...prev, newMessage]);
    
    if (option === 'Yes' && pendingSpecialty) {
      handleDoctorNavigation(pendingSpecialty);
      return;
    }
    if (option === 'No') {
      setMessages(prev => [...prev, { 
        text: "Okay, let me know if you need anything else.",
        sender: 'bot',
        options: symptomOptions
      }]);
      return;
    }
    
    const specialty = symptomMapping[option];
    setPendingSpecialty(specialty);
    setMessages(prev => [...prev, { 
      text: responses.doctorRedirect.replace('{specialty}', specialty),
      sender: 'bot',
      options: ['Yes', 'No']
    }]);
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {showWelcome && (
        <div className="absolute bottom-full right-0 mb-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-lg text-sm whitespace-nowrap">
          Hi!! I'm your Health Assistant. Need Any Help?
          <div className="absolute bottom-0 right-2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-blue-100 transform translate-y-1/2"></div>
        </div>
      )}
      {isOpen ? (
        <div className="w-80 h-96 bg-white rounded-lg shadow-xl flex flex-col">
          <div className="bg-blue-600 text-white p-3 rounded-t-lg flex justify-between items-center">
            <h3 className="font-bold">Health Assistant</h3>
            <button onClick={() => {
              setIsOpen(false);
              setShowWelcome(false);
            }} className="text-white">×</button>
          </div>
          <div className="flex-1 p-4 overflow-y-auto">
            {messages.map((msg, i) => (
              <div key={i} className={`mb-3 ${msg.sender === 'bot' ? 'text-left' : 'text-right'}`}>
                <div className={`inline-block p-2 rounded-lg ${msg.sender === 'bot' ? 'bg-gray-200' : 'bg-blue-500 text-white'}`}>
                  {msg.text}
                </div>
                {msg.options && (
                  <div className="mt-2 space-y-2">
                    {msg.options.map((option, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleOptionSelect(option)}
                        className="block w-full text-left p-2 bg-blue-100 rounded hover:bg-blue-200"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-3 border-t flex">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type your message..."
              className="flex-1 p-2 border rounded-l-lg focus:outline-none"
            />
            <button
              onClick={handleSendMessage}
              className="bg-blue-600 text-white px-4 rounded-r-lg hover:bg-blue-700"
            >
              Send
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => {
            setIsOpen(true);
            setShowWelcome(false);
          }}
          className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default Chatbot;
