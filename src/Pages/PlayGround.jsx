import React, { useContext, useState } from 'react'
import Navbar from '../Component/Playground/Navbar'
import { useParams } from 'react-router-dom'
import { PlaygroundContext, languageMap } from '../Context/PlaygroundContext'
import { ModalContext } from '../Context/ModalContext'
import Modal from '../Component/Modal'
import { Buffer } from 'buffer'
import axios from 'axios'
import EditContainer from '../Component/Playground/EditContainer';
import InputConsole from '../Component/Playground/InputConsole'
import OutputConsole from '../Component/Playground/OutputConsole'
function PlayGround() {

  const { folderId, playgroundId } = useParams()
  const { folders, savePlayground } = useContext(PlaygroundContext)
  const { isOpenModal, openModal, closeModal } = useContext(ModalContext)
  const { title, language, code } = folders[folderId]?.playgrounds[playgroundId]
  console.log(title, language, code)
  const [currentLanguage, setCurrentLanguage] = useState(language)
  const [currentCode, setCurrentCode] = useState(code)
  const [currentInput, setCurrentInput] = useState('')
  const [currentOutput, setCurrentOutput] = useState('')
  const [isFullScreen, setIsFullScreen] = useState(false)

  // all logic of the playground
  const saveCode = () => {
    savePlayground(folderId, playgroundId, currentCode, currentLanguage)
  }

  const encode = (str) => {
    return Buffer.from(str, "binary").toString("base64")
  }

  const decode = (str) => {
    return Buffer.from(str, 'base64').toString()
  }

  const postSubmission = async (language_id, source_code, stdin) => {
    const options = {
      method: 'POST',
      url: 'https://judge0-ce.p.rapidapi.com/submissions',
      params: { base64_encoded: 'true', fields: '*' },
      headers: {
        'content-type': 'application/json',
        'Content-Type': 'application/json',
        'X-RapidAPI-Key': 'b4e5c5a05fmsh9adf6ec091523f8p165338jsncc58f31c26e1',
        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
      },
      data: JSON.stringify({
        language_id: language_id,
        source_code: source_code,
        stdin: stdin
      })
    };

    const res = await axios.request(options);
    return res.data.token
  }

  const getOutput = async (token) => {
    // we will make api call here
    const options = {
      method: 'GET',
      url: "https://judge0-ce.p.rapidapi.com/submissions/" + token,
      params: { base64_encoded: 'true', fields: '*' },
      headers: {
        'X-RapidAPI-Key': '3ed7a75b44mshc9e28568fe0317bp17b5b2jsn6d89943165d8',
        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
      }
    };

    // call the api
    const res = await axios.request(options);
    if (res.data.status_id <= 2) {
      const res2 = await getOutput(token);
      return res2.data;
    }
    return res.data;
  }

  const runCode = async () => {
    openModal({
      show: true,
      modalType: 6,
      identifiers: {
        folderId: "",
        cardId: "",
      }
    })
    const language_id = languageMap[currentLanguage].id;
    const source_code = encode(currentCode);
    const stdin = encode(currentInput);

    // pass these things to Create Submissions
    const token = await postSubmission(language_id, source_code, stdin);

    // get the output
    const res = await getOutput(token);
    const status_name = res.status.description;
    const decoded_output = decode(res.stdout ? res.stdout : '');
    const decoded_compile_output = decode(res.compile_output ? res.compile_output : '');
    const decoded_error = decode(res.stderr ? res.stderr : '');

    let final_output = '';
    if (res.status_id !== 3) {
      // our code have some error
      if (decoded_compile_output === "") {
        final_output = decoded_error;
      }
      else {
        final_output = decoded_compile_output;
      }
    }
    else {
      final_output = decoded_output;
    }
    setCurrentOutput(status_name + "\n\n" + final_output);
    closeModal();
  }

  const getFile = (e, setState) => {
    const input = e.target;
    if ("files" in input && input.files.length > 0) {
      placeFileContent(input.files[0], setState);
    }
  };

  const placeFileContent = (file, setState) => {
    readFileContent(file)
      .then((content) => {
        setState(content)
      })
      .catch((error) => console.log(error));
  };

  function readFileContent(file) {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onload = (event) => resolve(event.target.result);
      reader.onerror = (error) => reject(error);
      reader.readAsText(file);
    });
  }

  return (
    <div>
      <Navbar />
      <div className='flex'>
        <div className='w-1/2 h-screen'>
          <EditContainer
          title={title}
          currentLanguage={currentLanguage}
          setCurrentLanguage={setCurrentLanguage}
          currentCode={currentCode}
          folderId={folderId}
          playgroundId={playgroundId}
          saveCode={saveCode}
          runCode={runCode}
          getFile={getFile}
          isFullScreen = {isFullScreen}
          setIsFullScreen = {setIsFullScreen}
          />
        </div>
        <div className='w-1/2 h-screen flex flex-col'>
            <InputConsole
              currentInput={currentInput}
              setCurrentInput={setCurrentInput}
              getFile={getFile}
            />
            <OutputConsole
            currentOutput={currentOutput}
            
            />
        </div>
      </div>
    </div>
  )
}

export default PlayGround