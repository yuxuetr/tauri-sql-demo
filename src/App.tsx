import { useState, useEffect } from "react";
import { createAuthTable, insertAuth, queryAuth } from './dbop';

function App() {
  const [rows, setRows] = useState([]);
  useEffect(() => {
    async function setupDb() {
      await createAuthTable();
      await insertAuth('user123', 'admin');
      const queriedRows = await queryAuth();
      console.log(`Queried Rows Length: ${queriedRows.length}`);
      setRows(queriedRows);
    }

    setupDb();
  }, []);

  return (
    <div className='App'>
      <h1>Tauri + React Database Example</h1>
      <div>
        <h2>Auth Table Rows</h2>
        <h2>Queried Rows Length: {rows.length}</h2>
        <ul>
          {
            rows.map((row, index) => (
              <li key={index}>
                ID: {row.id}, UserId: {row.userId}, Scope: {row.scope}
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  )
}

export default App;
