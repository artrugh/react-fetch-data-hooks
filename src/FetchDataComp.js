import React, { useState, useEffect } from 'react';
import axios from 'axios';



function FetchDataComp() {
  const [data, setData] = useState({ hits: [] });
  const [render, setRender] = useState(1)
  console.log(render);

  useEffect(() => {
    const fetchData = async () => {

      try {
        const result = await axios(
          'https://hn.algolia.com/api/v1/search?query=redux',
        );
        
        setData(result.data);
        console.log(data);
      } catch (err) {
        console.log("errors", err);
      }

    };
    fetchData();
    
    
  }, []);

  return (
    <>
      <ul>
        {data.hits.map(item => (
          <li key={item.objectID}>
            <a href={item.url}>{item.title}</a>
          </li>
        ))}
      </ul>
    </>
  );
}
export default FetchDataComp;

