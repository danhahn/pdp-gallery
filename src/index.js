import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

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
    video: `<video width="1052" height="1474" preload="auto" style="position: absolute; width: 526.136px; height: 737px; left: 11.9319px; top: 0px;" loop="" poster="//michaelkors.scene7.com/is/image/MichaelKors/MF88Y469TW-2328_99_Flash9_Autox720p_2600k?fit=constrain,1&amp;wid=550&amp;hei=737" data-dtmflag-entered-viewport="true"><p>Your Browser does not support HTML5 Video tag or the video cannot be played.</p><source src="//michaelkors.scene7.com/is/content/MichaelKors/MF88Y469TW-2328_99_Flash9_Autox720p_2600k"></video>`,
    url: "https://picsum.photos/550/737?image=400",
    id: 400
  },
  {
    url: "https://picsum.photos/550/737?image=500",
    id: 500
  },
  {
    url: "https://picsum.photos/550/737?image=600",
    id: 600
  },
  {
    url: "https://picsum.photos/550/737?image=700",
    id: 700
  },
  {
    url: "https://picsum.photos/550/737?image=800",
    id: 800
  },
  {
    url: "https://picsum.photos/550/737?image=900",
    id: 900
  }
];

ReactDOM.render(<App photos={photos} />, document.getElementById("root"));
registerServiceWorker();
