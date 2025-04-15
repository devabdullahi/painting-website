import React, { useRef, useEffect, useState } from 'react';
import './PaintingCanvas.css';

const PaintingCanvas = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(5);
  const [context, setContext] = useState(null);
  const [savedImages, setSavedImages] = useState([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 600;
    ctx.strokeStyle = color;
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    setContext(ctx);
  }, []);

  const startDrawing = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    context.beginPath();
    context.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = e.nativeEvent;
    context.lineTo(offsetX, offsetY);
    context.stroke();
  };

  const stopDrawing = () => {
    context.closePath();
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  const saveCanvas = () => {
    const image = canvasRef.current.toDataURL('image/png');
    setSavedImages([...savedImages, image]);
  };

  const handleColorChange = (e) => {
    setColor(e.target.value);
    context.strokeStyle = e.target.value;
  };

  const handleBrushSizeChange = (e) => {
    setBrushSize(e.target.value);
    context.lineWidth = e.target.value;
  };

  return (
    <div className="painting-container">
      <div className="controls">
        <div className="control-group">
          <label>Color:</label>
          <input
            type="color"
            value={color}
            onChange={handleColorChange}
          />
        </div>
        <div className="control-group">
          <label>Brush Size:</label>
          <input
            type="range"
            min="1"
            max="20"
            value={brushSize}
            onChange={handleBrushSizeChange}
          />
        </div>
        <button onClick={clearCanvas}>Clear Canvas</button>
        <button onClick={saveCanvas}>Save Painting</button>
      </div>
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseOut={stopDrawing}
      />
      {savedImages.length > 0 && (
        <div className="saved-images">
          <h3>Saved Paintings</h3>
          <div className="image-grid">
            {savedImages.map((image, index) => (
              <img key={index} src={image} alt={`Saved painting ${index + 1}`} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PaintingCanvas; 