// Perform different methods for clicking on different types of content
const DoubleClick = (clickType, clickItem, setTextWidth, setTextHeight, setTextFontSize, setTextColor, setTextPositionX, setTextPositionY, setText, setImageWidth, setImageHeight, setImagePositionX, setImagePositionY, setImageURL, setImageAlt, setVideoWidth, setVideoHeight, setVideoPositionX, setVideoPositionY, setVideoURL, setVideoStart, setCodeWidth, setCodeHeight, setCodePositionX, setCodePositionY, setCodeFontsize, setCodeContent, setChangeTextModalState, setChangeImageModalState, setChangeVideoModalState, setChangeCodeModalState) => {
  if (clickType === 'text') {
    setTextWidth(clickItem.width);
    setTextHeight(clickItem.height);
    setTextFontSize(clickItem.textFontSize);
    setTextColor(clickItem.textColor);
    setTextPositionX(clickItem.x);
    setTextPositionY(clickItem.y);
    setText(clickItem.textContent);
    setChangeTextModalState(true);
  } else if (clickType === 'image') {
    setImageWidth(clickItem.width);
    setImageHeight(clickItem.height);
    setImagePositionX(clickItem.x);
    setImagePositionY(clickItem.y);
    setImageURL(clickItem.imageContent);
    setImageAlt(clickItem.alt);
    setChangeImageModalState(true);
  } else if (clickType === 'video') {
    setVideoWidth(clickItem.width);
    setVideoHeight(clickItem.height);
    setVideoPositionX(clickItem.x);
    setVideoPositionY(clickItem.y);
    setVideoURL(clickItem.videoContent);
    if (clickItem.state === 1) {
      setVideoStart('yes');
    } else if (clickItem.state === 0) {
      setVideoStart('no');
    }
    setChangeVideoModalState(true);
  } else if (clickType === 'code') {
    setCodeWidth(clickItem.width);
    setCodeHeight(clickItem.height);
    setCodePositionX(clickItem.x);
    setCodePositionY(clickItem.y);
    setCodeFontsize(clickItem.fontSize);
    setCodeContent(clickItem.content);
    setChangeCodeModalState(true);
  }
};

export default DoubleClick;
