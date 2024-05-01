// App.js
import React, { useState } from 'react';
import Directory from './components/Directory';
import Groups from './components/Groups';
import './bootstrap.css';
import Navigation from './components/Nav/Navigation';
import './App.css';
import Visualization from './components/Visualization';
import { BrowserRouter, Routes, Route } from 'react-router-dom';





const App = () => {
  return (
 <div>
 <Navigation/>
 <BrowserRouter>
 <Routes>
    <Route path="/" element={<Directory />} />
    <Route path="/Documents" element={<Directory />} />
    <Route path="/Groups" element={<Groups />} />
    <Route path="/Visualization" element={<Visualization />} />
    </Routes>
 </BrowserRouter>
 </div>
    )
}


const UI = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const directories = [
    {
      id: 1,
      name: 'Folder 1',
      files: [{ id: 1, name: 'File 1' }, { id: 2, name: 'File 2' }],
    },
    {
      id: 2,
      name: 'Folder 2',
      files: [{ id: 3, name: 'File 3' }, { id: 4, name: 'File 4' }],
    },
  ];

  const handleSelectFile = (file) => {
    setSelectedFiles((prevFiles) => [...prevFiles, file]);
  };

  const handleDragStart = (e, file) => {
    e.dataTransfer.setData('fileId', file.id.toString());
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, folderId) => {
    e.preventDefault();
    const fileId = parseInt(e.dataTransfer.getData('fileId'));
    const file = selectedFiles.find((file) => file.id === fileId);
    if (file) {
      setSelectedFiles((prevFiles) =>
        prevFiles.filter((f) => f.id !== fileId)
      );
      // Here you can implement the logic to move the file to the folder with the given folderId
      console.log(`Moved file ${file.name} to folder with id ${folderId}`);
    }
  };

  return (
    <div className="container">
      <div className="directory">
        {directories.map((directory) => (
          <Directory
            key={directory.id}
            name={directory.name}
            files={directory.files}
            onSelectFile={handleSelectFile}
            onDragStart={handleDragStart}
          />
        ))}
      </div>
      <div
        className="files"
        onDrop={(e) => handleDrop(e, 1)}
        onDragOver={handleDragOver}
      >
        <h2>Selected Files</h2>
        <ul>
          {selectedFiles.map((file) => (
            <li key={file.id}>{file.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};


export default App;