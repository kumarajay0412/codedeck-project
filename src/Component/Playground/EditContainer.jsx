import React, { useContext, useState } from 'react'
import { ModalContext } from '../../Context/ModalContext'
import { BiEditAlt, BiImport, BiExport, BiFullscreen } from 'react-icons/bi'
import Select from 'react-select';
import { languageMap } from '../../Context/PlaygroundContext';
import CodeEditor from './CodeEditor';
function EditContainer({
    title,
    currentLanguage,
    setCurrentCode,
    currentCode,
    setCurrentLanguage,
    folderId,
    playgroundId,
    saveCode,
    runCode,
    getFile,
    isFullScreen,
    setIsFullScreen
}) {

    const { openModal } = useContext(ModalContext);

    const themeOptions = [
        { value: 'githuDark', label: 'Github Dark' },
        { value: 'githubLight', label: 'Github Light' },
        { value: 'bespin', label: 'Bespin' },
        { value: 'duaotoneDark', label: 'Duotone Dark' },
        { value: 'duaotoneLight', label: 'Duotone Light' },
        { value: "dracula", label: 'Dracula' },
        { value: "xcodeDark", label: 'Xcode Dark' },
        { value: "xcodeLight", label: 'Xcode Light' },
        { value: 'vscodeDark', label: 'Vscode Dark' },
        { value: 'vscodeLight', label: 'Vscode Light' },
        { value: 'okaidia', label: 'Okaidia' }
    ];

    const languageOptions = [
        { value: 'cpp', label: 'C++' },
        { value: 'javascript', label: 'Javascript' },
        { value: 'python', label: 'Python' },
        { value: 'java', label: 'Java' },
    ];

    const handleThemeChange = (selectedOption) => {
        setCurrentTheme(selectedOption)
    }
    const handleLanguageChange = (selectedOption) => {
        setLanguage(selectedOption)
        setCurrentLanguage(selectedOption.value)
        setCurrentCode(languageMap[selectedOption.value].defaultCode)
    }
    const [currentTheme, setCurrentTheme] = useState(themeOptions[0]);
    const [language, setLanguage] = useState(() => {
        for (let i = 0; i < languageOptions.length; i++) {
            if (languageOptions[i].value === currentLanguage) {
                return languageOptions[i];
            }
        }
        return languageOptions[0];
    });
    return (
        <div>
            {console.log(currentLanguage, currentCode)}
            <CodeEditor
            currentLanguage={currentLanguage}
            currentTheme={currentTheme}
            currentCode={currentCode}
            setCurrentCode={setCurrentCode}
            />
        </div>
    )
}

export default EditContainer