// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const MailStatus = () => {
//   const [dueToday, setDueToday] = useState([]);
//   const [currentDate, setCurrentDate] = useState('');
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     fetchDueToday();
    
//     // Refresh data every 1 minute
//     const interval = setInterval(fetchDueToday, 60000);
//     return () => clearInterval(interval);
//   }, []);

//   const fetchDueToday = async () => {
//     try {
//       setIsLoading(true);
//       const res = await axios.get('http://localhost:9000/reserve/getDueToday');
      
//       // Get current IST date
//       const now = new Date();
//       const istDate = new Date(now.getTime() + (5.5 * 60 * 60 * 1000));
//       const formattedToday = istDate.toISOString().split('T')[0];
      
//       // Get ALL today's due books (including those already sent)
//       const allDueToday = await axios.get(`http://localhost:9000/reserve/getAllDueToday?date=${formattedToday}`);
      
//       setDueToday(allDueToday.data);
//       setCurrentDate(formattedToday);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleRefresh = () => {
//     fetchDueToday();
//   };

//   return (
//     <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
//       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
//         <h2>Today's Due Books ({currentDate})</h2>
//         <button 
//           onClick={handleRefresh}
//           style={{ 
//             padding: '8px 16px',
//             backgroundColor: '#4CAF50',
//             color: 'white',
//             border: 'none',
//             borderRadius: '4px',
//             cursor: 'pointer',
//             display: 'flex',
//             alignItems: 'center'
//           }}
//         >
//           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '5px' }}>
//             <path d="M23 4v6h-6M1 20v-6h6"></path>
//             <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
//           </svg>
//           Refresh
//         </button>
//       </div>

//       {isLoading ? (
//         <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
//           <div className="spinner"></div>
//         </div>
//       ) : dueToday.length === 0 ? (
//         <div style={{ 
//           padding: '20px', 
//           backgroundColor: '#f8f9fa', 
//           borderRadius: '4px',
//           textAlign: 'center',
//           border: '1px dashed #ddd'
//         }}>
//           <p style={{ margin: 0 }}>No books due for return today.</p>
//         </div>
//       ) : (
//         <div style={{ overflowX: 'auto' }}>
//           <table style={{ 
//             width: '100%', 
//             borderCollapse: 'collapse',
//             boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
//           }}>
//             <thead>
//               <tr style={{ backgroundColor: '#f2f2f2' }}>
//                 <th style={{ padding: '12px 15px', textAlign: 'left' }}>Student ID</th>
//                 <th style={{ padding: '12px 15px', textAlign: 'left' }}>Name</th>
//                 <th style={{ padding: '12px 15px', textAlign: 'left' }}>Email</th>
//                 <th style={{ padding: '12px 15px', textAlign: 'left' }}>Book</th>
//                 <th style={{ padding: '12px 15px', textAlign: 'left' }}>Status</th>
//                 <th style={{ padding: '12px 15px', textAlign: 'left' }}>Time Sent</th>
//               </tr>
//             </thead>
//             <tbody>
//               {dueToday.map((user, index) => (
//                 <tr 
//                   key={index}
//                   style={{ 
//                     backgroundColor: index % 2 === 0 ? '#fff' : '#f9f9f9',
//                     borderBottom: '1px solid #eee'
//                   }}
//                 >
//                   <td style={{ padding: '12px 15px' }}>{user.StudentID}</td>
//                   <td style={{ padding: '12px 15px' }}>{user.Name}</td>
//                   <td style={{ padding: '12px 15px' }}>{user.Email}</td>
//                   <td style={{ padding: '12px 15px' }}>{user.Bookname}</td>
//                   <td style={{ padding: '12px 15px' }}>
//                     <div style={{ 
//                       display: 'inline-flex', 
//                       alignItems: 'center',
//                       padding: '4px 8px',
//                       borderRadius: '12px',
//                       backgroundColor: user.MailSent ? '#e6f7ee' : '#ffebee',
//                       color: user.MailSent ? '#00a854' : '#f5222d'
//                     }}>
//                       <div style={{
//                         width: '8px',
//                         height: '8px',
//                         borderRadius: '50%',
//                         backgroundColor: user.MailSent ? '#00a854' : '#f5222d',
//                         marginRight: '6px'
//                       }}></div>
//                       {user.MailSent ? 'Sent' : 'Pending'}
//                     </div>
//                   </td>
//                   <td style={{ padding: '12px 15px' }}>
//                     {user.MailSentAt ? new Date(user.MailSentAt).toLocaleTimeString('en-IN') : '--'}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       <style jsx>{`
//         @keyframes spin {
//           0% { transform: rotate(0deg); }
//           100% { transform: rotate(360deg); }
//         }
//         .spinner {
//           border: 4px solid rgba(0, 0, 0, 0.1);
//           border-radius: 50%;
//           border-top: 4px solid #3498db;
//           width: 40px;
//           height: 40px;
//           animation: spin 1s linear infinite;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default MailStatus;



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Adminnav from "./Adminnav"

const TodayDueBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // First get current IST date
      const now = new Date();
      const istDate = new Date(now.getTime() + (5.5 * 60 * 60 * 1000));
      const todayStr = istDate.toISOString().split('T')[0];
      setCurrentDate(todayStr);
      
      // Then fetch books
      const response = await axios.get('http://localhost:9000/reserve/getDueToday');
      setBooks(response.data);
      
    } catch (err) {
      setError(err.response?.data?.error || "Failed to fetch data");
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <Adminnav/>
      <h2 style={{ marginTop: '80px' }}>Today's Due Books ({currentDate})</h2>
      
      <button 
        onClick={fetchData}
        style={{
          padding: '8px 16px',
          background: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginBottom: '20px'
        }}
      >
        Refresh Data
      </button>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <div style={{ color: 'red', padding: '10px', border: '1px solid red' }}>
          Error: {error}
          <p>Please check:
            <ul>
              <li>Is your backend running?</li>
              <li>Is the endpoint /reserve/getDueToday correct?</li>
            </ul>
          </p>
        </div>
      ) : books.length === 0 ? (
        <p>No books due for return today.</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ 
            width: '100%', 
            borderCollapse: 'collapse',
            border: '1px solid #ddd'
          }}>
            <thead>
              <tr style={{ backgroundColor: '#f2f2f2' }}>
                <th style={{ padding: '12px', border: '1px solid #ddd' }}>Student ID</th>
                <th style={{ padding: '12px', border: '1px solid #ddd' }}>Name</th>
                <th style={{ padding: '12px', border: '1px solid #ddd' }}>Book</th>
                <th style={{ padding: '12px', border: '1px solid #ddd' }}>ReturnDate</th>
                
              </tr>
            </thead>
            <tbody>
              {books.map((book, index) => (
                <tr key={index}>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>{book.StudentID}</td>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>{book.Name}</td>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>{book.Bookname}</td>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>{book.ReturnDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TodayDueBooks;