import React, { Component } from "react";

class ImageAnalyzer extends Component {
  constructor(props) {
    super(props);
    this.imgRef = React.createRef();
    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    this.drawImage();
  }

  drawImage = () => {
    const img = this.imgRef.current;
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = img.width;
    canvas.height = img.height;

    ctx.drawImage(img, 0, 0, img.width, img.height);
    this.analyzeArea(40, 40, 150, 100);
  };

  analyzeArea = (startX, startY, endX, endY) => {
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext("2d");

    let totalLuminosity = 0;
    let pixelCount = 0;

    for (let y = startY; y < endY; y++) {
      for (let x = startX; x < endX; x++) {
        const pixel = ctx.getImageData(x, y, 1, 1).data;
        const luminosity = 0.2126 * pixel[0] + 0.7152 * pixel[1] + 0.0722 * pixel[2];
        totalLuminosity += luminosity;
        pixelCount++;
      }
    }

    const averageLuminosity = Math.round((totalLuminosity / pixelCount / 255) * 100);

    console.log("Average Luminosity:", averageLuminosity);
  };

  render() {
    return (
      <div>
        <img
          ref={this.imgRef}
          src="https://civicnewscompany-votebeat-prod.web.arc-cdn.net/resizer/YSoAHlC-YOtnCkUlHL3qlm_LFEw=/1600x900/filters:format(jpg):quality(70)/cloudfront-us-east-1.images.arcpublishing.com/sandbox.civicnewscompany/WSPQ45YGJRECVOOLPMKYSYDKK4.jpg"
          alt="Imagen"
          onLoad={this.drawImage}
        />
        <canvas ref={this.canvasRef} style={{ display: "none" }} />
        <button onClick={() => this.analyzeArea(40, 40, 170, 50)}>Analizar Área</button>
      </div>
    );
  }
}

export default ImageAnalyzer;
