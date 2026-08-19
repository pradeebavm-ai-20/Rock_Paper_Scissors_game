/*import { useCallback, useEffect, useRef, useState } from 'react'
import { predictMove } from '../services/api'
import { resultMessage } from '../data/gameData'

const initialScore = { user: 0, computer: 0 }

export function useGame(play) {
  const [phase, setPhase] = useState('IDLE')
  const [countdown, setCountdown] = useState(3)
  const [score, setScore] = useState(initialScore)
  const [round, setRound] = useState(1)
  const [game, setGame] = useState({ userMove: null, computerMove: null, result: null, message: '' })
  const timers = useRef([])
  const later = useCallback((fn, delay) => { timers.current.push(window.setTimeout(fn, delay)) }, [])

  useEffect(() => () => timers.current.forEach(window.clearTimeout), [])

  const startRound = useCallback(() => {
    if (!['IDLE', 'RESULT'].includes(phase)) return
    setGame({ userMove: null, computerMove: null, result: null, message: '' })
    setPhase('COUNTDOWN'); setCountdown(3); play('countdown')
    later(() => { setCountdown(2); play('countdown') }, 900)
    later(() => { setCountdown(1); play('countdown') }, 1800)
    later(() => { setCountdown('GO'); play('go') }, 2700)
    later(async () => {
      setPhase('ANALYZING')
      const prediction = await predictMove()
      setGame({ ...prediction, message: resultMessage(prediction.userMove, prediction.computerMove, prediction.result) })
      setPhase('REVEAL'); play('reveal')
      later(() => {
        setPhase('RESULT'); play(prediction.result)
        if (prediction.result !== 'draw') setScore((value) => ({ ...value, [prediction.result === 'win' ? 'user' : 'computer']: value[prediction.result === 'win' ? 'user' : 'computer'] + 1 }))
      }, 1000)
    }, 3400)
  }, [later, phase, play])

  const nextRound = useCallback(() => { setRound((value) => value + 1); startRound() }, [startRound])
  const resetGame = useCallback(() => { timers.current.forEach(window.clearTimeout); setPhase('IDLE'); setScore(initialScore); setRound(1); setGame({ userMove: null, computerMove: null, result: null, message: '' }) }, [])
  return { phase, countdown, score, round, game, startRound, nextRound, resetGame }
}
*/


import {
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react'

import { predictMove } from '../services/api'

import { resultMessage } from '../data/gameData'


const initialScore = {
  user: 0,
  computer: 0
}


export function useGame(play) {

  const [phase, setPhase] = useState('IDLE')

  const [countdown, setCountdown] = useState(3)

  const [score, setScore] = useState(initialScore)

  const [round, setRound] = useState(1)

  const [game, setGame] = useState({
    userMove: null,
    computerMove: null,
    result: null,
    message: ''
  })


  const timers = useRef([])


  // Create a timer
  const later = useCallback(
    (fn, delay) => {
      timers.current.push(
        window.setTimeout(fn, delay)
      )
    },
    []
  )


  // Clear timers when component is removed
  useEffect(() => {
    return () => {
      timers.current.forEach(
        window.clearTimeout
      )
    }
  }, [])


  // ==========================================
  // CAPTURE IMAGE FROM CAMERA
  // ==========================================

  const captureCameraImage = useCallback(() => {

    return new Promise((resolve, reject) => {

      // Find the camera video
      const video = document.querySelector(
        '.camera-feed video'
      )


      // Camera not found
      if (!video) {

        reject(
          new Error(
            'Camera video not found'
          )
        )

        return
      }


      // Camera not ready
      if (video.readyState < 2) {

        reject(
          new Error(
            'Camera is not ready'
          )
        )

        return
      }


      // Create canvas
      const canvas =
        document.createElement('canvas')


      // Use camera resolution
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight


      // Get canvas context
      const context =
        canvas.getContext('2d')


      if (!context) {

        reject(
          new Error(
            'Canvas context not available'
          )
        )

        return
      }


      // Draw current camera frame
      context.drawImage(
        video,
        0,
        0,
        canvas.width,
        canvas.height
      )


      // Convert frame to JPEG
      canvas.toBlob(
        (blob) => {

          if (blob) {

            resolve(blob)

          } else {

            reject(
              new Error(
                'Failed to capture camera image'
              )
            )

          }

        },
        'image/jpeg',
        0.9
      )

    })

  }, [])


  // ==========================================
  // START ROUND
  // ==========================================

  const startRound = useCallback(() => {

    // Only start from IDLE or RESULT
    if (
      !['IDLE', 'RESULT'].includes(phase)
    ) {
      return
    }


    // Clear previous game data
    setGame({
      userMove: null,
      computerMove: null,
      result: null,
      message: ''
    })


    // Start countdown
    setPhase('COUNTDOWN')

    setCountdown(3)

    play('countdown')


    // 3 -> 2
    later(() => {

      setCountdown(2)

      play('countdown')

    }, 900)


    // 2 -> 1
    later(() => {

      setCountdown(1)

      play('countdown')

    }, 1800)


    // 1 -> GO
    later(() => {

      setCountdown('GO')

      play('go')

    }, 2700)


    // ==========================================
    // CAPTURE + PREDICT
    // ==========================================

    later(async () => {

      try {

        // Show analyzing status
        setPhase('ANALYZING')


        // Capture current camera frame
        const imageBlob =
          await captureCameraImage()


        console.log(
          'Camera image captured:',
          imageBlob
        )


        // Send image to Flask backend
        const prediction =
          await predictMove(
            imageBlob
          )


        console.log(
          'Backend prediction:',
          prediction
        )


        // Update game state
        setGame({
          ...prediction,

          message:
            resultMessage(
              prediction.userMove,
              prediction.computerMove,
              prediction.result
            )
        })


        // Show reveal
        setPhase('REVEAL')

        play('reveal')


        // Show final result
        later(() => {

          setPhase('RESULT')

          play(
            prediction.result
          )


          // Update score
          if (
            prediction.result !== 'draw'
          ) {

            setScore((value) => {

              const winner =
                prediction.result === 'win'
                  ? 'user'
                  : 'computer'


              return {
                ...value,

                [winner]:
                  value[winner] + 1
              }

            })

          }

        }, 1000)


      } catch (error) {

        // Show error in browser console
        console.error(
          'Prediction error:',
          error
        )


        // Return to idle
        setPhase('IDLE')

      }

    }, 3400)

  }, [
    later,
    phase,
    play,
    captureCameraImage
  ])


  // ==========================================
  // NEXT ROUND
  // ==========================================

  const nextRound = useCallback(() => {

    setRound(
      (value) => value + 1
    )

    startRound()

  }, [startRound])


  // ==========================================
  // RESET GAME
  // ==========================================

  const resetGame = useCallback(() => {

    // Clear all timers
    timers.current.forEach(
      window.clearTimeout
    )


    // Reset phase
    setPhase('IDLE')


    // Reset score
    setScore(initialScore)


    // Reset round
    setRound(1)


    // Reset game data
    setGame({
      userMove: null,
      computerMove: null,
      result: null,
      message: ''
    })

  }, [])


  // ==========================================
  // RETURN
  // ==========================================

  return {
    phase,
    countdown,
    score,
    round,
    game,
    startRound,
    nextRound,
    resetGame
  }

}