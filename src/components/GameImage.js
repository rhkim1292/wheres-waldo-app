function GameImage(props) {
  return (
    <img
      src={props.imgSrc}
      className="game-image"
      alt="mario game"
      onMouseMove={props.onMouseMove}
      onClick={props.handleClick}
    />
  );
}

export default GameImage;
