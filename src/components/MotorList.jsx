// src/components/CarList.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MotorList = () => {
  const [motor, setCars] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/cars')
      .then(response => {
        console.log('Response from server:', response.data);
        const carsWithDate = response.data.map(motor => ({
          ...motor,
          harga_keluar: new Date(motor.harga_keluar)
        }));
        setCars(carsWithDate);
      })
      .catch(error => {
        console.error('Error fetching motor:', error);
      });
  }, []);

  return (
    <div>
      <h2><b>Motor List</b></h2>
      <table>
        <thead>
          <tr>
            <th>Nama</th>
            <th>Deskripsi</th>
            <th>Harga</th>
          </tr>
        </thead>
        <tbody>
          {motor.length > 0 ? motor.map(motor => (
            <tr key={motor._id}>
              <td>{motor.nama}</td>
              <td>{motor.deskripsi}</td>
              <td>{motor.harga}</td>
            </tr>
          )) : (
            <tr>
              <td colSpan="3">No data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MotorList;
