import ParticularPresentationButtonBox from './Presentation/ParticularPresentationButtonBox';
import { ParticularPresentationMainBox } from './Presentation/ParticularPresentationMainBox';
import React, { useState, useEffect, useRef } from 'react';
import FunctionButton from './Presentation/FunctionButton';
import { Navigate, useNavigate } from 'react-router-dom';
import SlideBox from './Presentation/SlideBox'
import OneSlideBox from './Presentation/OneSlideBox'
import { useSelector } from 'react-redux';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogButton from './Presentation/DialogButton';
import TitleText from './Presentation/TitleText';
import TileBox from './Presentation/TitleBox';
import TileButton from './Presentation/TitleButton';
import Open from './Open'
import Close from './Close'
import { CreateModal } from './dashboard/CreateModal'
import { ModalInput } from './dashboard/ModalInput'
import TitleModalBox from './Presentation/TitleModalBox'
import { ModalButton } from './dashboard/ModalButton'
import BackDashboard from './Presentation/BackDashboard'
import DeletePresentation from './Presentation/DeletePresentation'
import TitleSubmit from './Presentation/TitleSubmit'
import AddSlideButton from './Presentation/AddSlideButton';
import Button from '@mui/material/Button';
import ButtonBox from './Presentation/ButtonBox';
import ArrowForwardButton from './Presentation/ArrowForwardButton';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowBackButton from './Presentation/ArrowBackButton';
import AddSlide from './Presentation/AddSlide';
import MoveSlide from './Presentation/MoveSlide';
import InitializeData from './Presentation/InitializeData';
import DeleteSlide from './Presentation/DeleteSlide';
import SlideNumberText from './Presentation/SlideNumberText';
import { useDropzone } from 'react-dropzone';
import UploadThumbnail from './Presentation/UploadThumbnail';
import PrivatePresentationModalBox from './Presentation/PrivatePresentationModalBox';
import AddNewText from './Presentation/AddNewText';
import ChangeText from './Presentation/ChangeText';
import AddNewImage from './Presentation/AddNewImage';
import Box from '@mui/material/Box';
import ChangeImage from './Presentation/ChangeImage';
import AddNewVideo from './Presentation/AddNewVideo';
import ChangeVideo from './Presentation/ChangeVideo';
import DeleteContent from './Presentation/DeleteContent';
import AddNewCode from './Presentation/AddNewCode';
import ChangeCode from './Presentation/ChangeCode';
import Textarea from './Presentation/Textarea';
import NewCodeArea from './Presentation/NewCodeArea';
import NewTextarea from './Presentation/NewTextarea';
import TextareaInChange from './Presentation/TextareaInChange';
import CodeArea from './Presentation/CodeArea';
import CodeAreaInChange from './Presentation/CodeAreaInChange';
import DoubleClick from './Presentation/DoubleClick';
import Click from './Presentation/Click';

function ParticularPresentation () {
  // Using Redux to get the current presentation ID
  const presentationId = useSelector(state => state.presentationId);
  // Current page ID
  const [slideId, setSlideId] = useState(1);
  // Current page content
  const [slideContent, setSlideContent] = useState([]);
  // Number of the current slide
  const [slideNumber, setSlideNumber] = useState(1);
  // Delete the modal of the presentation
  const [dialogState, setDialogOpen] = useState(false);
  // Delete the modal of the slide
  const [deleteModalState, setDeleteModalOpen] = useState(false);
  // current title
  const [title, setTitle] = useState('');
  // new title
  const [newTitle, setNewTitle] = useState('');
  const [textModalState, setTextModalOpen] = useState(false);
  const [changeTextModalState, setChangeTextModalState] = useState(false);
  // Used to set the state of new and changed text
  const [textWidth, setTextWidth] = useState('');
  const [textHeight, setTextHeight] = useState('');
  const [text, setText] = useState('');
  const [textScrollTop, setTextScrollTop] = useState(0);
  const [textFontSize, setTextFontSize] = useState('');
  const [textColor, setTextColor] = useState('');
  const [textPositionX, setTextPositionX] = useState('');
  const [textPositionY, setTextPositionY] = useState('');
  const [imagePositionX, setImagePositionX] = useState('');
  const [imagePositionY, setImagePositionY] = useState('');
  const [layer, setLayer] = useState(1);
  // Used to set the state of new and changed image
  const [imageWidth, setImageWidth] = useState('');
  const [imageHeight, setImageHeight] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [imageAlt, setImageAlt] = useState('');
  const [imageModalState, setImageModalOpen] = useState(false);
  const [changeImageModalState, setChangeImageModalState] = useState(false);
  // Used to set the state of new and changed video
  const [videoWidth, setVideoWidth] = useState('');
  const [videoHeight, setVideoHeight] = useState('');
  const [videoURL, setVideoURL] = useState('');
  const [videoStart, setVideoStart] = useState('');
  const [videoModalState, setVideoModalOpen] = useState(false);
  const [videoPositionX, setVideoPositionX] = useState('');
  const [videoPositionY, setVideoPositionY] = useState('');
  const [changeVideoModalState, setChangeVideoModalState] = useState(false);
  // Used to set the state of new and changed code
  const [codeWidth, setCodeWidth] = useState('');
  const [codeHeight, setCodeHeight] = useState('');
  const [codeContent, setCodeContent] = useState('');
  const [codeFontSize, setCodeFontsize] = useState('');
  const [codeModalState, setCodeModalOpen] = useState(false);
  const [codePositionX, setCodePositionX] = useState('');
  const [codePositionY, setCodePositionY] = useState('');
  const [changeCodeModalState, setChangeCodeModalState] = useState(false);
  // Used to calculate the number of click
  const [clickCount, setClickCount] = useState(0);
  // Gets the type of content being clicked
  const [clickType, setClickType] = useState('');
  // Gets the content of content being clicked
  const [clickItem, setClickedItem] = useState('');

  const navigate = useNavigate();
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.scrollTop = 0;
    }
  }, [textScrollTop]);

  // Setup for handling file drops with specific actions on file drop events
  const { getRootProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      UploadThumbnail(acceptedFiles[0], presentationId);// Upload thumbnail function with file
    }
  });

  // Initial data fetching and setup for presentation details
  useEffect(() => {
    InitializeData(presentationId, setTitle, setSlideNumber, setSlideContent);
  }, []);

  // Effect to handle single and double click actions based on the click count
  useEffect(() => {
    let timer; // Declare a timer variable for Reset click count
    if (clickCount === 1) {
      timer = setTimeout(() => {
        setClickCount(0); // Reset click count after delay
      }, 500);
    } else if (clickCount === 2) {
      DoubleClick(clickType, clickItem, setTextWidth, setTextHeight, setTextFontSize, setTextColor, setTextPositionX, setTextPositionY, setText, setImageWidth, setImageHeight, setImagePositionX, setImagePositionY, setImageURL, setImageAlt, setVideoWidth, setVideoHeight, setVideoPositionX, setVideoPositionY, setVideoURL, setVideoStart, setCodeWidth, setCodeHeight, setCodePositionX, setCodePositionY, setCodeFontsize, setCodeContent, setChangeTextModalState, setChangeImageModalState, setChangeVideoModalState, setChangeCodeModalState); // Process double click action
      setClickCount(0); // Reset click count after action
    }
    return () => clearTimeout(timer); // Cleanup timer
  }, [clickCount, clickType, clickItem]);

  // Conditional rendering based on authentication token availability
  if (localStorage.getItem('token') === null) {
    return <Navigate to="/" replace />;
  } else {
    return (
      // Main presentation component structure
      <ParticularPresentationMainBox>
        <ParticularPresentationButtonBox>
          <FunctionButton onClick={() => setCodeModalOpen(true)}>
            Code
          </FunctionButton>
          <FunctionButton onClick={() => setTextModalOpen(true)}>
            Text
          </FunctionButton>
          <FunctionButton onClick={() => Open(setImageModalOpen)}>
            Image
          </FunctionButton>
          <FunctionButton onClick={() => Open(setVideoModalOpen)}>
            Video
          </FunctionButton>
          <FunctionButton {...getRootProps()}>
            Upload Thumbnail
          </FunctionButton>
          <FunctionButton onClick={() => BackDashboard(navigate)}>
            Back
          </FunctionButton>
          <FunctionButton onClick={() => Open(setDialogOpen)}>
            Delete Presentation
          </FunctionButton>
        </ParticularPresentationButtonBox>
        <SlideBox>
          {/* Display and option to change presentation title */}
          <TileBox>
            <TitleText>
              {title}
            </TitleText>
            <TileButton variant="contained" onClick={() => {
              setNewTitle(title);
              setDeleteModalOpen(true);
            }}>
              Change Title
            </TileButton>
          </TileBox>
          {/* Individual slides and their content */}
          <OneSlideBox>
            {/* Button to add a new slide */}
            <AddSlideButton variant="contained" onClick={() => AddSlide(presentationId, slideId, setSlideId, setSlideContent, setSlideNumber)}>
              +
            </AddSlideButton>
            <SlideNumberText>
              {slideId}
            </SlideNumberText>
            {/* Get all existing content and make different generation according to their type */}
            {slideContent.map((item, index) => (
              <React.Fragment key={index}>
                {item.type === 'text'
                  ? (
                  <Box
                    onClick={() => Click(item, setClickCount, setClickType, setClickedItem, setLayer, layer) } onContextMenu={() => DeleteContent(presentationId, slideId, setSlideContent, item)}
                    sx={{
                      width: `${item.width}%`,
                      height: `${item.height}%`,
                      left: `${item.x}%`,
                      top: `${item.y}%`,
                      fontSize: `${item.textFontSize}em`,
                      color: item.textColor,
                      position: 'absolute',
                      zIndex: item.layer,
                      cursor: 'pointer',
                      boxSizing: 'border-box',
                      overflow: 'hidden'
                    }}
                  >
                    <NewTextarea ref={textareaRef}
                      value={item.textContent} readOnly
                    />
                  </Box>
                    )
                  : item.type === 'image'
                    ? (
                      <Box onClick={() => Click(item, setClickCount, setClickType, setClickedItem, setLayer, layer) } onContextMenu={() => DeleteContent(presentationId, slideId, setSlideContent, item)}
                        component="img"
                        src={item.imageContent}
                        alt={item.alt}
                        sx={{
                          width: `${item.width}%`,
                          height: `${item.height}%`,
                          left: `${item.x}%`,
                          top: `${item.y}%`,
                          position: 'absolute',
                          zIndex: item.layer,
                          boxSizing: 'border-box',
                          cursor: 'pointer'
                        }}
                      />
                      )
                    : item.type === 'video'
                      ? (
                        <Box onClick={() => Click(item, setClickCount, setClickType, setClickedItem, setLayer, layer) } onContextMenu={() => DeleteContent(presentationId, slideId, setSlideContent, item)}
                          component="iframe"
                          src={`${item.videoContent}&autoplay=${item.state}&mute=1`}
                          allow="autoplay"
                          sx={{
                            width: `${item.width}%`,
                            height: `${item.height}%`,
                            left: `${item.x}%`,
                            top: `${item.y}%`,
                            position: 'absolute',
                            zIndex: item.layer,
                            boxSizing: 'border-box',
                            border: '8px solid #ccc',
                          }}
                        />
                        )
                      : item.type === 'code'
                        ? (
                          <Box
                            onClick={() => Click(item, setClickCount, setClickType, setClickedItem, setLayer, layer) } onContextMenu={() => DeleteContent(presentationId, slideId, setSlideContent, item)}
                            sx={{
                              width: `${item.width}%`,
                              height: `${item.height}%`,
                              left: `${item.x}%`,
                              top: `${item.y}%`,
                              position: 'absolute',
                              zIndex: item.layer,
                              boxSizing: 'border-box',
                              fontSize: `${item.fontSize}em`,
                            }}
                          >
                            <NewCodeArea value={item.content} readOnly/>
                          </Box>
                          )
                        : null}
              </React.Fragment>
            ))}
          </OneSlideBox>
          {/* Controls for deleting slides */}
          <ButtonBox>
            <Button variant="contained" onClick={() => DeleteSlide(presentationId, slideId, slideNumber, setSlideId, setSlideNumber, setSlideContent)} sx={{ marginTop: '10px' }}>
              Delete slide
            </Button>
            {/* Navigation buttons to move slides forward or backward */}
            {slideId < slideNumber && (<ArrowForwardButton variant="contained" onClick={() => MoveSlide(presentationId, slideId, setSlideId, setSlideContent, 'forward')}><ArrowForwardIcon /></ArrowForwardButton>)}
            { slideId !== 1 && slideId <= slideNumber && (<ArrowBackButton variant="contained" onClick={() => MoveSlide(presentationId, slideId, setSlideId, setSlideContent, 'back')}><ArrowBackIcon /></ArrowBackButton>)}
          </ButtonBox>
        </SlideBox>
        {/* Dialog for presentation deletion */}
        <Dialog
          open={dialogState}
          onClose={() => Close(setDialogOpen)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{'Are you sure?'}</DialogTitle>
          <DialogContent>
          </DialogContent>
          <DialogActions>
            <DialogButton onClick={() => DeletePresentation(presentationId, navigate)} autoFocus>Yes</DialogButton>
            <DialogButton onClick={() => Close(setDialogOpen)}>No</DialogButton>
          </DialogActions>
        </Dialog>
        {/* A modal used to change or add a title */}
        <CreateModal
          open={deleteModalState}
          onClose={() => Close(setDeleteModalOpen)}
        >
          <TitleModalBox>
            <ModalInput type="text" value={newTitle} onChange={(event) => setNewTitle(event.target.value)} />
            <ModalButton variant="contained" color="primary" onClick={() => TitleSubmit(setTitle, setNewTitle, setDeleteModalOpen, newTitle, presentationId)}>Change Title</ModalButton>
          </TitleModalBox>
        </CreateModal>
        {/* A modal used to add a text */}
        <CreateModal
          open={textModalState}
          onClose={() => Close(setTextModalOpen)}
        >
          <PrivatePresentationModalBox sx={{ height: '650px', maxWidth: '350px' }}>
            <ModalInput type="text" label="The Width Of The Text Area (only number)" onChange={(e) => setTextWidth(e.target.value)}/>
            <ModalInput type="text" label="The Height Of The Text Area (only number)" onChange={(e) => setTextHeight(e.target.value)}/>
            <ModalInput type="text" label="Font Size: (only number)" onChange={(e) => setTextFontSize(e.target.value)}/>
            <ModalInput type="text" label="colour" onChange={(e) => setTextColor(e.target.value)}/>
            <Textarea onChange={(e) => setText(e.target.value)} defaultValue="Enter Your Text"/>
            <ModalButton variant="contained" color="primary" onClick={() => AddNewText(presentationId, slideId, textWidth, textHeight, text, textFontSize, textColor, setSlideContent, setTextModalOpen)}>Add Text</ModalButton>
          </PrivatePresentationModalBox>
        </CreateModal>
        {/* A modal used to change a text */}
        <CreateModal
          open={changeTextModalState}
          onClose={() => Close(setChangeTextModalState)}
        >
          <PrivatePresentationModalBox sx={{ height: '680px', maxWidth: '350px' }}>
            <ModalInput type="text" label="The Width Of The Text Area (only number)" value={textWidth} onChange={(e) => setTextWidth(e.target.value)}/>
            <ModalInput type="text" label="The Height Of The Text Area (only number)" value={textHeight} onChange={(e) => setTextHeight(e.target.value)}/>
            <ModalInput type="text" label="x-coordinate" value={textPositionX} onChange={(e) => setTextPositionX(e.target.value)}/>
            <ModalInput type="text" label="y-coordinate" value={textPositionY} onChange={(e) => setTextPositionY(e.target.value)}/>
            <ModalInput type="text" label="Font Size: (only number)" value={textFontSize} onChange={(e) => setTextFontSize(e.target.value)}/>
            <ModalInput type="text" label="colour" value={textColor} onChange={(e) => setTextColor(e.target.value)}/>
            <TextareaInChange onChange={(e) => setText(e.target.value)} defaultValue={text}/>
            <ModalButton variant="contained" color="primary" onClick={() => ChangeText(presentationId, slideId, textWidth, textHeight, text, textFontSize, textColor, textPositionX, textPositionY, setTextPositionX, setTextPositionY, setSlideContent, setChangeTextModalState, layer, setTextScrollTop)}>Change Text</ModalButton>
          </PrivatePresentationModalBox>
        </CreateModal>
        {/* A modal used to add a image */}
        <CreateModal
          open={imageModalState}
          onClose={() => Close(setImageModalOpen)}
        >
          <PrivatePresentationModalBox sx={{ height: '400px' }}>
            <ModalInput type="text" label="The Width Of The Image Area (only number)" onChange={(e) => setImageWidth(e.target.value)}/>
            <ModalInput type="text" label="The Height Of The Image Area (only number)" onChange={(e) => setImageHeight(e.target.value)}/>
            <ModalInput type="text" label="Image URL" onChange={(e) => setImageURL(e.target.value)}/>
            <ModalInput type="text" label="alt" onChange={(e) => setImageAlt(e.target.value)}/>
            <ModalButton variant="contained" color="primary" onClick={() => AddNewImage(presentationId, slideId, imageWidth, imageHeight, imageURL, imageAlt, setSlideContent, setImageModalOpen)}>Add Image</ModalButton>
          </PrivatePresentationModalBox>
        </CreateModal>
        {/* A modal used to change a image */}
        <CreateModal
          open={changeImageModalState}
          onClose={() => Close(setChangeImageModalState)}
        >
          <PrivatePresentationModalBox sx={{ height: '550px' }}>
            <ModalInput type="text" label="The Width Of The Image Area (only number)" value={imageWidth} onChange={(e) => setImageWidth(e.target.value)}/>
            <ModalInput type="text" label="The Height Of The Image Area (only number)" value={imageHeight} onChange={(e) => setImageHeight(e.target.value)}/>
            <ModalInput type="text" label="x-coordinate" value={imagePositionX} onChange={(e) => setImagePositionX(e.target.value)}/>
            <ModalInput type="text" label="y-coordinate" value={imagePositionY} onChange={(e) => setImagePositionY(e.target.value)}/>
            <ModalInput type="text" label="Image URL" value={imageURL} onChange={(e) => setImageURL(e.target.value)}/>
            <ModalInput type="text" label="alt" value={imageAlt} onChange={(e) => setImageAlt(e.target.value)}/>
            <ModalButton variant="contained" onClick={() => ChangeImage(presentationId, slideId, imageWidth, imageHeight, imageURL, imageAlt, imagePositionX, imagePositionY, setImagePositionX, setImagePositionY, setSlideContent, setChangeImageModalState, layer)}>Change Image</ModalButton>
          </PrivatePresentationModalBox>
        </CreateModal>
        {/* A modal used to add a video */}
        <CreateModal
          open={videoModalState}
          onClose={() => Close(setVideoModalOpen)}
        >
          <PrivatePresentationModalBox sx={{ height: '400px', maxWidth: '350px' }}>
            <ModalInput type="text" label="Width (only number and Larger than border size 8px)" onChange={(e) => setVideoWidth(e.target.value)}/>
            <ModalInput type="text" label="Height (only number and Larger than border size 8px)" onChange={(e) => setVideoHeight(e.target.value)}/>
            <ModalInput type="text" label="Video URL" onChange={(e) => setVideoURL(e.target.value)}/>
            <ModalInput type="text" label="Whether the video is playing (yes or no)" onChange={(e) => setVideoStart(e.target.value)}/>
            <ModalButton variant="contained" onClick={() => AddNewVideo(presentationId, slideId, videoWidth, videoHeight, videoURL, videoStart, setSlideContent, setVideoModalOpen)}>Add Video</ModalButton>
          </PrivatePresentationModalBox>
        </CreateModal>
        {/* A modal used to change a video */}
        <CreateModal
          open={changeVideoModalState}
          onClose={() => Close(setChangeVideoModalState)}
        >
          <PrivatePresentationModalBox sx={{ height: '550px', maxWidth: '350px' }}>
            <ModalInput type="text" label="Width (only number and Larger than border size 8px)" value={videoWidth} onChange={(e) => setVideoWidth(e.target.value)}/>
            <ModalInput type="text" label="Height (only number and Larger than border size 8px)" value={videoHeight} onChange={(e) => setVideoHeight(e.target.value)}/>
            <ModalInput type="text" label="x-coordinate" value={videoPositionX} onChange={(e) => setVideoPositionX(e.target.value)}/>
            <ModalInput type="text" label="y-coordinate" value={videoPositionY} onChange={(e) => setVideoPositionY(e.target.value)}/>
            <ModalInput type="text" label="Video URL" value={videoURL} onChange={(e) => setVideoURL(e.target.value)}/>
            <ModalInput type="text" label="Whether the video is playing (yes or no)" value={videoStart} onChange={(e) => setVideoStart(e.target.value)}/>
            <ModalButton variant="contained" onClick={() => ChangeVideo(presentationId, slideId, videoWidth, videoHeight, videoURL, videoStart, videoPositionX, videoPositionY, setVideoPositionX, setVideoPositionY, setSlideContent, setChangeVideoModalState, layer)}>Change Video</ModalButton>
          </PrivatePresentationModalBox>
        </CreateModal>
        {/* A modal used to add a code */}
        <CreateModal
          open={codeModalState}
          onClose={() => Close(setCodeModalOpen)}
        >
          <PrivatePresentationModalBox sx={{ height: '650px', maxWidth: '350px' }}>
            <ModalInput type="text" label="Width (only number)" onChange={(e) => setCodeWidth(e.target.value)}/>
            <ModalInput type="text" label="Height (only number)" onChange={(e) => setCodeHeight(e.target.value)}/>
            <ModalInput type="text" label="Code Fontsize(only number)" onChange={(e) => setCodeFontsize(e.target.value)}/>
            <CodeArea onChange={(e) => setCodeContent(e.target.value)} defaultValue="Enter your code"/>
            <ModalButton variant="contained" onClick={() => AddNewCode(presentationId, slideId, codeWidth, codeHeight, codeContent, codeFontSize, setSlideContent, setCodeModalOpen)}>Add Code</ModalButton>
          </PrivatePresentationModalBox>
        </CreateModal>
        {/* A modal used to change a code */}
        <CreateModal
          open={changeCodeModalState}
          onClose={() => Close(setChangeCodeModalState)}
        >
          <PrivatePresentationModalBox sx={{ height: '670px', maxWidth: '350px' }}>
            <ModalInput type="text" label="Width (only number)" value={codeWidth} onChange={(e) => setCodeWidth(e.target.value)}/>
            <ModalInput type="text" label="Height (only number)" value={codeHeight} onChange={(e) => setCodeHeight(e.target.value)}/>
            <ModalInput type="text" label="x-coordinate" value={codePositionX} onChange={(e) => setCodePositionX(e.target.value)}/>
            <ModalInput type="text" label="y-coordinate" value={codePositionY} onChange={(e) => setCodePositionY(e.target.value)}/>
            <ModalInput type="text" label="Code Fontsize(only number)" value={codeFontSize} onChange={(e) => setCodeFontsize(e.target.value)}/>
            <CodeAreaInChange onChange={(e) => setCodeContent(e.target.value)} defaultValue={codeContent}/>
            <ModalButton variant="contained" onClick={() => ChangeCode(presentationId, slideId, codeWidth, codeHeight, codeContent, codeFontSize, codePositionX, codePositionY, setCodePositionX, setCodePositionY, setSlideContent, setChangeCodeModalState, layer)}>Change Code</ModalButton>
          </PrivatePresentationModalBox>
        </CreateModal>
      </ParticularPresentationMainBox>
    );
  }
}

export default ParticularPresentation;
