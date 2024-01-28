import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';

const GET_COUNTRY_DETAILS = gql`
query GetCountryDetails($code: ID!) {
    country(code: $code) {
      name
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
const DetailsPage = () => {
    const { code } = useParams();
    console.log(code)
    const { loading, error, data } = useQuery(GET_COUNTRY_DETAILS, {
      variables: {code },
    });
  
    const [countryDetails, setCountryDetails] = useState(null);
  
    useEffect(() => {
      if (data) {
        setCountryDetails(data.country);
      }
    }, [data]);
  
    return (
      <div>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {countryDetails && (
          <div>
            <h2>Details:</h2>
            <p>Name: {countryDetails.name}</p>
            <p>Native: {countryDetails.native}</p>
            <p>Currency: {countryDetails.currency}</p>
            <p>Emoji: {countryDetails.emoji}</p>
            <p>Languages:</p>
            <ul>
              {countryDetails.languages.map((language) => (
                <li key={language.code}>
                  <div>
                    <strong>Code:</strong> {language.code}
                  </div>
                  <div>
                    <strong>Name:</strong> {language.name}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };
  
  export default DetailsPage;
