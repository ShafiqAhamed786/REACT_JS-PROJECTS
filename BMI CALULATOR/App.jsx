import { useState } from 'react';
import './App.css';

const BMICalculator = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBMI] = useState(null);
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');

  const calculateBMI = () => {
    if (!height || !weight) {
      setError('Please enter valid height and weight.');
      return;
    }

    if (height <= 0 || weight <= 0) {
      setError('Height and weight must be positive numbers.');
      return;
    }

    setError('');
    const heightInMeters = height / 100;
    const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(2);
    setBMI(bmiValue);
    setCategory(getBMICategory(bmiValue));
  };

  const getBMICategory = (bmi) => {
    if (bmi < 18.5) {
      return 'Underweight';
    } else if (bmi >= 18.5 && bmi < 24.9) {
      return 'Normal weight';
    } else if (bmi >= 25 && bmi < 29.9) {
      return 'Overweight';
    } else {
      return 'Obese';
    }
  };

  const clearFields = () => {
    setHeight('');
    setWeight('');
    setBMI(null);
    setCategory('');
    setError('');
  };

  return (
    <div className="bmi-calculator">
      <h2>BMI Calculator</h2>
      <div className="input-group">
        <label htmlFor="height">Height (cm):</label>
        <input
          type="number"
          id="height"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />
      </div>
      <div className="input-group">
        <label htmlFor="weight">Weight (kg):</label>
        <input
          type="number"
          id="weight"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
      </div>
      <button onClick={calculateBMI}>Calculate BMI</button>
      <button onClick={clearFields}>Clear</button>
      {error && (
        <div className="error">
          {error}
        </div>
      )}
      {bmi && (
        <div className="result">
          <h3>Your BMI: {bmi}</h3>
          <h3>Category: {category}</h3>
        </div>
      )}
    </div>
  );
};

export default BMICalculator;
