import React from 'react';
import BookManager from './components/BookManager';
import AuthorManager from './components/AuthorManager';
import './App.css'; // Import the CSS file

const App = () => {
  return (
    <div>
      <div className='container-fluid'>
        <h1>Library Management System</h1>
        
      </div>

      <div className="container">
        <div className="manager">
          <BookManager />
          <AuthorManager />
        </div>
      </div>
    </div>
  );
}

export default App;
