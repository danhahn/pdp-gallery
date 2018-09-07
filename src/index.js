import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const photos = [
  {
    url: "https://picsum.photos/550/737?image=100",
    id: 100
  },
  {
    url: "https://picsum.photos/550/737?image=200",
    id: 200
  },
  {
    url: "https://picsum.photos/550/737?image=301",
    id: 301
  },
  {
    url: "https://picsum.photos/550/737?image=400",
    id: 400
  },
  {
    url: "https://picsum.photos/550/737?image=500",
    id: 500
  },
];

ReactDOM.render(<App photos={photos} />, document.getElementById('root'));
registerServiceWorker();
