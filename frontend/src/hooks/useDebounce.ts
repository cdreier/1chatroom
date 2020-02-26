import { useEffect, useState } from 'react'

const useDebounce = (ms: number) => {

  const [call, updateCall] = useState(0)
  const [func, setFunc] = useState({
    f: () => {},
  })

  const handler = (cb: () => void) => {
    updateCall(call + 1)
    setFunc({
      f: cb,
    })
  }

  useEffect(() => {
    const cancel = setTimeout(() => {
      if (call > 0) {
        func.f()
      }
    },                        ms)

    return () => clearTimeout(cancel)
  },        [call, func])

  return handler
}

export default useDebounce
