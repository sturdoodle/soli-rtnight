const NotFoundPage = () => {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>404 - Not Found</h1>
      <p>Sorry, the page you are looking for does not exist</p>
      <a href="/#/">Go to Home Page</a> {/* Direct link using hash */}
    </div>
  );
};

export default NotFoundPage;