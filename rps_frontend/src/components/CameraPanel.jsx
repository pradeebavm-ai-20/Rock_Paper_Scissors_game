/*

import { useEffect, useRef, useState } from 'react'
export default function CameraPanel({ phase, userMove }) {
  const videoRef = useRef(null); const streamRef = useRef(null)
  const [status, setStatus] = useState(() => navigator.mediaDevices?.getUserMedia ? 'loading' : 'unavailable')
  const connect = async () => {
    setStatus('loading')
    try { const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false }); streamRef.current = stream; if (videoRef.current) videoRef.current.srcObject = stream; setStatus('live') }
    catch { setStatus('unavailable') }
  }
  useEffect(() => {
    const timer = navigator.mediaDevices?.getUserMedia ? window.setTimeout(() => { void connect() }, 0) : null
    return () => { if (timer) window.clearTimeout(timer); streamRef.current?.getTracks().forEach((track) => track.stop()) }
  }, [])
  return <section className="move-panel player-panel"><div className="panel-heading"><span>YOUR MOVE</span><i className={status === 'live' ? 'live' : ''}>{status === 'live' ? '● LIVE' : '● CAMERA'}</i></div><div className="camera-feed">{status === 'live' && <video ref={videoRef} autoPlay playsInline muted />}{status === 'loading' && <div className="feed-status">INITIALIZING<br/><em>camera uplink</em></div>}{status === 'unavailable' && <div className="feed-status">CAMERA OFFLINE<br/><button onClick={connect}>RETRY CAMERA</button></div>}<span className="corner tl"/><span className="corner tr"/><span className="corner bl"/><span className="corner br"/>{userMove && <div className="detected"><b>{userMove === 'rock' ? '✊' : userMove === 'paper' ? '✋' : '✌'}</b><span>GESTURE LOCKED</span></div>}</div><p>{phase === 'ANALYZING' ? 'Reading hand signal...' : userMove ? 'Signal identified' : 'Show your hand to the camera'}</p></section>
}


import { useEffect, useRef, useState } from 'react'

export default function CameraPanel({ phase, userMove }) {
  const videoRef = useRef(null)
  const streamRef = useRef(null)

  const [status, setStatus] = useState('loading')

  const connect = async () => {
    try {
      setStatus('loading')

      // Ask browser for camera
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      })

      streamRef.current = stream

      // Connect camera stream to video
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        await videoRef.current.play()
      }

      setStatus('live')
    } catch (error) {
      console.error('Camera error:', error)
      setStatus('unavailable')
    }
  }

  useEffect(() => {
     /*connect()

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop())
      }
    }
    const timer = setTimeout(() => {
    connect()
  }, 0)

  return () => {
    clearTimeout(timer)

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        track.stop()
      })
    }
  }
  }, [])

  return (
    <section className="move-panel player-panel">

      <div className="panel-heading">
        <span>YOUR MOVE</span>

        <i className={status === 'live' ? 'live' : ''}>
          {status === 'live' ? '● LIVE' : '● CAMERA'}
        </i>
      </div>

      <div className="camera-feed">

        {status === 'live' && (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
          />
        )}

        {status === 'loading' && (
          <div className="feed-status">
            INITIALIZING
            <br />
            <em>camera uplink</em>
          </div>
        )}

        {status === 'unavailable' && (
          <div className="feed-status">
            CAMERA OFFLINE
            <br />

            <button onClick={connect}>
              RETRY CAMERA
            </button>
          </div>
        )}

        <span className="corner tl" />
        <span className="corner tr" />
        <span className="corner bl" />
        <span className="corner br" />

        {userMove && (
          <div className="detected">
            <b>
              {userMove === 'rock'
                ? '✊'
                : userMove === 'paper'
                ? '✋'
                : '✌'}
            </b>

            <span>GESTURE LOCKED</span>
          </div>
        )}
      </div>

      <p>
        {phase === 'ANALYZING'
          ? 'Reading hand signal...'
          : userMove
          ? 'Signal identified'
          : 'Show your hand to the camera'}
      </p>

    </section>
  )
} */


import { useCallback, useEffect, useRef, useState } from 'react'

export default function CameraPanel({ phase, userMove }) {

  const videoRef = useRef(null)
  const streamRef = useRef(null)

  const [status, setStatus] = useState('loading')


  // ==========================================
  // CONNECT CAMERA
  // ==========================================

  const connect = useCallback(async () => {

    try {

      setStatus('loading')

      // Ask browser for camera permission
      const stream =
        await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false
        })


      console.log('Camera stream:', stream)

      console.log(
        'Camera tracks:',
        stream.getVideoTracks()
      )


      // Save stream
      streamRef.current = stream


      // IMPORTANT:
      // video element is always present
      if (videoRef.current) {

        videoRef.current.srcObject = stream

        await videoRef.current.play()

        console.log(
          'Video size:',
          videoRef.current.videoWidth,
          videoRef.current.videoHeight
        )

      }


      setStatus('live')

    } catch (error) {

      console.error(
        'Camera error:',
        error
      )

      setStatus('unavailable')

    }

  }, [])


  // ==========================================
  // START CAMERA
  // ==========================================

  useEffect(() => {

    const timer = window.setTimeout(() => {
      connect()
    }, 100)


    // Cleanup
    return () => {

      window.clearTimeout(timer)


      if (streamRef.current) {

        streamRef.current
          .getTracks()
          .forEach((track) => {
            track.stop()
          })

        streamRef.current = null

      }

    }

  }, [connect])


  // ==========================================
  // UI
  // ==========================================

  return (

    <section className="move-panel player-panel">


      {/* HEADER */}

      <div className="panel-heading">

        <span>
          YOUR MOVE
        </span>


        <i
          className={
            status === 'live'
              ? 'live'
              : ''
          }
        >

          {status === 'live'
            ? '● LIVE'
            : '● CAMERA'}

        </i>

      </div>


      {/* CAMERA */}

      <div className="camera-feed">


        {/* IMPORTANT:
            Video is ALWAYS rendered
        */}

        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display:
              status === 'live'
                ? 'block'
                : 'none'
          }}
        />


        {/* LOADING */}

        {status === 'loading' && (

          <div className="feed-status">

            INITIALIZING

            <br />

            <em>
              camera uplink
            </em>

          </div>

        )}


        {/* CAMERA ERROR */}

        {status === 'unavailable' && (

          <div className="feed-status">

            CAMERA OFFLINE

            <br />

            <button
              onClick={connect}
            >
              RETRY CAMERA
            </button>

          </div>

        )}


        {/* CORNERS */}

        <span className="corner tl" />

        <span className="corner tr" />

        <span className="corner bl" />

        <span className="corner br" />


        {/* DETECTED MOVE */}

        {userMove && (

          <div className="detected">

            <b>

              {userMove === 'rock'
                ? '✊'
                : userMove === 'paper'
                  ? '✋'
                  : '✌'}

            </b>


            <span>
              GESTURE LOCKED
            </span>

          </div>

        )}

      </div>


      {/* MESSAGE */}

      <p>

        {phase === 'ANALYZING'
          ? 'Reading hand signal...'
          : userMove
            ? 'Signal identified'
            : 'Show your hand to the camera'}

      </p>


    </section>

  )

}