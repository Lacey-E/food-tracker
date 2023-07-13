const React = require('react');

const Home = () => {
  return (
    <div>
      <h1>Welcome to Food Tracker API</h1>
      <p>
        This API provides access to various resources and endpoints that allow developers to interact with the data and functionalities it offers.
      </p>
      <h2>Getting Started</h2>
      <p>
        To make use of this API in your front-end application, follow these steps:
      </p>
      <ol>
        <li>Register an account or log in to obtain an access token.</li>
        <li>Include the access token in the headers of your API requests.</li>
        <li>Refer to the API documentation for available endpoints and their required parameters.</li>
      </ol>
      <h2>Authentication</h2>
      <p>
        To authenticate with the API, you can use the following endpoint:
        <code>/auth</code>
      </p>
      <p>
        Send a POST request to <code>/auth</code> with your login credentials to obtain an access token.
      </p>
      <h2>Endpoints</h2>
      <p>
        Here are some example endpoints you can use:
      </p>
      <ul>
        <li>
          <code>/users</code>: Get a list of users.
        </li>
      </ul>
      <h2>Examples</h2>
      <p>
        Here's an example of how to make an API request using the access token:
      </p>
      <pre>
        {`
        const axios = require('axios');

        const accessToken = 'YOUR_ACCESS_TOKEN';
        const apiUrl = 'API_BASE_URL';

        axios.get(\`\${apiUrl}/users\`, {
          headers: {
            Authorization: \`Bearer \${accessToken}\`
          }
        })
          .then(response => {
            console.log(response.data);
          })
          .catch(error => {
            console.error(error);
          });
        `}
      </pre>
    </div>
  );
};

module.exports = Home;
