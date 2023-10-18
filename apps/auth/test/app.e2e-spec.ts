// describe('Auth', () => {
//   beforeAll(async () => {
//     const user = {
//       email: 'parinaz@gmail.com',
//       password: 'parinaz123321',
//     };
//     await fetch('http://localhost:3000', {
//       method: 'POST',
//       body: JSON.stringify(user),
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//     const response = await fetch('http://localhost:3000/auth/login', {
//       method: 'POST',
//       body: JSON.stringify(user),
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//     const jwt = await response.text();
//     console.log('jwt: ', jwt);
//   });
//   test('Create', () => {
//     expect(true).toBeTruthy();
//   });
// });
