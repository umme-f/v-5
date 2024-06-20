import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const EditButton = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    carID: '',
    carName: '',
    year: '',
    role: '',
    date: null
  });

  const [showCalendar, setShowCalendar] = useState(false);

  useEffect(() => {
    if (location.state && location.state.selectedData) {
      const selectedData = location.state.selectedData;
      setFormData({
        ...selectedData,
        date: selectedData.date ? new Date(selectedData.date) : null
      });
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, date });
    setShowCalendar(false);
  };

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const clearDate = () => {
    setFormData({ ...formData, date: null });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    navigate('/vehicle-manager');
  };

  const handleCancel = () => {
    navigate('/vehicle-manager');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-6 text-center">Edit Car</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="carID">
            Car ID
          </label>
          <input
            id="carID"
            type="text"
            name="carID"
            value={formData.carID}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="carName">
            Car Name
          </label>
          <input
            id="carName"
            type="text"
            name="carName"
            value={formData.carName}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="year">
            Year
          </label>
          <input
            id="year"
            type="text"
            name="year"
            value={formData.year}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
          />
        </div>
        {/* -------------Role dropdown------------------ */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">
            Role
          </label>
          <select id="role"
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500">
              <option value='' disabled>---役割を選択---</option>
              <option>VM</option>
              <option>User</option>
            
          </select>
        </div>

        <div className="mb-4 relative">
          <label className="block text-gray-700 text-sm font-bold mb-2">Next update date (次の更新日):
          </label>
          <div className="flex space-x-2">
            <input
              type="text"
              value={formData.date ? formData.date.toLocaleDateString('ja-JP') : ''}
              onClick={toggleCalendar}
              onChange={(e) => setFormData({ ...formData, date: e.target.value ? new Date(e.target.value) : null })}
              className="w-full px-3 py-2 border rounded-l-lg text-gray-700 focus:outline-none focus:border-blue-500 cursor-pointer"
              readOnly
            />
            <button
              type="button"
              onClick={clearDate}
              className="px-3 py-2 bg-gray-200 border-l border border-gray-300 rounded-r-lg text-gray-700 focus:outline-none focus:border-blue-500"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>

          {showCalendar && (
            <div className="absolute z-10 mt-2">
              <Calendar
                onChange={handleDateChange}
                value={formData.date}
                locale="ja"
                calendarType="gregory"
                formatShortWeekday={(locale, date) => ['日', '月', '火', '水', '木', '金', '土'][date.getDay()]}
                className="border rounded-lg shadow-lg custom-calendar"
                tileClassName={({ date, view }) => {
                  if (view === 'month') {
                    const day = date.getDay();
                    return day === 0 || day === 6 ? 'text-red-500' : null;
                  }
                  return null;
                }}
              />
            </div>
          )}
        </div>
        <div className="flex justify-between">
          <button
            type="submit"
            className="border border-slate-700 rounded px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
          >
            <FontAwesomeIcon icon={faFloppyDisk} className='pr-2' />
            登録
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="border border-slate-700 rounded px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
          >
            キャンセル
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditButton;