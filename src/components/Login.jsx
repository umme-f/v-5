import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Footer from './Footer';

function Login() {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState('jp');
  const navigate = useNavigate();

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

  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
      setLanguage(savedLanguage);
    }
  }, [i18n]);

  // This is where you add the updated handleSuccessfulLogin function
  const handleSuccessfulLogin = async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      // Store the token in localStorage
      localStorage.setItem('token', data.token);

      // Redirect to the next page
      navigate('/vehicle-manager');
    } catch (error) {
      console.error('Error:', error);
      alert('Login failed');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <section className="bg-gray-50 flex-grow flex items-center justify-center">
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
        <div className="w-full max-w-md bg-white rounded-lg shadow-2xl p-6 sm:max-w-md lg:max-w-lg min-w-[300px] md:mt-0 dark:border-gray-700">
          <div className="space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold text-gray-900 md:text-2xl text-center p-2">
              {t('welcome')}
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSuccessfulLogin}>
              <div>
                <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700 pb-2">
                  {t('email')}
                </span>
                <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Email ID" required="" />
              </div>
              <div>
                <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700 pb-2">
                  {t('password')}
                </span>
                <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required="" />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="remember" className="text-gray-500">{t('remember')}</label>
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <button type="submit" className="border border-black bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-xl shadow-gray-400/75 transition-transform duration-200 ease-in-out hover:scale-[1.02]">
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
