import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import JobEditAdd from './features/jobs/JobEditAdd';
import JobList from './features/jobs/JobList';



function App() {
  return (
    <div className="App">
         <JobList/>
      
    </div>
  );
}

export default App;
