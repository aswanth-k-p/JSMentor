import React from 'react';
import { Link } from 'react-router-dom';


const Home = () => {
  return (
  
    
    <div className='home-container'>
      
      <h1>JavaScript Mentor Tracker</h1>
      <p className='lead'>Your personalized guide to mastering JavaScript</p>
      
      <div className='home-features'>
        <div className='feature'>
          <i className='fas fa-road fa-3x'></i>
          <h3>Track Your Learning Path</h3>
          <p>Follow a structured curriculum from basics to advanced topics</p>
        </div>
        
        <div className='feature'>
          <i className='fas fa-tasks fa-3x'></i>
          <h3>Monitor Progress</h3>
          <p>Keep track of your journey with status updates on each topic</p>
        </div>
        
        <div className='feature'>
          <i className='fas fa-sticky-note fa-3x'></i>
          <h3>Take Notes</h3>
          <p>Record your insights, questions, and code snippets as you learn</p>
        </div>
      </div>
      
      <div className='home-cta'>
        <Link to='/register' className='btn btn-primary'>
          Get Started
        </Link>
        {/* <Link to='/login' className='btn btn-light'>
          Login
        </Link> */}
      </div>
    </div>
  );
};

export default Home;