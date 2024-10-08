import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Footer from './Footer';

function Login() {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState('jp');
  const [selectedRow, setSelectedRow] = useState(null);

  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
      setLanguage(savedLanguage);
    }

    // Check for login status in localStorage
    const loggedIn = localStorage.getItem('loggedIn');
    if (loggedIn) {
      // If already logged in, redirect to the protected page
      navigate('/vehicle-manager');
    }
  }, [i18n, navigate]);

  // Language setting functions
  const setLanguageToEnglish = () => {
    i18n.changeLanguage('en');
    setLanguage('en');
    localStorage.setItem('selectedLanguage', 'en');
  };

  const setLanguageToJapanese = () => {
    i18n.changeLanguage('jp');
    setLanguage('jp');
    localStorage.setItem('selectedLanguage', 'jp');
  };

  // Handle login
  // Handle login
const handleSuccessfulLogin = async (event) => {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    // Make a POST request to the /auth/token endpoint
    const response = await fetch('http://192.168.1.171:8000/auth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'password',  // Depending on your API, grant_type might be optional
        username: email,
        password: password,
        // Optionally include client_id, client_secret, and scope if required by your API
        client_id: 'your-client-id',
        client_secret: 'your-client-secret',
        scope: '',  // if required, otherwise remove it
      }),
    });

    if (response.ok) {
      const data = await response.json();
      // Save the token (you could store it in localStorage or a secure cookie)
      localStorage.setItem('token', data.access_token);
      
      // Save login state
      localStorage.setItem('loggedIn', 'true');
      localStorage.setItem('loggedInUser', email === 'pochi@example.com' ? 'Pochi' : 'Boku');
      
      // Redirect to the next page
      navigate('/vehicle-manager');
    } else {
      alert('Invalid login credentials.');
    }
  } catch (error) {
    console.error('Error during login:', error);
    alert('There was an error with the login process.');
  }
};

  

  return (
    <div className="flex flex-col min-h-screen">
      <section className="bg-gray-50 flex-grow flex items-center justify-center min-h-[500px]">
        {/* Language toggle buttons */}
        <div className="absolute top-4 right-4 rounded">
          <button onClick={setLanguageToJapanese} className={`p-2 ${language === 'jp' ? 'bg-blue-600 text-white' : 'bg-gray-400'} text-xs uppercase font-bold rounded-l`}>
            日本語
          </button>
          <button onClick={setLanguageToEnglish} className={`p-2 ${language === 'en' ? 'bg-blue-600 text-white' : 'bg-gray-400'} text-xs uppercase font-bold rounded-r`}>
            En
          </button>
        </div>

        {/* Form */}
        <div className="w-full max-w-md bg-white rounded-lg shadow-2xl p-6 sm:max-w-md lg:max-w-lg min-w-[300px] min-h-[400px]">
          <div className="space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold text-gray-900 md:text-2xl text-center p-2">
              {t('welcome')}
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSuccessfulLogin}>
              <div>
                <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700 pb-2">
                  {t('email')}
                </span>
                <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Email ID" required />
              </div>
              <div>
                <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700 pb-2">
                  {t('password')}
                </span>
                <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="remember" className="text-gray-500">{t('remember')}</label>
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-xl shadow-gray-400/75 transition-transform duration-200 ease-in-out hover:scale-[1.02]">
                  {t('login')}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Login;
