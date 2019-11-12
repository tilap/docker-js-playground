import React, { useEffect, useState } from 'react';
import Helmet from 'react-helmet';
import { Button } from '@material-ui/core';
import config from 'config';

const fetchApiData = async (type) => {
  const response = await fetch(`${config.apiUrl}/${type}`);
  return response.json();
}

export default () => {
  const [data, setData] = useState(null);
  const [fetching, setFetching] = useState(false);
  const [posting, setPosting] = useState(false);
  useEffect(() => {
    if (data === null && !fetching) {
      setFetching(true);
      fetchApiData('get')
        .then((result) => {
          setData(result);
          setFetching(false);
        });
    }
  }, [data, fetching]);

  const handleClick = () => {
    if (posting) {
      alert('already posting');
      return false;
    }
    setPosting(true);
    fetchApiData('insert')
      .then(() => {
        setData(null);
        setPosting(false);
      });
  };

  return (
    <>
      <Helmet>
        <title>Another page</title>
      </Helmet>
      <div>This is for another page.</div>
      {data !== null && (
        <div>
          {data.items.map((item, k) => (
            <div key={k}>{item._id} - {item.date}</div>
          ))}
        </div>
      )}
      {fetching && <div>Fetching</div>}
      <Button onClick={handleClick}>Insert</Button>
    </>
  );
};
