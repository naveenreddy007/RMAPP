import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import * as XLSX from 'xlsx';

const Data = () => {
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://form-jd30.onrender.com/api/getdata');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setFormData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDownload = () => {
    const ws = XLSX.utils.json_to_sheet(formData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Submitted Data');

    // Create a download link
    XLSX.writeFile(wb, 'submitted_data.xlsx');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-slate/20 backdrop-blur-md border border-white/30 p-6 rounded-lg shadow-lg w-4/5"
      >
        <h1 className="text-2xl font-bold text-white text-center mb-6">
          Submitted Form Data
        </h1>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-200">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2 text-gray-200">SI No.</th>
                <th className="border border-gray-300 p-2 text-gray-200">Full Name</th>
                <th className="border border-gray-300 p-2 text-gray-200">Email</th>
                <th className="border border-gray-300 p-2 text-gray-200">Phone</th>
                <th className="border border-gray-300 p-2 text-gray-200">Business</th>
                <th className="border border-gray-300 p-2 text-gray-200">Turnover</th>
                <th className="border border-gray-300 p-2 text-gray-200">Location</th>
              </tr>
            </thead>
            <tbody>
              {formData.map((form, index) => (
                <motion.tr
                  key={form._id}
                  className="hover:bg-blue-300/20"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <td className="border border-gray-300 p-2 text-white">{index + 1}</td>
                  <td className="border border-gray-300 p-2 text-white">{form.fullname}</td>
                  <td className="border border-gray-300 p-2 text-blue-300">{form.email}</td>
                  <td className="border border-gray-300 p-2 text-green-300">{form.phone}</td>
                  <td className="border border-gray-300 p-2 text-yellow-300">{form.business}</td>
                  <td className="border border-gray-300 p-2 text-purple-300">{form.turnover}</td>
                  <td className="border border-gray-300 p-2 text-red-300">{form.location}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 text-center">
          <button
            onClick={handleDownload}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 transition"
          >
            Download Excel
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Data;
