import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';

const GET_COUNTRIES = gql`
  {
    countries {
      name
      code
      native
      emoji
      currency
      languages {
        code
        name
      }
    }
  }
`;

const CountryList = () => {
  const { loading, error, data } = useQuery(GET_COUNTRIES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
        <h1>List of Countries</h1>
      <ul>
        {data.countries.map((country) => (
          <li key={country.code}>
            {country.name}{' '}
            <Link to={`/details/${country.code}`}>
              <button>Details</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CountryList;
