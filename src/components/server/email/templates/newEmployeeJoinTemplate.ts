export const newEmployeeJoinTemplate = (token: string) => {
    return `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
          }
          .container {
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            width: 100%;
            text-align: center;
          }
          p {
            color: #333;
            font-size: 16px;
            line-height: 1.6;
            margin: 10px 0;
          }
          a {
            display: inline-block;
            padding: 10px 20px;
            margin: 20px 0;
            background-color: #4CAF50;
            color: #fff;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <p>A request has been made for you to join an organization.</p>
          <p>Please click the link below to accept the invitation and join:</p>
          <a href="${token}">Join Organization</a>
        </div>
      </body>
    </html>
    `;
  };
  