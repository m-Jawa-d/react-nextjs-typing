// app/typing-test/page.js
"use client";

import { useState, useEffect, useRef } from 'react';
import styles from './TypingTest.module.css';

const wordsArray = [
    'hello', 'world', 'nextjs', 'typing', 'test', 'speed', 'accuracy', 'fun', 'keyboard', 'react',
    'javascript', 'programming', 'development', 'application', 'software', 'technology', 'interface', 'library', 'framework',
    'performance', 'optimization', 'deployment', 'production', 'staging', 'testing', 'debugging', 'variables', 'functions',
    'components', 'hooks', 'state', 'props', 'context', 'reducer', 'actions', 'store', 'middleware', 'router', 'navigation',
    'animation', 'styles', 'responsive', 'design', 'accessibility', 'compatibility', 'browser', 'support', 'integration',
    'continuous', 'deployment', 'pipeline', 'automation', 'testing', 'unit', 'integration', 'end-to-end', 'scalability',
    'reliability', 'availability', 'security', 'authentication', 'authorization', 'encryption', 'hashing', 'algorithm',
    'data', 'structure', 'array', 'object', 'string', 'number', 'boolean', 'null', 'undefined', 'symbols', 'promises',
    'asynchronous', 'callback', 'event', 'loop', 'execution', 'context', 'closure', 'hoisting', 'scope', 'strict',
    'mode', 'debugger', 'logging', 'console', 'errors', 'exceptions', 'try', 'catch', 'finally', 'throw', 'async', 'await'
];

const generateWords = (num) => {
    let generatedWords = [];
    for (let i = 0; i < num; i++) {
        generatedWords.push(wordsArray[Math.floor(Math.random() * wordsArray.length)]);
    }
    return generatedWords;
};

const TypingTest = () => {
    const [words, setWords] = useState(generateWords(20));
    const [typedText, setTypedText] = useState('');
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [correctChars, setCorrectChars] = useState(0);
    const [startTime, setStartTime] = useState(null);
    const [wpm, setWpm] = useState(null);
    const [isStopped, setIsStopped] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (isStopped) return;

            const currentWord = words[currentWordIndex];
            if (!startTime) {
                setStartTime(Date.now());
            }
            if (e.key === ' ') {
                if (typedText.trim() === currentWord) {
                    setCurrentWordIndex(currentWordIndex + 1);
                    setTypedText('');
                    setCorrectChars(correctChars + currentWord.length);
                } else {
                    setTypedText(typedText + ' ');
                }
                if (currentWordIndex + 1 === words.length) {
                    const durationInMinutes = (Date.now() - startTime) / 60000;
                    setWpm((correctChars / 5) / durationInMinutes);
                    setIsStopped(true);
                }
            } else if (e.key === 'Backspace') {
                setTypedText(typedText.slice(0, -1));
            } else if (e.key.length === 1) {
                setTypedText(typedText + e.key);
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [typedText, currentWordIndex, words, correctChars, startTime, isStopped]);

    const handleRestart = () => {
        setWords(generateWords(20));
        setTypedText('');
        setCurrentWordIndex(0);
        setCorrectChars(0);
        setStartTime(null);
        setWpm(null);
        setIsStopped(false);
        containerRef.current.focus();  // Ensure focus is reset to container
    };

    const handleStop = () => {
        setIsStopped(true);
        setWpm(null);
    };

    return (
        <div className={styles.container} ref={containerRef} tabIndex={0}>
            <div className={styles.wordsContainer}>
                {words.map((word, index) => (
                    <span key={index} className={index === currentWordIndex ? styles.currentWord : styles.word}>
                        {word}{' '}
                    </span>
                ))}
            </div>
            <div className={styles.typedTextContainer}>
                {typedText.split('').map((char, index) => (
                    <span key={index} className={char === words[currentWordIndex][index] ? styles.correctChar : styles.incorrectChar}>
                        {char}
                    </span>
                ))}
            </div>
            {wpm !== null && (
                <div className={styles.resultContainer}>
                    <h2>Your WPM: {Math.round(wpm)}</h2>
                </div>
            )}
            {isStopped && (
                <div className={styles.resultContainer}>
                    <h2>Typing test stopped.</h2>
                </div>
            )}
            <div className={styles.buttonContainer}>
                <button onClick={handleRestart} className={styles.button}>Restart Test</button>
                <button onClick={handleStop} className={styles.button}>Stop Test</button>
            </div>
        </div>
    );
};

export default TypingTest;
