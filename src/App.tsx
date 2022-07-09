import { useEffect, useState } from 'react'
import './App.css'
import { UAParser } from 'ua-parser-js'
import copy from 'copy-to-clipboard'

let parser = new UAParser()

function Item(label: string, value: number | string) {
  return (
    <div className="item">
      {label}: <span>{value}</span>
    </div>
  )
}

function debounce<F extends (...params: any[]) => void>(fn: F, delay: number) {
  let timeoutID: number | undefined
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutID)
    timeoutID = window.setTimeout(() => fn.apply(this, args), delay)
  } as F
}

function App() {
  const [notification, setNotification] = useState(false)
  const [data, setData] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
    pixels: window.devicePixelRatio.toFixed(2),
    os: `${parser.getResult().os.name} ${parser.getResult().os.version}`,
    browser: `${parser.getResult().browser.name} ${parser.getResult().browser.version}`,
  })

  const copyData = async (e: React.FormEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLInputElement>) => {
    copy(
      `width: ${data.width},
height: ${data.height},
pixel-ratio: ${data.pixels},
os: ${data.os},
browser: ${data.browser}`,
      { format: 'text/plain' },
    )
    setNotification(true)
  }

  useEffect((): any => {
    const debouncedHandleResize = debounce(function handleResize() {
      setData({
        height: window.innerHeight,
        width: window.innerWidth,
        pixels: window.devicePixelRatio.toFixed(2),
        os: `${parser.getResult().os.name} ${parser.getResult().os.version}`,
        browser: `${parser.getResult().browser.name} ${parser.getResult().browser.version}`,
      })
    }, 300)

    window.addEventListener('resize', debouncedHandleResize)

    return (_: any) => {
      window.removeEventListener('resize', debouncedHandleResize)
    }
  })

  return (
    <>
      <svg className="lines" width="100%" height="100%">
        <line x1="0" y1="50%" x2="100%" y2="50%" />
        <line x1="50%" y1="0" x2="50%" y2="100%" />
      </svg>
      <div className="tb-arrows">
        <svg viewBox="0 0 40 20" className="arrow-t">
          <polyline points="0,20 20,0 40,20 " />
        </svg>
        <svg viewBox="0 0 40 20" className="arrow-b">
          <polyline points="0,0 20,20 40,0 " />
        </svg>
      </div>
      <div className="lr-arrows">
        <svg viewBox="0 0 20 40" className="arrow-l">
          <polyline points="20,0 0,20 20,40 " />
        </svg>
        <svg viewBox="0 0 20 40" className="arrow-r">
          <polyline points="0,0 20,20 0,40 " />
        </svg>
      </div>
      <div className="full">
        <div className="box">
          {Item('Width', data.width)}
          {Item('Height', data.height)}
          {Item('Pixel ratio', data.pixels)}
          {Item('OS', data.os)}
          {Item('Browser', data.browser)}
          <button onClick={copyData}>
            {notification ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                  {/* Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. */}
                  <path d="M336 64h-53.88C268.9 26.8 233.7 0 192 0S115.1 26.8 101.9 64H48C21.5 64 0 85.48 0 112v352C0 490.5 21.5 512 48 512h288c26.5 0 48-21.48 48-48v-352C384 85.48 362.5 64 336 64zM192 64c17.67 0 32 14.33 32 32s-14.33 32-32 32S160 113.7 160 96S174.3 64 192 64zM282.9 262.8l-88 112c-4.047 5.156-10.02 8.438-16.53 9.062C177.6 383.1 176.8 384 176 384c-5.703 0-11.25-2.031-15.62-5.781l-56-48c-10.06-8.625-11.22-23.78-2.594-33.84c8.609-10.06 23.77-11.22 33.84-2.594l36.98 31.69l72.52-92.28c8.188-10.44 23.3-12.22 33.7-4.062C289.3 237.3 291.1 252.4 282.9 262.8z" />
                </svg>
                Copied!
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                  {/*} Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. */}
                  <path d="M336 64h-53.88C268.9 26.8 233.7 0 192 0S115.1 26.8 101.9 64H48C21.5 64 0 85.48 0 112v352C0 490.5 21.5 512 48 512h288c26.5 0 48-21.48 48-48v-352C384 85.48 362.5 64 336 64zM192 64c17.67 0 32 14.33 32 32c0 17.67-14.33 32-32 32S160 113.7 160 96C160 78.33 174.3 64 192 64zM272 224h-160C103.2 224 96 216.8 96 208C96 199.2 103.2 192 112 192h160C280.8 192 288 199.2 288 208S280.8 224 272 224z" />
                </svg>
                Copy to clipboard
              </>
            )}
          </button>
        </div>
      </div>
    </>
  )
}

export default App
