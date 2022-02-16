import './App.css';
import Swiper from './components/Swiper';

function App() {
  const items = [
    {
      imageSrc: process.env.PUBLIC_URL + '/pic1.jpeg',
      imageAlt: "A person's eye",
    },
    {
      imageSrc: process.env.PUBLIC_URL + '/pic2.jpeg',
      imageAlt: 'A rock formation',
    },
    {
      imageSrc: process.env.PUBLIC_URL + '/pic3.jpeg',
      imageAlt: 'Some flowers',
    },
    {
      imageSrc: process.env.PUBLIC_URL + '/pic4.jpeg',
      imageAlt: 'An egyptian wall painting',
    },
    {
      imageSrc: process.env.PUBLIC_URL + '/pic5.jpeg',
      imageAlt: 'A butterfly on a leaf',
    },
  ];

  return (
    <div className="container">
      <h1>React TypeScript Swiper</h1>
      <Swiper items={items} />
      <footer className="footer">
        <a href="https://dominicarrojado.com/posts/how-to-create-your-own-swiper-in-react-and-typescript-with-tests-part-1/">
          Learn how to build this swiper in React and TypeScript
        </a>
      </footer>
    </div>
  );
}

export default App;
