'use client'

import { useState, useEffect } from 'react'

export function useTypingEffect(
  words: string[],
  typingSpeed = 80,
  deletingSpeed = 50,
  pauseDuration = 2500
) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const word = words[currentWordIndex]

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setDisplayText(word.slice(0, displayText.length + 1))
          if (displayText.length + 1 === word.length) {
            setTimeout(() => setIsDeleting(true), pauseDuration)
            return
          }
        } else {
          setDisplayText(word.slice(0, displayText.length - 1))
          if (displayText.length === 0) {
            setIsDeleting(false)
            setCurrentWordIndex((prev) => (prev + 1) % words.length)
          }
        }
      },
      isDeleting ? deletingSpeed : typingSpeed
    )

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, currentWordIndex, words, typingSpeed, deletingSpeed, pauseDuration])

  return displayText
}
