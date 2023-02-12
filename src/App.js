import './App.css';
import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [data, setData] = useState([]);
  const [showDetails, setShowDetails] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        "https://jsonplaceholder.typicode.com/users"
      );

      setData(result.data);
    };

    fetchData();
  }, []);

  const handleShowDetails = (id) => {
    setShowDetails({
      ...showDetails,
      [id]: !showDetails[id],
    });
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="App">
      <ul className='container'>
        {currentItems.map((item) => (
          <li key={item.id} className="card">
            <div className='basic-details'>
              <h3 className='card-item'>{item.name}</h3>
              <p className='card-item'><label>Contact</label><br/> {item.username}</p>
              <p className='card-item'><label>City</label><br/> {item.address.city}</p>
              <p className='card-item'><label>Company</label><br/> {item.company.name}</p>
              <button onClick={() => handleShowDetails(item.id)} className='details-btn'>
                {showDetails[item.id] ? "Hide Details" : "View Details"}
              </button>
            </div>
            {showDetails[item.id] && (
              <div className='full-details'>
                <p><label>Contact Person</label><br/> {item.username}</p>
                <p>
                  <label>Address</label><br/> {item.address.street}, {item.address.suite},{" "}
                  {item.address.city} - {item.address.zipcode} <br/>
                  <label>Lattitude : </label>{item.address.geo.lat}<br/>
                  <label>Longitude : </label>{item.address.geo.lng}
                </p>
                <p><label>Phone</label><br/> {item.phone}</p>
                <p><label>Email</label><br/> {item.email}</p>
                <p><label>Website</label><br/> <a href={"http://" + item.website} target="_blank">{item.website}</a></p>
                <p>
                  <label>Company:</label><br/> <b>{item.company.name}</b>
                  {' - '}<i>{item.company.catchPhrase}</i><br/>
                  {item.company.bs}
                </p>
              </div>
            )}
          </li>
        ))}
      </ul>
      <div className="pagination">
        { <button
          disabled={currentPage === 1}
          onClick={() => paginate(currentPage - 1)}
          className="prev-btn"
        >
        Prev
        </button>}

        {Array.from({ length: Math.ceil(data.length / itemsPerPage) }, (_, i) => (
          <button
            key={i + 1}
            style={{ backgroundColor: currentPage === i + 1 ? 'black' : '#fb3e3e' }}
            onClick={() => paginate(i + 1)}
          >
            {i + 1}
          </button>
        ))}

        {
          <button
            disabled={currentPage === totalPages}
            onClick={() => paginate(currentPage + 1)}
            className="next-btn"
          >
          Next
          </button>
        }
      </div>
    </div>
  );
};

export default App;